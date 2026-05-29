# Observatorio Competitivo Hotelero - Versión final corregida

## Clave admin
`admin123`

## Cambios incluidos
- Dashboard general solo con competencia: Hilton, Wyndham y Sheraton.
- Dashboard individual por marca: Hilton, Wyndham, Sheraton y Oro Verde.
- Sidebar separado: General de la competencia / Competencia por marcas / Marca propia.
- Interacción general:
  - Reels = views + likes + comentarios + compartidos.
  - Post/Carrusel = likes + comentarios + compartidos.
- No usa score artificial.
- Contenidos destacados visuales en cards:
  - Reels destacados: views, luego likes, comentarios y compartidos.
  - Post/Carrusel destacados: likes, luego comentarios y compartidos.
- Calendario mensual interactivo:
  - Se adapta automáticamente al dashboard seleccionado.
  - Detecta meses nuevos automáticamente.
  - Hover en cada día con publicaciones.
- Panel admin con contraseña cada vez que se entra.
- Categorías finales:
  - Gastronomía
  - Eventos
  - Hospedaje
  - Otros
- Formatos finales:
  - Reel
  - Post
  - Carrusel

## Firebase
Por defecto está desactivado. Para activarlo:
1. Abre `firebase.js`.
2. Cambia `USE_FIREBASE = false` a `true`.
3. Pega tu configuración real de Firebase.
4. Crea una colección llamada `posts`.
