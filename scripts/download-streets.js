/**
 * download-streets.js
 * Descarga los datos de calles de cada barrio desde Overpass API
 * y los guarda en src/data/barrios-calles.json
 *
 * Formato de salida: { barrio_id: [{ hw, name, pts[[lat,lng]] }] }
 *
 * Uso: node scripts/download-streets.js
 */

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BARRIOS = {
  'la-boca':          { south:-34.657, west:-58.374, north:-34.618, east:-58.348 },
  'barracas':         { south:-34.668, west:-58.412, north:-34.616, east:-58.346 },
  'parque-patricios': { south:-34.658, west:-58.425, north:-34.618, east:-58.387 },
  'nueva-pompeya':    { south:-34.677, west:-58.453, north:-34.636, east:-58.395 },
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
          'User-Agent': 'Mozilla/5.0 comuna4-mapping/1.0',
        },
        body,
      })
      if (!res.ok) { console.warn(`  HTTP ${res.status} ${url}`); continue }
      return await res.json()
    } catch (e) {
      console.warn('  failed:', url, e.message)
    }
  }
  throw new Error('All endpoints failed')
}

// Simplifica un polyline: Douglas-Peucker
function rdp(pts, eps) {
  if (pts.length <= 2) return pts
  let maxD = 0, idx = 0
  const [s, e] = [pts[0], pts.at(-1)]
  for (let i = 1; i < pts.length - 1; i++) {
    const d = ptSegDist(pts[i], s, e)
    if (d > maxD) { maxD = d; idx = i }
  }
  if (maxD < eps) return [s, e]
  return [...rdp(pts.slice(0, idx + 1), eps), ...rdp(pts.slice(idx), eps).slice(1)]
}
const ptSegDist = ([px,py],[ax,ay],[bx,by]) => {
  const dx=bx-ax, dy=by-ay
  if (!dx && !dy) return Math.hypot(px-ax,py-ay)
  const t = Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy)))
  return Math.hypot(px-(ax+t*dx),py-(ay+t*dy))
}

// Categorías de calle que nos importan
const HW_KEEP = new Set(['trunk','primary','secondary','tertiary','residential','unclassified','living_street'])

async function fetchBarrio(id, bbox) {
  const { south, west, north, east } = bbox
  const box = `${south},${west},${north},${east}`
  const query = `[out:json][timeout:30];(way["highway"~"^(trunk|primary|secondary|tertiary|residential|unclassified|living_street)$"](${box});way["leisure"~"^(park|garden|recreation_ground)$"](${box});way["landuse"~"^(grass|recreation_ground)$"](${box}););out geom;`

  const data = await queryOverpass(query)
  const ways = []
  let skipped = 0

  for (const el of (data.elements ?? [])) {
    if (el.type !== 'way' || !el.geometry?.length) continue

    const hw = el.tags?.highway
    const isGreen = el.tags?.leisure || el.tags?.landuse

    if (!hw && !isGreen) { skipped++; continue }

    // Simplificar puntos
    const rawPts = el.geometry.map(g => [g.lat, g.lon])
    const eps = (hw === 'primary' || hw === 'trunk') ? 0.00002 : 0.00005
    const pts = rawPts.length > 4 ? rdp(rawPts, eps) : rawPts

    ways.push({
      hw: hw ?? 'green',
      name: el.tags?.name ?? null,
      pts,
    })
  }

  return ways
}

async function run() {
  const result = {}

  for (const [id, bbox] of Object.entries(BARRIOS)) {
    console.log(`\n→ ${id}`)
    try {
      const ways = await fetchBarrio(id, bbox)
      result[id] = ways
      const totalPts = ways.reduce((s, w) => s + w.pts.length, 0)
      console.log(`  ${ways.length} ways, ${totalPts} puntos total`)
    } catch (e) {
      console.error(`  ❌ ${e.message}`)
    }

    // Pausa para no saturar la API
    await new Promise(r => setTimeout(r, 3000))
  }

  const out = join(__dirname, '../src/data/barrios-calles.json')
  writeFileSync(out, JSON.stringify(result))

  const size = JSON.stringify(result).length
  console.log(`\n✅ Guardado en src/data/barrios-calles.json`)
  console.log(`   ${(size/1024).toFixed(1)} KB sin comprimir`)
  console.log(`   Barrios: ${Object.keys(result).join(', ')}`)
}

run().catch(e => { console.error(e); process.exit(1) })
