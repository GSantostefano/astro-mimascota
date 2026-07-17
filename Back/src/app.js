const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routerApi = require('./routes');
const { requestContextHandler, requestLogger } = require('./middlewares/requestContext.handler');
const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

const app = express();

const whitelist = String(process.env.CORS_ORIGINS || 'http://localhost:4321,http://127.0.0.1:4321')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Sin Origin (curl/Postman) o whitelist
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
      return;
    }
    // Dev: cualquier localhost / 127.0.0.1 (Astro puede usar 4321, 4322…)
    if (
      process.env.NODE_ENV !== 'production' &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      callback(null, true);
      return;
    }
    callback(new Error('CORS: origen no permitido'), false);
  },
};

app.use(requestContextHandler);
app.use(requestLogger);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  return res.status(200).json({
    ok: true,
    service: 'mimascota-back',
    status: 'healthy',
    uptimeSec: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Mi Mascota API',
    docs: '/api',
  });
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
