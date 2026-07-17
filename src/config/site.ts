export const SITE = {
  name: 'Mi Mascota',
  subtitle: 'avisos de mascotas perdidas',
  tagline: 'Ayudamos a reunir mascotas con sus familias',
  description:
    'Mi Mascota — avisos de mascotas perdidas y encontradas. Buscá por ciudad, zona y tipo, o publicá un aviso por WhatsApp.',
  city: 'Paraná',
  province: 'Entre Ríos',
  country: 'Argentina',
  phone: '3430000000',
  phoneDisplay: '343 000-0000',
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '5493430000000',
  email: 'hola@mimascota.example.com',
  logoSrc: '/favicon.svg',
  instagramUrl: 'https://www.instagram.com/',
  facebookUrl: 'https://www.facebook.com/',
  howItWorks: [
    'Publicás el aviso por WhatsApp con foto y datos.',
    'Moderamos y lo sumamos al catálogo del sitio.',
    'Quien la vea puede contactarte directo por WhatsApp.',
  ] as const,
  legalDisclaimer:
    'Los avisos son informativos. Verificá siempre la identidad de la mascota y de las personas antes de cualquier encuentro. Mi Mascota no intermedia ni garantiza resultados.',
};

/** Marca completa para títulos, WhatsApp y metadatos */
export const brandFull = SITE.name;
