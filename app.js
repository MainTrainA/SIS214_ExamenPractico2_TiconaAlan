const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;
const THEME_STORAGE_KEY = 'preferencia_tema_portafolio';

const cargarTemaGuardado = () => {
    const temaSerializado = localStorage.getItem(THEME_STORAGE_KEY);
    if (temaSerializado) {
        const configuracion = JSON.parse(temaSerializado);
        rootElement.setAttribute('data-theme', configuracion.tema);
        themeToggleBtn.setAttribute('aria-checked', String(configuracion.tema === 'dark'));
        themeToggleBtn.textContent = configuracion.tema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
};

themeToggleBtn.addEventListener('click', () => {
    const temaActual = rootElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';

    rootElement.setAttribute('data-theme', nuevoTema);
    themeToggleBtn.setAttribute('aria-checked', String(nuevoTema === 'dark'));
    themeToggleBtn.textContent = nuevoTema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';

    // Persistencia obligatoria usando JSON.stringify()
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ tema: nuevoTema, actualizado: new Date().toISOString() }));
});

cargarTemaGuardado();


const menuToggleBtn = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggleBtn.addEventListener('click', () => {
    const estaExpandido = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    const nuevoEstado = !estaExpandido;

    mainNav.classList.toggle('activo');
    menuToggleBtn.setAttribute('aria-expanded', String(nuevoEstado));
    menuToggleBtn.textContent = nuevoEstado ? '✕ Cerrar' : '☰ Menú';
    menuToggleBtn.setAttribute('aria-label', nuevoEstado ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
});


const PROYECTOS_INMUTABLES = Object.freeze([
    { id: 1, titulo: 'Portal Web Mercería Express', categoria: 'Colaboración GitHub / Web', tecnologia: 'HTML5, CSS3, JavaScript' },
    { id: 2, titulo: 'Landing Page Interactiva CV', categoria: 'Frontend SIS-214', tecnologia: 'JavaScript ES6+, CSS Grid, Flexbox' },
    { id: 3, titulo: 'Gestor de Inventario Académico', categoria: 'Fullstack', tecnologia: 'JavaScript, REST API, JSON' },
    { id: 4, titulo: 'Dashboard de Consumo Eléctrico', categoria: 'Visualización de Datos', tecnologia: 'Async/Await, Fetch API, WAI-ARIA' }
]);

const inputBuscador = document.getElementById('buscador-proyectos');
const contenedorProyectos = document.getElementById('contenedor-proyectos');

const renderizarProyectos = (terminoBusqueda = '') => {
    const terminoLimpio = terminoBusqueda.trim().toLowerCase();

    // Tubería funcional encadenando explícitamente .filter() y .map() sin mutar el arreglo original
    const tarjetasHTML = PROYECTOS_INMUTABLES
        .filter((proyecto) =>
            proyecto.titulo.toLowerCase().includes(terminoLimpio) ||
            proyecto.tecnologia.toLowerCase().includes(terminoLimpio) ||
            proyecto.categoria.toLowerCase().includes(terminoLimpio)
        )
        .map((proyecto) => `
            <article>
                <h3>${proyecto.titulo}</h3>
                <p><strong>Área:</strong> ${proyecto.categoria}</p>
                <p><strong>Tecnologías:</strong> ${proyecto.tecnologia}</p>
            </article>
        `)
        .join('');

    contenedorProyectos.innerHTML = tarjetasHTML || '<p>No se encontraron proyectos que coincidan con tu búsqueda.</p>';
};

inputBuscador.addEventListener('input', (evento) => {
    renderizarProyectos(evento.target.value);
});

renderizarProyectos();


const formularioContacto = document.getElementById('formulario-contacto');
const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');
const campoMensaje = document.getElementById('mensaje');
const mensajeExito = document.getElementById('mensaje-exito');

const validarCampoEnTiempoReal = (campo, idError, mensajePersonalizado) => {
    const elementoError = document.getElementById(idError);
    if (!campo.validity.valid) {
        elementoError.textContent = mensajePersonalizado;
        campo.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        elementoError.textContent = '';
        campo.setAttribute('aria-invalid', 'false');
        return true;
    }
};

campoNombre.addEventListener('input', () =>
    validarCampoEnTiempoReal(campoNombre, 'error-nombre', 'El nombre es obligatorio (mínimo 3 caracteres).')
);

campoEmail.addEventListener('input', () =>
    validarCampoEnTiempoReal(campoEmail, 'error-email', 'Ingresa un correo electrónico con formato válido.')
);

campoMensaje.addEventListener('input', () =>
    validarCampoEnTiempoReal(campoMensaje, 'error-mensaje', 'El mensaje debe contener al menos 10 caracteres.')
);

formularioContacto.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita la recarga de la página

    const esNombreValido = validarCampoEnTiempoReal(campoNombre, 'error-nombre', 'El nombre es obligatorio (mínimo 3 caracteres).');
    const esEmailValido = validarCampoEnTiempoReal(campoEmail, 'error-email', 'Ingresa un correo electrónico con formato válido.');
    const esMensajeValido = validarCampoEnTiempoReal(campoMensaje, 'error-mensaje', 'El mensaje debe contener al menos 10 caracteres.');

    if (esNombreValido && esEmailValido && esMensajeValido) {
        mensajeExito.textContent = `¡Gracias por escribir, ${campoNombre.value}! Tu mensaje fue validado y registrado correctamente.`;
        mensajeExito.className = 'exito-texto';
        formularioContacto.reset();
    } else {
        mensajeExito.textContent = 'Por favor, corrige los campos marcados antes de enviar.';
        mensajeExito.className = '';
    }
});


const estadoApi = document.getElementById('estado-api');
const contenedorApi = document.getElementById('contenedor-api');

// Nota: Puedes cambiar 'octocat' por tu propio nombre de usuario de GitHub
const GITHUB_USER = 'MainTrainA';

const obtenerRepositoriosGitHub = async (usuario) => {
    // Estado 1: Cargando (loading)
    estadoApi.textContent = '⏳ Cargando repositorios desde la API pública de GitHub...';
    contenedorApi.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/users/${usuario}/repos?per_page=6&sort=updated`);

        // Evaluación explícita de response.ok y códigos de estado HTTP
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('400 Bad Request: La petición enviada a la API es incorrecta.');
            } else if (response.status === 404) {
                throw new Error('404 Not Found: No se encontró el usuario o recurso en GitHub.');
            } else if (response.status >= 500) {
                throw new Error('500 Internal Server Error: El servidor de GitHub presenta fallos internos.');
            } else {
                throw new Error(`Error HTTP inesperado: Estado ${response.status}`);
            }
        }

        // Estado 200 OK
        const datos = await response.json();

        // Estado 2: Éxito (success)
        estadoApi.textContent = `✅ Estado 200 OK: Se cargaron ${datos.length} repositorios exitosamente.`;
        contenedorApi.innerHTML = datos.map((repo) => `
            <article>
                <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
                <p>${repo.description || 'Repositorio de desarrollo de software.'}</p>
                <p><strong>Lenguaje:</strong> ${repo.language || 'Múltiple'} | ⭐ ${repo.stargazers_count}</p>
            </article>
        `).join('');

    } catch (error) {
        // Estado 3: Error (error)
        estadoApi.textContent = `❌ Error al conectar con la API: ${error.message}`;
        contenedorApi.innerHTML = '<p>No se pudieron mostrar los datos remotos en este momento.</p>';
    }
};

obtenerRepositoriosGitHub(GITHUB_USER);