const Joi = require('joi');

const status = Joi.string().valid('perdida', 'encontrada', 'reunida');
const kind = Joi.string().valid('perro', 'gato', 'otro');
const sex = Joi.string().valid('macho', 'hembra', 'desconocido');
const size = Joi.string().valid('pequeño', 'mediano', 'grande');

const createPetSchema = Joi.object({
  title: Joi.string().min(3).max(180).required(),
  name: Joi.string().max(80).allow('', null),
  status: status.default('perdida'),
  kind: kind.required(),
  breed: Joi.string().max(80).allow('', null),
  sex: sex.default('desconocido'),
  size: size.default('mediano'),
  color: Joi.string().min(2).max(80).required(),
  ageApprox: Joi.string().max(40).allow('', null),
  city: Joi.string().min(2).max(80).required(),
  zone: Joi.string().min(2).max(80).required(),
  lastSeenDate: Joi.alternatives()
    .try(
      Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
      Joi.date().iso(),
    )
    .required(),
  lastSeenPlace: Joi.string().min(2).max(180).required(),
  description: Joi.string().min(10).max(4000).required(),
  characteristics: Joi.array().items(Joi.string().max(80)).default([]),
  heroImage: Joi.string().max(500).allow('', null),
  galleryImages: Joi.array().items(Joi.string().max(500)).default([]),
  contactName: Joi.string().min(2).max(120).required(),
  contactPhoneDisplay: Joi.string().max(40).allow('', null),
  slug: Joi.string().max(120),
  refCode: Joi.string().max(20),
});

const updatePetSchema = createPetSchema.fork(
  [
    'title',
    'kind',
    'color',
    'city',
    'zone',
    'lastSeenDate',
    'lastSeenPlace',
    'description',
    'contactName',
  ],
  (schema) => schema.optional(),
).min(1);

const getPetSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const getPetBySlugSchema = Joi.object({
  slug: Joi.string().min(2).max(160).required(),
});

const listPetsQuerySchema = Joi.object({
  status,
  kind,
  city: Joi.string().max(80),
  zone: Joi.string().max(80),
  size,
  sex,
  q: Joi.string().max(120),
  sort: Joi.string().valid('relevance', 'date_asc', 'date_desc'),
  userId: Joi.number().integer().positive(),
});

module.exports = {
  createPetSchema,
  updatePetSchema,
  getPetSchema,
  getPetBySlugSchema,
  listPetsQuerySchema,
};
