/**
 * boundingBoxes.js
 * Bounding boxes oficiales de los 4 barrios de la Comuna 4.
 * Fuente: límites GCBA / OSM relation de cada barrio.
 * Formato: { south, west, north, east } en grados decimales WGS84.
 */

export const BOUNDING_BOXES = {
  'la-boca': {
    south: -34.657,
    west:  -58.374,
    north: -34.618,
    east:  -58.348,
  },
  'barracas': {
    south: -34.668,
    west:  -58.412,
    north: -34.616,
    east:  -58.346,
  },
  'parque-patricios': {
    south: -34.658,
    west:  -58.425,
    north: -34.618,
    east:  -58.387,
  },
  'nueva-pompeya': {
    south: -34.677,
    west:  -58.453,
    north: -34.636,
    east:  -58.395,
  },
}
