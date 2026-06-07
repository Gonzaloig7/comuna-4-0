/**
 * barracasMap.js
 * Datos del barrio Barracas para usar con MapaBarrioOSM.
 * Coordenadas de plazas: fuente GeoJSON GCBA espacio_verde_publico.geojson
 * Bounding box: límites oficiales del barrio según GCBA
 */

// ── Bounding box ────────────────────────────────────────────────────────────
export const BBOX = {
  south: -34.668,
  west:  -58.412,
  north: -34.616,
  east:  -58.346,
}

// ── Plazas con coordenadas reales ───────────────────────────────────────────
export const PLAZAS = [
  {
    id: 'plaza-colombia',
    nombre: 'Plaza Colombia',
    lat: -34.637259,
    lng: -58.373917,
    visitada: false,
    descripcion: 'Una de las plazas más queridas de Barracas, con árboles centenarios y fuente central. Punto de encuentro de la comunidad barraquense, donde se cruzan generaciones y tradiciones.',
    videos: null,
  },
  {
    id: 'plaza-casa-cuna',
    nombre: 'Plaza Casa Cuna',
    lat: -34.629382,
    lng: -58.377945,
    visitada: false,
    descripcion: 'Frente al histórico edificio del Hospital Casa Cuna. Testigo de la transformación urbana de Barracas hacia el norte.',
    videos: null,
  },
  {
    id: 'plaza-virrey-vertiz',
    nombre: 'Plaza Virrey Vértiz',
    lat: -34.636583,
    lng: -58.376834,
    visitada: false,
    descripcion: 'Plaza en la trama residencial de Barracas, cercana al eje de Av. Montes de Oca. Vecinos de varias generaciones se reúnen en este espacio verde.',
    videos: null,
  },
  {
    id: 'plazoleta-herrera',
    nombre: 'Plazoleta Herrera',
    lat: -34.644001,
    lng: -58.375392,
    visitada: false,
    descripcion: 'Pequeña joya verde en el barrio. Su nombre evoca las calles que dibujaron la Barracas obrera e inmigrante.',
    videos: null,
  },
  {
    id: 'plaza-angel-villoldo',
    nombre: 'Plaza Ángel Villoldo',
    lat: -34.649420,
    lng: -58.374101,
    visitada: false,
    descripcion: "Homenaje al creador de 'El Choclo', el tango más grabado de la historia. En el barrio de arraigo tanguero, esta plaza lleva el nombre de uno de sus hijos más ilustres.",
    videos: null,
  },
  {
    id: 'parque-espana',
    nombre: 'Parque España',
    lat: -34.635149,
    lng: -58.385780,
    visitada: false,
    descripcion: 'Amplio espacio verde sobre Av. Amancio Alcorta, pulmón verde del sur de Barracas. Escenario de actividades deportivas comunitarias y encuentros familiares.',
    videos: null,
  },
  {
    id: 'parque-pereyra',
    nombre: 'Parque Pereyra',
    lat: -34.652165,
    lng: -58.387905,
    visitada: true,
    descripcion: 'Espacio verde con mucho movimiento vecinal y vida de barrio. Ya lo visitamos: hablamos con vecinos que lo usan todos los días y que piden más mantenimiento y actividades.',
    videos: {
      instagram: 'https://www.instagram.com/p/DY3B9R1Obwu/?hl=es%2F',
      tiktok: null,
      youtube: null,
    },
  },
  {
    id: 'plaza-diaz-velez',
    nombre: 'Plaza Díaz Vélez',
    lat: -34.652790,
    lng: -58.378018,
    visitada: false,
    descripcion: 'Plaza del sector sur de Barracas, en una zona en proceso de transformación urbana. Espacio de sociabilidad entre el tejido histórico del barrio y el Riachuelo.',
    videos: null,
  },
  {
    id: 'plaza-nuestra-senora-lujan',
    nombre: 'Plaza Nuestra Señora de Luján',
    lat: -34.654500,
    lng: -58.387633,
    visitada: false,
    descripcion: 'Plaza de devoción popular en el sur del barrio, a metros del Riachuelo. La fe popular y la historia de la inmigración conviven en este espacio cercano al agua.',
    videos: null,
  },
]
