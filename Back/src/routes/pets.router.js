const express = require('express');
const PetService = require('../services/pet.service');
const validatorHandler = require('../middlewares/validator.handler');
const { authHandler, optionalAuthHandler } = require('../middlewares/auth.handler');
const {
  createPetSchema,
  updatePetSchema,
  getPetSchema,
  getPetBySlugSchema,
  listPetsQuerySchema,
} = require('../schemas/pet.schema');

const router = express.Router();
const service = new PetService();

router.get('/', validatorHandler(listPetsQuerySchema, 'query'), async (req, res, next) => {
  try {
    const pets = await service.find(req.query);
    res.json({ ok: true, data: pets, count: pets.length });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/slug/:slug',
  validatorHandler(getPetBySlugSchema, 'params'),
  async (req, res, next) => {
    try {
      const pet = await service.findBySlug(req.params.slug);
      res.json({ ok: true, data: pet });
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id', validatorHandler(getPetSchema, 'params'), async (req, res, next) => {
  try {
    const pet = await service.findOne(req.params.id);
    res.json({ ok: true, data: pet });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  optionalAuthHandler,
  validatorHandler(createPetSchema, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user?.id || null;
      const body = { ...req.body };
      if (!body.name) body.name = 'Sin nombre';
      if (!body.title) {
        body.title = `${body.name} — ${body.kind} ${body.status} en ${body.zone}`;
      }
      const pet = await service.create(body, userId);
      res.status(201).json({ ok: true, data: pet });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  authHandler,
  validatorHandler(getPetSchema, 'params'),
  validatorHandler(updatePetSchema, 'body'),
  async (req, res, next) => {
    try {
      const pet = await service.update(req.params.id, req.body, req.user);
      res.json({ ok: true, data: pet });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  authHandler,
  validatorHandler(getPetSchema, 'params'),
  async (req, res, next) => {
    try {
      const result = await service.delete(req.params.id, req.user);
      res.json({ ok: true, ...result });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
