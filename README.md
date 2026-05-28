# Comuna 4.0 — Mapa Vecinal

**Web en producción:** [https://comuna-4-0.vercel.app](https://comuna-4-0.vercel.app)  
**Repositorio:** [github.com/Gonzaloig7/comuna-4-0](https://github.com/Gonzaloig7/comuna-4-0)

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

## Cómo actualizar la web en producción

Esta es la rutina que seguís cada vez que publicás una entrevista nueva o querés hacer cualquier
cambio en el contenido. No necesitás saber programar — solo editar el JSON y ejecutar tres comandos.

### El flujo completo, paso a paso

**Paso 1 — Editá el JSON**

Abrí `src/data/comuna4.json` con cualquier editor de texto (el Bloc de notas funciona, pero
recomiendo [VS Code](https://code.visualstudio.com/) porque resalta los errores de formato).

Hacé los cambios que necesites: agregar una plaza, marcarla como visitada, pegar un link de video.
Guardá el archivo.

---

**Paso 2 — Verificá que funciona localmente**

Antes de publicar, conviene ver los cambios en tu computadora:

```powershell
cd "C:\Users\gonsa\OneDrive\Documents\Cloude\mapa-comuna4"
npm run dev
```

Abrí `http://localhost:5173` en el navegador y confirmá que todo se ve bien.
Cuando termines, cerrá el servidor con **Ctrl+C** en la terminal.

> Si no querés verificar localmente, podés saltear este paso e ir directo al Paso 3.

---

**Paso 3 — Publicá los cambios**

Ejecutá estos tres comandos uno por uno (copiá y pegá tal cual):

```powershell
cd "C:\Users\gonsa\OneDrive\Documents\Cloude\mapa-comuna4"
```

```powershell
git add src/data/comuna4.json
```

```powershell
git commit -m "contenido: descripcion breve de lo que cambiaste"
```

```powershell
git push
```

Reemplazá `"descripcion breve de lo que cambiaste"` por algo descriptivo, por ejemplo:
- `"contenido: agrego entrevista Plaza Solís Instagram"`
- `"contenido: marco Parque Lezama como visitada"`
- `"contenido: nueva plaza Parque Irigoyen en La Boca"`

---

**Paso 4 — Esperá ~2 minutos**

Vercel detecta el push automáticamente y reconstruye la web. En general tarda entre 60 y 90 segundos.

Podés ver el progreso en tiempo real en:
[vercel.com/nostrosenelalgoritmo/comuna-4-0](https://vercel.com/nostrosenelalgoritmo/comuna-4-0)

Cuando el deploy termine, aparece un tilde verde ✓ y la web en [https://comuna-4-0.vercel.app](https://comuna-4-0.vercel.app) ya tiene los cambios.

---

### Si algo sale mal

**El JSON tiene un error de formato** (falta una coma, una llave, etc.)

El build de Vercel va a fallar y la web anterior se mantiene intacta — no se rompe nada.
VS Code te muestra el error en rojo antes de que subas. Para verificar el JSON manualmente,
pegalo en [jsonlint.com](https://jsonlint.com) y te dice exactamente qué está mal.

---

**Querés deshacer el último cambio**

Si recién hiciste push y te arrepentiste, ejecutá:

```powershell
cd "C:\Users\gonsa\OneDrive\Documents\Cloude\mapa-comuna4"
git revert HEAD --no-edit
git push
```

Esto crea un nuevo commit que deshace el anterior. Vercel despliega la versión revertida
en ~2 minutos. La web nunca queda rota.

---

**Querés ver el historial de cambios**

```powershell
cd "C:\Users\gonsa\OneDrive\Documents\Cloude\mapa-comuna4"
git log --oneline
```

Muestra todos los commits con fecha y descripción, del más reciente al más antiguo.

---

**Ver los logs de Vercel si un deploy falla**

1. Abrí [vercel.com/nostrosenelalgoritmo/comuna-4-0](https://vercel.com/nostrosenelalgoritmo/comuna-4-0)
2. Hacé click en el deploy con ✗ rojo
3. En la pestaña **"Build Logs"** vas a ver exactamente qué falló

El error más común es un JSON mal formateado. Con ese log y [jsonlint.com](https://jsonlint.com)
se resuelve en minutos.

---

## Extender la web en el futuro

El JSON tiene estructura preparada para agregar capas adicionales (escuelas, hospitales, etc.)  
sin cambiar la arquitectura base. Alcanza con agregar un array nuevo dentro de cada barrio  
y crear el componente visual correspondiente.
