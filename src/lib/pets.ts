import { DEFAULT_PET_IMAGE, featuredPetIds, pets } from '../data/pets';
import type { Pet } from '../data/pets';

export function getPetBySlug(slug: string) {
  return pets.find((pet) => pet.slug === slug);
}

export function getFeaturedPets() {
  return pets.filter((pet) => featuredPetIds.includes(pet.id));
}

export function getPetGalleryImages(pet: Pet) {
  if (pet.galleryImages.length > 0) return pet.galleryImages;
  return [pet.heroImage || DEFAULT_PET_IMAGE];
}

export function statusLabel(status: Pet['status']) {
  const labels: Record<Pet['status'], string> = {
    perdida: 'Perdida',
    encontrada: 'Encontrada',
    reunida: 'Reunida',
  };
  return labels[status] ?? status;
}

export function kindLabel(kind: Pet['kind']) {
  const labels: Record<Pet['kind'], string> = {
    perro: 'Perro',
    gato: 'Gato',
    otro: 'Otro',
  };
  return labels[kind] ?? kind;
}

export function sizeLabel(size: Pet['size']) {
  const labels: Record<Pet['size'], string> = {
    pequeño: 'Pequeño',
    mediano: 'Mediano',
    grande: 'Grande',
  };
  return labels[size] ?? size;
}

export function sexLabel(sex: Pet['sex']) {
  const labels: Record<Pet['sex'], string> = {
    macho: 'Macho',
    hembra: 'Hembra',
    desconocido: 'No especificado',
  };
  return labels[sex] ?? sex;
}

export function formatLastSeen(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatPetMeta(pet: Pet) {
  return `${pet.zone}, ${pet.city} · ${kindLabel(pet.kind)} · ${statusLabel(pet.status)}`;
}

export function buildSearchBlob(pet: Pet) {
  return [
    pet.name,
    pet.title,
    pet.color,
    pet.breed,
    pet.description,
    pet.zone,
    pet.city,
    ...pet.characteristics,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function catalogHasStatus(status: Pet['status']) {
  return pets.some((p) => p.status === status);
}
