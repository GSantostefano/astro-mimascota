const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { buildPetSlug, allocateRefCode } = require('../utils/pets');

function toDateOnly(value) {
  if (!value) return value;
  if (typeof value === 'string') return value.slice(0, 10);
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, '0');
    const d = String(value.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return value;
}

class PetService {
  async find(query = {}) {
    const where = {};

    if (query.status) where.status = query.status;
    if (query.kind) where.kind = query.kind;
    if (query.city) where.city = query.city;
    if (query.zone) where.zone = query.zone;
    if (query.size) where.size = query.size;
    if (query.sex) where.sex = query.sex;
    if (query.userId) where.userId = query.userId;

    if (query.q) {
      const like = `%${query.q}%`;
      where[Op.or] = [
        { title: { [Op.like]: like } },
        { name: { [Op.like]: like } },
        { color: { [Op.like]: like } },
        { description: { [Op.like]: like } },
        { zone: { [Op.like]: like } },
        { city: { [Op.like]: like } },
        { breed: { [Op.like]: like } },
      ];
    }

    const order =
      query.sort === 'date_asc'
        ? [['lastSeenDate', 'ASC'], ['id', 'ASC']]
        : query.sort === 'date_desc'
          ? [['lastSeenDate', 'DESC'], ['id', 'DESC']]
          : [['id', 'DESC']];

    const pets = await models.Pet.findAll({
      where,
      order,
      include: [
        {
          association: 'owner',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    return pets;
  }

  async findOne(id) {
    const pet = await models.Pet.findByPk(id, {
      include: [
        {
          association: 'owner',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });
    if (!pet) {
      throw boom.notFound('Aviso no encontrado');
    }
    return pet;
  }

  async findBySlug(slug) {
    const pet = await models.Pet.findOne({
      where: { slug },
      include: [
        {
          association: 'owner',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });
    if (!pet) {
      throw boom.notFound('Aviso no encontrado');
    }
    return pet;
  }

  async create(data, userId = null) {
    const tempSuffix = Date.now().toString(36);
    const slug =
      data.slug ||
      buildPetSlug({
        name: data.name,
        kind: data.kind,
        zone: data.zone,
        status: data.status,
        idSuffix: tempSuffix,
      });

    const existingSlug = await models.Pet.findOne({ where: { slug } });
    if (existingSlug) {
      throw boom.conflict('Ya existe un aviso con ese slug');
    }

    const payload = {
      ...data,
      slug,
      lastSeenDate: toDateOnly(data.lastSeenDate),
      refCode: data.refCode || `TMP-${tempSuffix}`,
      userId: userId ?? data.userId ?? null,
      characteristics: data.characteristics || [],
      galleryImages: data.galleryImages || [],
      heroImage: data.heroImage || '/assets/pet-placeholder.svg',
    };

    const pet = await models.Pet.create(payload);

    if (!data.refCode) {
      const refCode = await allocateRefCode(models, pet.id);
      await pet.update({ refCode });
    }

    return this.findOne(pet.id);
  }

  async update(id, changes, actor = null) {
    const pet = await this.findOne(id);
    this.assertCanManage(pet, actor);

    const payload = { ...changes };
    if (payload.characteristics && !Array.isArray(payload.characteristics)) {
      delete payload.characteristics;
    }
    if (payload.galleryImages && !Array.isArray(payload.galleryImages)) {
      delete payload.galleryImages;
    }

    await pet.update(payload);
    return this.findOne(id);
  }

  async delete(id, actor = null) {
    const pet = await this.findOne(id);
    this.assertCanManage(pet, actor);
    await pet.destroy();
    return { id: Number(id) };
  }

  assertCanManage(pet, actor) {
    if (!actor) return;
    if (actor.role === 'admin') return;
    if (pet.userId && Number(pet.userId) === Number(actor.id)) return;
    throw boom.forbidden('No podés modificar este aviso');
  }
}

module.exports = PetService;
