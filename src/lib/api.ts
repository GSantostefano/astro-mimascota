type EnvLike = { PUBLIC_API_URL?: string } | undefined;

function normalizeBase(url: string) {
  return String(url).trim().replace(/\/$/, '');
}

function isLocalApi(url: string) {
  return /localhost|127\.0\.0\.1/i.test(url);
}

/**
 * En producción nunca preferimos localhost: el browser del visitante no puede
 * llegar a tu PC. Si el runtime de Cloudflare trae localhost, lo ignoramos.
 */
export function getApiUrl(env?: EnvLike) {
  const fromRuntime = env?.PUBLIC_API_URL ? normalizeBase(env.PUBLIC_API_URL) : '';
  const fromMeta = import.meta.env.PUBLIC_API_URL
    ? normalizeBase(String(import.meta.env.PUBLIC_API_URL))
    : '';
  const fallback = 'http://localhost:3010';

  if (import.meta.env.PROD) {
    if (fromRuntime && !isLocalApi(fromRuntime)) return fromRuntime;
    if (fromMeta && !isLocalApi(fromMeta)) return fromMeta;
    // último recurso: si solo hay localhost, igual lo devolvemos (fallará con mensaje claro)
    return fromRuntime || fromMeta || fallback;
  }

  // Dev local: runtime > meta > localhost
  return fromRuntime || fromMeta || fallback;
}

/** @deprecated prefer getApiUrl() */
export const API_URL = getApiUrl();

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

export async function fetchPets(params: Record<string, string> = {}, apiBase?: string) {
  const base = normalizeBase(apiBase || getApiUrl());
  const query = new URLSearchParams(params);
  const url = `${base}/api/pets${query.toString() ? `?${query}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API pets error: ${res.status}`);
  }
  const json = await res.json();
  return (json.data || []).map(normalizePet);
}

export async function fetchPetBySlug(slug: string, apiBase?: string) {
  const base = normalizeBase(apiBase || getApiUrl());
  const res = await fetch(`${base}/api/pets/slug/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API pet error: ${res.status}`);
  }
  const json = await res.json();
  return normalizePet(json.data);
}

export async function createPet(
  payload: Record<string, unknown>,
  token?: string,
  apiBase?: string,
) {
  const base = normalizeBase(apiBase || getApiUrl());
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${base}/api/pets`, {
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
