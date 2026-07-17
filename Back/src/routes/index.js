const express = require('express');
const usersRouter = require('./users.router');
const petsRouter = require('./pets.router');
const { defaultApiLimiter, authApiLimiter } = require('../middlewares/rateLimiters');

const DEBUG_ROUTES = process.env.DEBUG_ROUTES === '1';

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);

  if (DEBUG_ROUTES) {
    console.log('Cargando rutas API Mi Mascota...');
  }

  router.get('/', (req, res) => {
    res.json({
      ok: true,
      service: 'mimascota-api',
      endpoints: {
        health: 'GET /health',
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        me: 'GET /api/users/me',
        pets: 'GET /api/pets',
        petBySlug: 'GET /api/pets/slug/:slug',
        createPet: 'POST /api/pets',
      },
    });
  });

  router.use('/users', authApiLimiter, usersRouter);
  router.use('/pets', defaultApiLimiter, petsRouter);
}

module.exports = routerApi;
