const API_URL = (import.meta.env.PUBLIC_API_URL || 'http://localhost:3010').replace(/\/$/, '');

export type ApiPet = {
  id: number;
  slug: string;
  title: string;
  name: string;
  status: 'perdida' | 'encontrada' | 'reunida';
  kind: 'perro' | 'gato' | 'otro';
  breed?: string | null;
  sex: 'macho' | 'hembra' | 'desconocido';
  size: 'pequeño' | 'mediano' | 'grande';
  color: string;
  ageApprox?: string | null;
  city: string;
  zone: string;
  lastSeenDate: string;
  lastSeenPlace: string;
  description: string;
  characteristics: string[];
  heroImage?: string | null;
  galleryImages: string[];
  contactName: string;
  contactPhoneDisplay?: string | null;
  refCode: string;
  userId?: number | null;
};

function normalizePet(pet: ApiPet) {
  return {
    ...pet,
    id: `pet-${pet.id}`,
    breed: pet.breed || undefined,
    ageApprox: pet.ageApprox || undefined,
    heroImage: pet.heroImage || '/assets/pet-placeholder.svg',
    galleryImages: pet.galleryImages || [],
    characteristics: pet.characteristics || [],
    contactPhoneDisplay: pet.contactPhoneDisplay || '',
  };
}

export async function fetchPets(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params);
  const url = `${API_URL}/api/pets${query.toString() ? `?${query}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API pets error: ${res.status}`);
  }
  const json = await res.json();
  return (json.data || []).map(normalizePet);
}

export async function fetchPetBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/pets/slug/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API pet error: ${res.status}`);
  }
  const json = await res.json();
  return normalizePet(json.data);
}

export async function createPet(payload: Record<string, unknown>, token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/api/pets`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || `No se pudo crear el aviso (${res.status})`);
  }
  return json.data;
}

export { API_URL };
