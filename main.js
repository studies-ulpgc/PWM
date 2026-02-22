async function cargarComponente(idContenedor, archivoHTML, callback) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return; 

    try {
        const response = await fetch(archivoHTML);
        const templateHTML = await response.text();
        contenedor.innerHTML = templateHTML;
        if (callback) callback(); 
    } catch (error) {
        console.error(`Error cargando ${archivoHTML}:`, error);
    }
}

async function cargarElementosRepetidos(idContenedor, archivoHTML, cantidad) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    try {
        const response = await fetch(archivoHTML);
        const templateHTML = await response.text();
        for (let i = 0; i < cantidad; i++) {
            contenedor.innerHTML += templateHTML;
        }
    } catch (error) {
        console.error(`Error cargando repetidos de ${archivoHTML}:`, error);
    }
}

async function cargarCategorias() {
    const contenedor = document.getElementById("categorias");
    if (!contenedor) return;

    if (contenedor.innerHTML.trim() !== "") {
        contenedor.style.display = contenedor.style.display === "block" ? "none" : "block";
        return;
    }

    try {
        const response = await fetch("CATEGORIAS.html");
        const templateHTML = await response.text();
        contenedor.innerHTML = templateHTML;
        contenedor.style.display = "block";
    } catch (error) {
        console.error("Error cargando categorias:", error);
    }
}

function inicializarHeader() {
    const botonCategorias = document.getElementById("btnCategorias");
    const contenedorCategorias = document.getElementById("categorias");
    const authIcon = document.getElementById('auth-icon');
    const userPopup = document.getElementById('user-popup');
    const logoutBtn = document.getElementById('logout-btn');

    if (botonCategorias) {
        botonCategorias.addEventListener("click", (e) => {
            e.stopPropagation();
            cargarCategorias();
        });
    }

    if (authIcon && userPopup) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        authIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isLoggedIn) {
                userPopup.classList.toggle('show');
            } else {
                window.location.href = 'INICIAR_SESION.html';
            }
        });

        if (isLoggedIn) {
            const nombreGuardado = localStorage.getItem('userName') || 'Usuario';
            const strong = userPopup.querySelector('strong');
            if (strong) strong.innerText = nombreGuardado;
        }
        
        userPopup.addEventListener('click', (e) => e.stopPropagation());
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            window.location.href = 'HOME.html';
        });
    }

    document.addEventListener("click", () => {
        if (userPopup) userPopup.classList.remove('show');
        if (contenedorCategorias) contenedorCategorias.style.display = "none";
    });
}

function simularLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    const email = document.getElementById('email')?.value;
    if (email) localStorage.setItem('userName', email.split('@')[0]);
    window.location.href = 'VER_CUENTA.html';
}

function simularRegistro() {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    localStorage.setItem('isLoggedIn', 'true');
    
    if (nombreInput?.value) {
        localStorage.setItem('userName', nombreInput.value);
    } else if (emailInput?.value) {
        localStorage.setItem('userName', emailInput.value.split('@')[0]);
    }
    window.location.href = 'VER_CUENTA.html';
}

function inicializarPagar() {
    const btnEditar = document.getElementById('btn-editar-direccion');
    const menuDirecciones = document.getElementById('menu-direcciones');
    if (btnEditar && menuDirecciones) {
        btnEditar.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDirecciones.classList.toggle('mostrar');
        });
        document.addEventListener('click', (e) => {
            if (!menuDirecciones.contains(e.target)) {
                menuDirecciones.classList.remove('mostrar');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const esHome = document.body.id === "HOME";
    const headerArchivo = esHome ? 'HEADER_GRANDE.html' : 'HEADER_CORTO.html';
    
    cargarComponente('header', headerArchivo, inicializarHeader);
    cargarComponente('footer', 'FOOTER.html');

    if (document.getElementById('productos-contenedor')) {
        cargarElementosRepetidos('productos-contenedor', 'PRODUCTO.html', 12);
    }
    if (document.getElementById('comentarios-contenedor')) {
        cargarElementosRepetidos('comentarios-contenedor', 'COMENTARIO.html', 12);
    }
    
    inicializarPagar();
});