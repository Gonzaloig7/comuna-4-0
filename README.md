# Mapa Vecinal – Comuna 4 CABA

Mapa interactivo de las plazas de La Boca, Barracas, Parque Patricios y Nueva Pompeya.  
Permite explorar el territorio, acceder a entrevistas en redes sociales y dejar reclamos barriales.

## Correr el proyecto

```bash
cd mapa-comuna4
npm install
npm run dev
```

Abrí `http://localhost:5173` en el navegador.

Para publicar en Vercel o Netlify: `npm run build` genera la carpeta `dist/` lista para deploy estático.

---

## Cómo editar el contenido

**Todo el contenido editable está en `src/data/comuna4.json`.**  
No necesitás tocar ningún archivo `.jsx` para tareas editoriales.

### Cambiar el link del formulario de reclamos

```json
"config": {
  "formularioReclamosUrl": "https://forms.gle/TU-LINK-REAL-ACÁ"
}
```

---

### Agregar una plaza nueva

1. Abrí `src/data/comuna4.json`.
2. Ubicá el barrio correspondiente dentro del array `"barrios"`.
3. Agregá un objeto al final del array `"plazas"` del barrio:

```json
{
  "id": "nombre-de-plaza-en-kebab-case",
  "nombre": "Nombre de la Plaza",
  "svgX": 200,
  "svgY": 150,
  "visitada": false,
  "descripcion": "Descripción breve de la plaza.",
  "videos": null
}
```

> **`svgX` y `svgY`**: son las coordenadas del marcador en el mapa del barrio (viewBox 0 0 500 400).  
> Ajustá los valores para que el punto quede en una posición razonable.  
> Tip: X va de 0 (izquierda) a 500 (derecha), Y va de 0 (arriba) a 400 (abajo).

---

### Marcar una plaza como visitada

Cambiá `"visitada": false` a `"visitada": true`.

```json
"visitada": true
```

El mapa actualiza automáticamente el color (verde) y el ícono 🎥.

---

### Agregar links de entrevistas

Reemplazá el campo `"videos"` de la plaza:

```json
"videos": {
  "instagram": "https://www.instagram.com/reel/TU-ID",
  "tiktok": "https://www.tiktok.com/@usuario/video/TU-ID",
  "youtube": "https://youtu.be/TU-ID"
}
```

Podés omitir cualquier red poniendo `null` en lugar de la URL:

```json
"videos": {
  "instagram": "https://...",
  "tiktok": null,
  "youtube": "https://..."
}
```

Solo aparecen botones para las redes que tengan URL.

---

## Estructura de archivos

```
src/
  components/
    MapaComuna.jsx    ← SVG del mapa de la comarca (4 barrios cliqueables)
    MapaBarrio.jsx    ← SVG de cada barrio + marcadores de plazas
    PlazaModal.jsx    ← Modal al tocar una plaza
    BotonReclamos.jsx ← Botón flotante "Dejá tu reclamo"
    Contador.jsx      ← "X de Y plazas visitadas"
  data/
    comuna4.json      ← FUENTE DE VERDAD — editá acá el contenido
  pages/
    Home.jsx          ← Vista inicial (mapa de la comuna)
    Barrio.jsx        ← Vista de cada barrio
```

## Reemplazar los mapas SVG

Los mapas son placeholders geográficamente plausibles.  
Cuando tengas los SVG definitivos del diseñador:

- **Mapa de la comuna**: reemplazá los polígonos en `MapaComuna.jsx` (buscá `TODO: reemplazar`).
- **Mapas de barrio**: reemplazá la función `XxxBackground()` correspondiente en `MapaBarrio.jsx`.  
  Los marcadores de plazas se superponen automáticamente — no necesitás tocarlos.

## Extender la web en el futuro

El JSON tiene estructura preparada para agregar capas adicionales (escuelas, hospitales, etc.)  
sin cambiar la arquitectura base. Alcanza con agregar un array nuevo dentro de cada barrio  
y crear el componente visual correspondiente.
