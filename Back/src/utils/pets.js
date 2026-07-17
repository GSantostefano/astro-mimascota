function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function buildPetSlug({ name, kind, zone, status, idSuffix }) {
  const base = [name || 'mascota', kind, status, zone].filter(Boolean).join('-');
  const slug = slugify(base);
  return idSuffix ? `${slug}-${idSuffix}` : slug;
}

function buildRefCode(id) {
  // Sin pad: evita choques con seeds tipo MM-005 en otro id
  return `MM-${id}`;
}

async function allocateRefCode(models, id) {
  const preferred = `MM-${String(id).padStart(3, '0')}`;
  const clash = await models.Pet.findOne({ where: { refCode: preferred } });
  if (!clash || Number(clash.id) === Number(id)) {
    return preferred;
  }
  return `MM-${id}`;
}

module.exports = {
  slugify,
  buildPetSlug,
  buildRefCode,
  allocateRefCode,
};
