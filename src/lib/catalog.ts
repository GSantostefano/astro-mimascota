import { pets as staticPets, type Pet } from '../data/pets';
import { fetchPetBySlug, fetchPets } from './api';

export async function loadPets(apiBase?: string): Promise<Pet[]> {
  try {
    return (await fetchPets({}, apiBase)) as Pet[];
  } catch (error) {
    console.warn('[catalog] API no disponible, uso datos estáticos:', error);
    return staticPets;
  }
}

export async function loadPetBySlug(slug: string, apiBase?: string): Promise<Pet | null> {
  try {
    const pet = await fetchPetBySlug(slug, apiBase);
    if (pet) return pet as Pet;
  } catch (error) {
    console.warn('[catalog] API slug falló, busco en estáticos:', error);
  }
  return staticPets.find((pet) => pet.slug === slug) ?? null;
}

export async function loadFeaturedPets(limit = 6, apiBase?: string): Promise<Pet[]> {
  const pets = await loadPets(apiBase);
  const active = pets.filter((pet) => pet.status !== 'reunida');
  return (active.length > 0 ? active : pets).slice(0, limit);
}
