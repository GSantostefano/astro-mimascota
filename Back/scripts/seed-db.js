const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sequelize = require('../src/libs/sequelize');
const UserService = require('../src/services/user.service');
const PetService = require('../src/services/pet.service');

const samplePets = [
  {
    title: 'Luna — labradora perdida en Centro',
    name: 'Luna',
    status: 'perdida',
    kind: 'perro',
    breed: 'Labrador',
    sex: 'hembra',
    size: 'grande',
    color: 'Dorado claro',
    ageApprox: '3 años',
    city: 'Paraná',
    zone: 'Centro',
    lastSeenDate: '2026-07-10',
    lastSeenPlace: 'Plaza 1º de Mayo',
    description:
      'Luna se escapó durante un paseo cerca de la plaza. Es muy sociable, responde a su nombre y suele acercarse a la gente. Tiene collar rojo con chapita.',
    characteristics: ['Collar rojo', 'Chapita con nombre', 'Muy sociable'],
    contactName: 'María',
    contactPhoneDisplay: '343 555-0101',
    slug: 'luna-labradora-perdida-centro',
    refCode: 'MM-001',
  },
  {
    title: 'Gato naranja encontrado en Parque Urquiza',
    name: 'Sin nombre',
    status: 'encontrada',
    kind: 'gato',
    breed: 'Común europeo',
    sex: 'macho',
    size: 'mediano',
    color: 'Naranja atigrado',
    ageApprox: 'Adulto',
    city: 'Paraná',
    zone: 'Parque Urquiza',
    lastSeenDate: '2026-07-12',
    lastSeenPlace: 'Sendero bajo el parque',
    description:
      'Lo encontramos merodeando cerca de los bancos del parque. Parece doméstico, está bien alimentado y acepta caricias.',
    characteristics: ['Atigrado naranja', 'Sin collar'],
    contactName: 'Lucas',
    contactPhoneDisplay: '343 555-0202',
    slug: 'michi-gato-encontrado-parque-urquiza',
    refCode: 'MM-002',
  },
  {
    title: 'Rocky — pastor alemán perdido en Bajada Grande',
    name: 'Rocky',
    status: 'perdida',
    kind: 'perro',
    breed: 'Pastor alemán',
    sex: 'macho',
    size: 'grande',
    color: 'Negro y fuego',
    ageApprox: '5 años',
    city: 'Paraná',
    zone: 'Bajada Grande',
    lastSeenDate: '2026-07-08',
    lastSeenPlace: 'Costanera baja',
    description:
      'Rocky salió de la casa por un portón mal cerrado. Es protector pero no agresivo con personas.',
    characteristics: ['Chip', 'Collar negro', 'Cicatriz pata trasera'],
    contactName: 'Diego',
    contactPhoneDisplay: '343 555-0303',
    slug: 'rocky-pastor-perdido-bajada-grande',
    refCode: 'MM-003',
  },
  {
    title: 'Caniche encontrado en barrio La Paz',
    name: 'Sin nombre',
    status: 'encontrada',
    kind: 'perro',
    breed: 'Caniche',
    sex: 'macho',
    size: 'pequeño',
    color: 'Blanco',
    ageApprox: 'Cachorro / joven',
    city: 'Paraná',
    zone: 'La Paz',
    lastSeenDate: '2026-07-15',
    lastSeenPlace: 'Plaza del barrio La Paz',
    description: 'Perrito blanco tipo caniche, sin collar, muy juguetón. Casa de tránsito.',
    characteristics: ['Sin collar', 'Muy juguetón'],
    contactName: 'Sofía',
    contactPhoneDisplay: '343 555-0505',
    slug: 'toby-caniche-encontrado-la-paz',
    refCode: 'MM-005',
  },
];

async function seed() {
  await sequelize.sync();

  const userService = new UserService();
  const petService = new PetService();

  let admin;
  try {
    admin = await userService.register({
      name: 'Admin Mi Mascota',
      email: 'admin@mimascota.test',
      password: 'admin123',
      phone: '3430000000',
      role: 'admin',
    });
    // force admin role (register clamps to user unless we patch)
    await userService.update(admin.id, { role: 'admin' });
    admin = await userService.findOne(admin.id);
    console.log('✅ Usuario admin:', admin.email, '(password: admin123)');
  } catch (error) {
    if (error?.output?.statusCode === 409) {
      admin = await sequelize.models.User.findOne({
        where: { email: 'admin@mimascota.test' },
      });
      console.log('ℹ️  Admin ya existía:', admin?.email);
    } else {
      throw error;
    }
  }

  let demoUser;
  try {
    demoUser = await userService.register({
      name: 'Usuario Demo',
      email: 'demo@mimascota.test',
      password: 'demo123',
      phone: '3435550000',
    });
    console.log('✅ Usuario demo:', demoUser.email, '(password: demo123)');
  } catch (error) {
    if (error?.output?.statusCode === 409) {
      demoUser = await sequelize.models.User.findOne({
        where: { email: 'demo@mimascota.test' },
      });
      console.log('ℹ️  Demo ya existía:', demoUser?.email);
    } else {
      throw error;
    }
  }

  for (const pet of samplePets) {
    const existing = await sequelize.models.Pet.findOne({ where: { slug: pet.slug } });
    if (existing) {
      console.log('ℹ️  Aviso ya existe:', pet.slug);
      continue;
    }
    const created = await petService.create(pet, demoUser?.id || null);
    console.log('✅ Aviso:', created.refCode, created.slug);
  }

  console.log('Seed completado.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed falló:', error);
  process.exit(1);
});
