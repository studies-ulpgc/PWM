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
        const response = await fetch("categorias.html");
        const templateHTML = await response.text();
        contenedor.innerHTML = templateHTML;
        contenedor.style.display = "block";
    } catch (error) {
        console.error("Error cargando categorias:", error);
    }
}

function inicializarHeader() {
    const botonCategorias = document.getElementById("btnCategorias");
    const contenedorcategorias = document.getElementById("categorias");
    const authIcon = document.getElementById('auth-icon');
    const userPopup = document.getElementById('user-popup');
    const logoutBtn = document.getElementById('logout-btn');
    const cartIcon = document.getElementById('cart-icon');
    const wishlistIcon = document.getElementById('wishlist-icon');

    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (botonCategorias) {
        botonCategorias.addEventListener("click", (e) => {
            e.stopPropagation();
            cargarCategorias();
        });
    }

    if (authIcon && userPopup) {

        authIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isLoggedIn) {
                userPopup.classList.toggle('show');
            } else {
                window.location.href = 'iniciar-sesion.html';
            }
        });

        if (isLoggedIn) {
            const nombreGuardado = sessionStorage.getItem('userName') || 'Usuario';
            const strong = userPopup.querySelector('strong');
            if (strong) strong.innerText = nombreGuardado;
        }
        
        userPopup.addEventListener('click', (e) => e.stopPropagation());
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (isLoggedIn) {
                window.location.href = 'ver-cesta.html';
            } else {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    }

    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', () => {
            if (isLoggedIn) {
                window.location.href = 'lista-deseados.html';
            } else {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userName');
            window.location.href = 'home.html';
        });
    }

    document.addEventListener("click", () => {
        if (userPopup) userPopup.classList.remove('show');
        if (contenedorcategorias) contenedorcategorias.style.display = "none";
    });
}

function inicializarProductos() {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    const botonesCesta = document.querySelectorAll('#btnCesta');
    const botonesDeseados = document.querySelectorAll('#btnDeseados');

    botonesCesta.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    });

    botonesDeseados.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    });
}

function inicializarComentarios() {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    const botonesArriba = document.querySelectorAll('#btnArriba');
    const botonesAbajo = document.querySelectorAll('#btnAbajo');

    botonesArriba.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    });

    botonesAbajo.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    });
}

function simularLogin() {
    sessionStorage.setItem('isLoggedIn', 'true');
    const email = document.getElementById('email')?.value;
    if (email) sessionStorage.setItem('userName', email.split('@')[0]);
    window.location.href = 'ver-cuenta.html';
}

function simularRegistro() {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    sessionStorage.setItem('isLoggedIn', 'true');
    
    if (nombreInput?.value) {
        sessionStorage.setItem('userName', nombreInput.value);
    } else if (emailInput?.value) {
        sessionStorage.setItem('userName', emailInput.value.split('@')[0]);
    }
    window.location.href = 'ver-cuenta.html';
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

function inicializarArticuloSeleccionado() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const btnCesta = document.getElementById('btnSumarCesta');

    if (btnCesta) {
        btnCesta.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = 'iniciar-sesion.html';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const esHome = document.body.id === "home-id";
    const headerArchivo = esHome ? 'header-grande.html' : 'header-corto.html';
    
    cargarComponente('header', headerArchivo, inicializarHeader);
    cargarComponente('footer', 'footer.html');

    if (document.getElementById('productos-contenedor')) {
        cargarElementosRepetidos('productos-contenedor', 'producto.html', 12).then(() => {
            inicializarProductos();
        });
    }
    if (document.getElementById('comentarios-contenedor')) {
        cargarElementosRepetidos('comentarios-contenedor', 'comentario.html', 12).then(() => {
            inicializarComentarios();
        });
    }

    if (document.getElementById('similares')) {
    cargarComponente('similares', 'similares.html').then(() => {
        cargarElementosRepetidos('productos-contenedor', 'producto.html', 12).then(() => {
            inicializarProductos();
        });
    });
}
    
    if (document.body.id === "articulo-seleccionado") {
        inicializarArticuloSeleccionado();
    }

    inicializarPagar();
});

const isLogged = sessionStorage.getItem('isLoggedIn') === 'true';

if (!isLogged) {
    document.body.classList.add('not-logged-in');
} else {
    document.body.classList.remove('not-logged-in');
}