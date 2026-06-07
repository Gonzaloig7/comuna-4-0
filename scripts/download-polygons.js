/**
 * download-polygons.js
 * Descarga los polígonos de límite de cada barrio desde Overpass API
 * y los guarda en src/data/barrios-poligonos.json
 *
 * Uso: node scripts/download-polygons.js
 */

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// IDs de relations OSM verificados (admin_level=9, boundary=administrative)
const BARRIOS = {
  'la-boca':          { nombre: 'La Boca',         relationId: 2223879 },
  'barracas':         { nombre: 'Barracas',         relationId: 2223536 },
  'parque-patricios': { nombre: 'Parque Patricios', relationId: 2223088 },
  'nueva-pompeya':    { nombre: 'Nueva Pompeya',    relationId: 2223107 },
}

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
]

async function queryOverpass(q) {
  const body = `data=${encodeURIComponent(q)}`
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 comuna4-mapping-script/1.0 (https://github.com/Gonzaloig7/comuna-4-0)',
        },
        body,
      })
      if (!res.ok) { console.warn(`  HTTP ${res.status} from ${url}`); continue }
      return await res.json()
    } catch (e) {
      console.warn('  endpoint failed:', url, e.message)
    }
  }
  throw new Error('All endpoints failed')
}

// Encadena los ways del polígono del barrio.
// Con la recursión "._;>;" la relation no aparece en el output pero sí los ways.
function assemblePoly(data) {
  // Intentar usar refs de la relation si está disponible
  let ways
  const relation = data.elements.find(e => e.type === 'relation')

  if (relation?.members) {
    const outerRefs = new Set(
      relation.members
        .filter(m => m.type === 'way' && m.role !== 'inner')
        .map(m => m.ref)
    )
    ways = data.elements
      .filter(e => e.type === 'way' && outerRefs.has(e.id) && e.geometry?.length)
      .map(e => e.geometry.map(g => [g.lat, g.lon]))
  } else {
    // Sin relation (la recursión la drop del output) → usar TODOS los ways
    ways = data.elements
      .filter(e => e.type === 'way' && e.geometry?.length)
      .map(e => e.geometry.map(g => [g.lat, g.lon]))
  }

  if (!ways.length) return null
  console.log(`  ways a encadenar: ${ways.length}`)

  // Encadenar por proximidad de extremos (umbral 1e-4° ≈ 11m)
  const chain = [ways[0]]
  const rest  = ways.slice(1)
  const EPS = 1e-4

  while (rest.length) {
    const tail = chain[chain.length - 1].at(-1)
    let ok = false
    for (let i = 0; i < rest.length; i++) {
      const seg = rest[i]
      const dH = dist(tail, seg[0])
      const dT = dist(tail, seg.at(-1))
      if (dH < EPS) { chain.push(seg);               rest.splice(i, 1); ok = true; break }
      if (dT < EPS) { chain.push([...seg].reverse()); rest.splice(i, 1); ok = true; break }
    }
    if (!ok) {
      // Salto en el polígono — agregar el resto igual (puede haber sub-polígonos)
      chain.push(...rest)
      break
    }
  }

  return chain.flat()
}

const dist = ([a1, a2], [b1, b2]) => Math.hypot(a1 - b1, a2 - b2)

// Simplificación: Ramer-Douglas-Peucker
function rdp(pts, eps) {
  if (pts.length <= 2) return pts
  let maxD = 0, idx = 0
  const [start, end] = [pts[0], pts.at(-1)]
  for (let i = 1; i < pts.length - 1; i++) {
    const d = pointToSegDist(pts[i], start, end)
    if (d > maxD) { maxD = d; idx = i }
  }
  if (maxD < eps) return [start, end]
  return [...rdp(pts.slice(0, idx + 1), eps), ...rdp(pts.slice(idx), eps).slice(1)]
}

function pointToSegDist([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax, dy = by - ay
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay)
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

async function run() {
  const result = {}

  for (const [id, cfg] of Object.entries(BARRIOS)) {
    console.log(`\n→ ${cfg.nombre} (relation ${cfg.relationId})`)

    // Query por relation ID (más preciso que por nombre+bbox)
    const query = `[out:json][timeout:30];relation(${cfg.relationId});._;>;out geom;`

    try {
      const data = await queryOverpass(query)
      const pts  = assemblePoly(data)

      if (!pts || pts.length < 3) { console.log('  ❌ sin polígono'); continue }
      console.log(`  bruto: ${pts.length} pts`)

      const simplified = rdp(pts, 0.0001)   // ~11m de tolerancia
      console.log(`  simplificado: ${simplified.length} pts`)

      result[id] = simplified
    } catch (e) {
      console.error(`  ❌ error: ${e.message}`)
    }

    // Pausa entre barrios para no saturar la API
    await new Promise(r => setTimeout(r, 3000))
  }

  const out = join(__dirname, '../src/data/barrios-poligonos.json')
  writeFileSync(out, JSON.stringify(result))
  console.log(`\n✅ Guardado en src/data/barrios-poligonos.json`)
  console.log(`   Barrios obtenidos: ${Object.keys(result).join(', ')}`)
}

run().catch(e => { console.error(e); process.exit(1) })
