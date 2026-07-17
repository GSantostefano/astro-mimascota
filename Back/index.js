const app = require('./src/app');

const PORT = process.env.BACK_PORT || 3010;

app.listen(PORT, () => {
  console.log(`Mi Mascota API listening on port ${PORT}`);
});
