# Portafolio Profesional Interactivo - SIS-214

Proyecto práctico de la Unidad II (*Desarrollo de Interfaces Dinámicas con JavaScript*) para la asignatura **Tecnologías Web I (SIS-214)** de la **Universidad Católica Boliviana "San Pablo"**.

## 🏗️ Arquitectura de la Solución
La aplicación sigue una arquitectura cliente modular dividida en tres capas:
1. **Capa Estructural (`index.html`):** Maquetación 100% semántica (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) enriquecida con atributos de accesibilidad **WAI-ARIA** (`aria-expanded`, `aria-live`, `aria-label`, `role`).
2. **Capa de Presentación (`styles.css`):** Diseño adaptativo **Mobile-First** gobernado por Custom Properties en `:root`, esquema bidimensional con **CSS Grid** y alineación unidimensional con **Flexbox**, estructurado en 3 umbrales (`<768px`, `768px-1024px`, `>1024px`).
3. **Capa Lógica (`app.js`):** Escrita en JavaScript ES6+ que gestiona el estado del tema en `localStorage` (`JSON.stringify` / `JSON.parse`), menú móvil accesible, filtrado inmutable con `.filter().map()`, validación de formulario en tiempo real con `event.preventDefault()` y consumo asíncrono de la API REST de GitHub mediante `fetch`, `async/await` y manejo de estados HTTP en bloques `try...catch`.

## 🛠️ Tecnologías Utilizadas
- **HTML5 Semántico & WAI-ARIA (WCAG)**
- **CSS3** (Custom Properties, Flexbox, CSS Grid, Media Queries)
- **JavaScript Moderno (ES6+)** (DOM API, Fetch API, Web Storage API)
- **Git & GitHub Pages**

## 🚀 Instrucciones de Ejecución Local
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/MainTrainA/SIS214_ExamenPractico2_TiconaAlan.git
   cd SIS214_ExamenPractico2_TiconaAlan
   ```
2. Abrir `index.html` en un navegador. No se requiere instalar dependencias ni ejecutar un servidor para probar la aplicación localmente.

## Publicación en GitHub Pages
1. En GitHub, abrir **Settings > Pages** del repositorio.
2. En **Build and deployment**, elegir **Deploy from a branch**.
3. Seleccionar la rama `main` y la carpeta `/(root)`, luego guardar.
4. Esperar a que finalice la publicación. La URL del sitio es:

   https://maintraina.github.io/SIS214_ExamenPractico2_TiconaAlan/

La sección de repositorios obtiene datos públicos desde la API REST de GitHub. Para mostrar los repositorios de otra cuenta, cambiar el valor de `GITHUB_USER` en `app.js`.