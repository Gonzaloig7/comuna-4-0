/**
 * Genera los assets estáticos necesarios para SEO y PWA:
 *   public/og-image.png       — 1200×630  (Open Graph / WhatsApp)
 *   public/icon-512.png       — 512×512   (PWA Android)
 *   public/icon-192.png       — 192×192   (PWA Android)
 *   public/apple-touch-icon.png — 180×180 (iOS Safari)
 *
 * Requiere: sharp (ya instalado como devDependency)
 * Uso:  node scripts/generate-assets.js
 */

import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '../public')

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true })

// ── OG Image SVG (1200×630) ──────────────────────────────────────────────
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <!-- Fondo papel -->
  <rect width="1200" height="630" fill="#f5ede0"/>

  <!-- Franjas barrios — arriba -->
  <rect x="0"   y="0" width="300" height="16" fill="#1C5BA8"/>
  <rect x="300" y="0" width="300" height="16" fill="#C2185B"/>
  <rect x="600" y="0" width="300" height="16" fill="#B71C1C"/>
  <rect x="900" y="0" width="300" height="16" fill="#212121"/>

  <!-- Franjas barrios — abajo -->
  <rect x="0"   y="614" width="300" height="16" fill="#1C5BA8"/>
  <rect x="300" y="614" width="300" height="16" fill="#C2185B"/>
  <rect x="600" y="614" width="300" height="16" fill="#B71C1C"/>
  <rect x="900" y="614" width="300" height="16" fill="#212121"/>

  <!-- Líneas horizontales (estilo masthead) -->
  <rect x="60" y="118" width="1080" height="2" fill="#1c1917" opacity="0.18"/>
  <rect x="60" y="335" width="1080" height="2" fill="#1c1917" opacity="0.18"/>
  <rect x="60" y="505" width="1080" height="1" fill="#1c1917" opacity="0.10"/>

  <!-- Etiqueta sección -->
  <text x="600" y="98"
    font-family="sans-serif" font-size="15" font-weight="400" letter-spacing="6"
    fill="#1c1917" opacity="0.45" text-anchor="middle">
    PERIODISMO TERRITORIAL · CABA
  </text>

  <!-- Título principal -->
  <text x="600" y="282"
    font-family="sans-serif" font-size="120" font-weight="900" letter-spacing="4"
    fill="#1c1917" text-anchor="middle">
    COMUNA 4.0
  </text>

  <!-- Subtítulo -->
  <text x="600" y="395"
    font-family="serif" font-size="27" font-style="italic"
    fill="#1c1917" opacity="0.72" text-anchor="middle">
    Recorremos las plazas de La Boca, Barracas,
  </text>
  <text x="600" y="433"
    font-family="serif" font-size="27" font-style="italic"
    fill="#1c1917" opacity="0.72" text-anchor="middle">
    Parque Patricios y Nueva Pompeya.
  </text>

  <!-- Indicadores de barrio -->
  <rect x="193" y="464" width="10" height="10" rx="2" fill="#1C5BA8"/>
  <text x="210" y="474" font-family="sans-serif" font-size="13" letter-spacing="2" fill="#1C5BA8">LA BOCA</text>

  <rect x="340" y="464" width="10" height="10" rx="2" fill="#C2185B"/>
  <text x="357" y="474" font-family="sans-serif" font-size="13" letter-spacing="2" fill="#C2185B">BARRACAS</text>

  <rect x="520" y="464" width="10" height="10" rx="2" fill="#B71C1C"/>
  <text x="537" y="474" font-family="sans-serif" font-size="13" letter-spacing="2" fill="#B71C1C">PARQUE PATRICIOS</text>

  <rect x="760" y="464" width="10" height="10" rx="2" fill="#424242"/>
  <text x="777" y="474" font-family="sans-serif" font-size="13" letter-spacing="2" fill="#424242">NUEVA POMPEYA</text>

  <!-- Tagline -->
  <text x="600" y="553"
    font-family="sans-serif" font-size="13" letter-spacing="3"
    fill="#1c1917" opacity="0.38" text-anchor="middle">
    ESCUCHAMOS A LOS VECINOS · LLEVAMOS SUS VOCES A LA LEGISLATURA PORTEÑA
  </text>
</svg>`

// ── Icon SVG (512×512, se escala a otros tamaños) ────────────────────────
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Cuadrantes = 4 barrios -->
  <rect x="0"   y="0"   width="250" height="250" fill="#1C5BA8"/>
  <rect x="262" y="0"   width="250" height="250" fill="#C2185B"/>
  <rect x="0"   y="262" width="250" height="250" fill="#B71C1C"/>
  <rect x="262" y="262" width="250" height="250" fill="#212121"/>
  <!-- Divisores papel -->
  <rect x="250" y="0"   width="12"  height="512" fill="#f5ede0"/>
  <rect x="0"   y="250" width="512" height="12"  fill="#f5ede0"/>
</svg>`

async function run() {
  // OG Image
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(join(publicDir, 'og-image.png'))
  console.log('✓  og-image.png        1200×630')

  // PWA Icons
  const iconBuf = Buffer.from(iconSvg)

  for (const size of [512, 192]) {
    await sharp(iconBuf)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(join(publicDir, `icon-${size}.png`))
    console.log(`✓  icon-${size}.png       ${size}×${size}`)
  }

  // Apple Touch Icon (iOS)
  await sharp(iconBuf)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'apple-touch-icon.png'))
  console.log('✓  apple-touch-icon.png 180×180')

  console.log('\n→ Assets listos en /public')
}

run().catch((err) => { console.error(err); process.exit(1) })
