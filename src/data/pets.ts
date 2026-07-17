/** Catálogo de avisos — Mi Mascota */
export type PetKind = 'perro' | 'gato' | 'otro';
export type PetStatus = 'perdida' | 'encontrada' | 'reunida';
export type PetSex = 'macho' | 'hembra' | 'desconocido';
export type PetSize = 'pequeño' | 'mediano' | 'grande';

export interface Pet {
  id: string;
  slug: string;
  title: string;
  name: string;
  status: PetStatus;
  kind: PetKind;
  breed?: string;
  sex: PetSex;
  size: PetSize;
  color: string;
  ageApprox?: string;
  city: string;
  zone: string;
  lastSeenDate: string;
  lastSeenPlace: string;
  description: string;
  characteristics: string[];
  heroImage: string;
  galleryImages: string[];
  contactName: string;
  contactPhoneDisplay: string;
  refCode: string;
}

export const DEFAULT_PET_IMAGE = '/assets/pet-placeholder.svg';

export const pets: Pet[] = [
  {
    id: 'pet-001',
    slug: 'luna-labradora-perdida-centro',
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
    characteristics: ['Collar rojo', 'Chapita con nombre', 'Muy sociable', 'Sin agresividad'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'María',
    contactPhoneDisplay: '343 555-0101',
    refCode: 'MM-001',
  },
  {
    id: 'pet-002',
    slug: 'michi-gato-encontrado-parque-urquiza',
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
      'Lo encontramos merodeando cerca de los bancos del parque. Parece doméstico, está bien alimentado y acepta caricias. Por ahora está en casa de tránsito.',
    characteristics: ['Atigrado naranja', 'Orejas limpias', 'Sin collar', 'Castrado (posible)'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Lucas',
    contactPhoneDisplay: '343 555-0202',
    refCode: 'MM-002',
  },
  {
    id: 'pet-003',
    slug: 'rocky-pastor-perdido-bajada-grande',
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
      'Rocky salió de la casa por un portón mal cerrado. Es protector pero no agresivo con personas. Tiene cicatriz pequeña en la pata trasera derecha.',
    characteristics: ['Cicatriz pata trasera', 'Chip', 'Collar negro', 'Responde a Rocky'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Diego',
    contactPhoneDisplay: '343 555-0303',
    refCode: 'MM-003',
  },
  {
    id: 'pet-004',
    slug: 'nena-gata-perdida-villa-urquiza',
    title: 'Nena — gata blanca y gris perdida',
    name: 'Nena',
    status: 'perdida',
    kind: 'gato',
    sex: 'hembra',
    size: 'pequeño',
    color: 'Blanca con manchas grises',
    ageApprox: '1 año',
    city: 'Paraná',
    zone: 'Villa Urquiza',
    lastSeenDate: '2026-07-14',
    lastSeenPlace: 'Calle Entre Ríos al 800',
    description:
      'Nena es tímida y suele esconderse bajo autos. Tiene collar celeste muy fino. Se perdió un día de lluvia y no volvió.',
    characteristics: ['Collar celeste', 'Tímida', 'Ojos verdes', 'Maulla suave'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Valentina',
    contactPhoneDisplay: '343 555-0404',
    refCode: 'MM-004',
  },
  {
    id: 'pet-005',
    slug: 'toby-caniche-encontrado-la-paz',
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
    description:
      'Perrito blanco tipo caniche, sin collar, muy juguetón. Lo estamos cuidando hasta encontrar a su familia. Tiene pelo un poco largo.',
    characteristics: ['Sin collar', 'Muy juguetón', 'Pelo largo', 'No parece callejero'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Sofía',
    contactPhoneDisplay: '343 555-0505',
    refCode: 'MM-005',
  },
  {
    id: 'pet-006',
    slug: 'cocoa-gato-reunido-san-martin',
    title: 'Cocoa — reunida con su familia',
    name: 'Cocoa',
    status: 'reunida',
    kind: 'gato',
    breed: 'Común',
    sex: 'hembra',
    size: 'mediano',
    color: 'Marrón chocolate',
    ageApprox: '4 años',
    city: 'Paraná',
    zone: 'San Martín',
    lastSeenDate: '2026-06-28',
    lastSeenPlace: 'Alrededores de Av. San Martín',
    description:
      '¡Historia con final feliz! Cocoa estuvo perdida una semana y volvió gracias a un vecino que vio el aviso. Dejamos el caso como referencia de que sí se puede.',
    characteristics: ['Collar con cascabel', 'Chip', 'Muy cariñosa'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Equipo Mi Mascota',
    contactPhoneDisplay: '343 000-0000',
    refCode: 'MM-006',
  },
  {
    id: 'pet-007',
    slug: 'max-mestizo-perdido-el-sol',
    title: 'Max — mestizo mediano perdido en El Sol',
    name: 'Max',
    status: 'perdida',
    kind: 'perro',
    breed: 'Mestizo',
    sex: 'macho',
    size: 'mediano',
    color: 'Marrón con pecho blanco',
    ageApprox: '2 años',
    city: 'Paraná',
    zone: 'El Sol',
    lastSeenDate: '2026-07-11',
    lastSeenPlace: 'Cerca de la cancha del barrio',
    description:
      'Max se asustó con pirotecnia y salió corriendo. Es miedoso con ruidos fuertes. Tiene una mancha blanca en forma de corazón en el pecho.',
    characteristics: ['Mancha blanca en pecho', 'Miedoso con ruidos', 'Collar marrón'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Andrés',
    contactPhoneDisplay: '343 555-0707',
    refCode: 'MM-007',
  },
  {
    id: 'pet-008',
    slug: 'conejo-encontrado-america',
    title: 'Conejo doméstico encontrado en América',
    name: 'Sin nombre',
    status: 'encontrada',
    kind: 'otro',
    breed: 'Conejo',
    sex: 'desconocido',
    size: 'pequeño',
    color: 'Gris y blanco',
    ageApprox: 'Joven',
    city: 'Paraná',
    zone: 'América',
    lastSeenDate: '2026-07-13',
    lastSeenPlace: 'Vereda de calle Gualeguaychú',
    description:
      'Conejo doméstico suelto en la vereda. Está en una caja improvisada en casa de tránsito. Parece acostumbrado a personas.',
    characteristics: ['Orejas erectas', 'Sin heridas visibles', 'Doméstico'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Camila',
    contactPhoneDisplay: '343 555-0808',
    refCode: 'MM-008',
  },
  {
    id: 'pet-009',
    slug: 'lisa-gata-perdida-saihueque',
    title: 'Lisa — gata negra perdida en Saihueque',
    name: 'Lisa',
    status: 'perdida',
    kind: 'gato',
    sex: 'hembra',
    size: 'mediano',
    color: 'Negra',
    ageApprox: '6 años',
    city: 'Paraná',
    zone: 'Saihueque',
    lastSeenDate: '2026-07-09',
    lastSeenPlace: 'Manzana cercana a la escuela',
    description:
      'Lisa casi no sale de casa. Se perdió tras una mudanza. Tiene un collar elástico rosa y un puntito blanco en el pecho.',
    characteristics: ['Collar rosa elástico', 'Punto blanco en pecho', 'Muy casera'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Patricia',
    contactPhoneDisplay: '343 555-0909',
    refCode: 'MM-009',
  },
  {
    id: 'pet-010',
    slug: 'bruno-bulldog-encontrado-centro',
    title: 'Bruno — bulldog encontrado cerca del centro',
    name: 'Bruno',
    status: 'encontrada',
    kind: 'perro',
    breed: 'Bulldog francés',
    sex: 'macho',
    size: 'pequeño',
    color: 'Atigrado',
    ageApprox: 'Adulto',
    city: 'Paraná',
    zone: 'Centro',
    lastSeenDate: '2026-07-16',
    lastSeenPlace: 'Calle San Martín y Buenos Aires',
    description:
      'Respondió cuando le dijimos Bruno (chapita medio ilegible). Está asustado pero sano. Buscamos a su familia urgente.',
    characteristics: ['Chapita ilegible', 'Respiración ruidosa típica', 'Muy asustado'],
    heroImage: DEFAULT_PET_IMAGE,
    galleryImages: [],
    contactName: 'Hernán',
    contactPhoneDisplay: '343 555-1010',
    refCode: 'MM-010',
  },
];

export const featuredPetIds = ['pet-001', 'pet-002', 'pet-003', 'pet-005', 'pet-007', 'pet-010'];
