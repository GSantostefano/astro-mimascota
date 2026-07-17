import { pets as staticPets, type Pet } from '../data/pets';
import { fetchPetBySlug, fetchPets } from './api';

export async function loadPets(): Promise<Pet[]> {
  try {
    return (await fetchPets()) as Pet[];
  } catch (error) {
    console.warn('[catalog] API no disponible, uso datos estáticos:', error);
    return staticPets;
  }
}

export async function loadPetBySlug(slug: string): Promise<Pet | null> {
  try {
    const pet = await fetchPetBySlug(slug);
    if (pet) return pet as Pet;
  } catch (error) {
    console.warn('[catalog] API slug falló, busco en estáticos:', error);
  }
  return staticPets.find((pet) => pet.slug === slug) ?? null;
}

export async function loadFeaturedPets(limit = 6): Promise<Pet[]> {
  const pets = await loadPets();
  const active = pets.filter((pet) => pet.status !== 'reunida');
  return (active.length > 0 ? active : pets).slice(0, limit);
}
