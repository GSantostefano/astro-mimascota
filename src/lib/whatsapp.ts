import { SITE, brandFull } from '../config/site';
import type { Pet } from '../data/pets';
import { kindLabel, statusLabel } from './pets';

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

export function buildPetWhatsAppLink(pet: Pet) {
  return buildWhatsAppLink(
    `Hola ${brandFull}, vi el aviso de "${pet.title}" (ref. ${pet.refCode}, ${statusLabel(pet.status)} · ${kindLabel(pet.kind)}). ¿Puedo ayudar o recibir más información?`,
  );
}

export interface PublishPetFormData {
  status: string;
  name: string;
  kind: string;
  breed: string;
  sex: string;
  size: string;
  color: string;
  city: string;
  zone: string;
  lastSeenPlace: string;
  lastSeenDate: string;
  description: string;
  characteristics: string;
  contactName: string;
  contactPhone: string;
}

export function buildPublishPetWhatsAppMessage(data: PublishPetFormData) {
  const lines = [
    `Hola ${brandFull}, quiero publicar un aviso:`,
    '',
    `Estado: ${data.status}`,
    `Nombre: ${data.name || 'Sin nombre'}`,
    `Tipo: ${data.kind}`,
    `Raza: ${data.breed || '—'}`,
    `Sexo: ${data.sex}`,
    `Tamaño: ${data.size}`,
    `Color: ${data.color}`,
    `Ciudad: ${data.city}`,
    `Zona: ${data.zone}`,
    `Lugar: ${data.lastSeenPlace}`,
    `Fecha: ${data.lastSeenDate}`,
    `Descripción: ${data.description}`,
    `Características: ${data.characteristics || '—'}`,
    '',
    `Contacto: ${data.contactName}`,
    `Teléfono: ${data.contactPhone}`,
  ];
  return lines.join('\n');
}
