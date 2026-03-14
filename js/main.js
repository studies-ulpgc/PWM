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
        const response = await fetch("../html/categorias.html");
        const templateHTML = await response.text();
        contenedor.innerHTML = templateHTML;
        contenedor.style.display = "block";
        cargarCategoriasDesdeStrapi();
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
                window.location.href = '../html/iniciar-sesion.html';
            }
        });

        if (isLoggedIn) {
            const nombreGuardado = sessionStorage.getItem('userName') || 'Usuario';
            const strong = userPopup.querySelector('strong');
            if (strong) strong.innerText = nombreGuardado;
            const profileName = document.getElementById('user-name-display');
            if (profileName) profileName.innerText = nombreGuardado;
        }
        
        userPopup.addEventListener('click', (e) => e.stopPropagation());
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (isLoggedIn) {
                window.location.href = '../html/ver-cesta.html';
            } else {
                window.location.href = '../html/iniciar-sesion.html';
            }
        });
    }

    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', () => {
            if (isLoggedIn) {
                window.location.href = '../html/lista-deseados.html';
            } else {
                window.location.href = '../html/iniciar-sesion.html';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userName');
            window.location.href = '../html/home.html';
        });
    }

    document.addEventListener("click", () => {
        if (userPopup) userPopup.classList.remove('show');
        if (contenedorcategorias) contenedorcategorias.style.display = "none";
    });
    
    cargarHeadersDesdeStrapi(); // Se llama directamente después de que el header se haya cargado
}

function inicializarProductos() {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    const botonesCesta = document.querySelectorAll('#btnCesta');
    const botonesDeseados = document.querySelectorAll('#btnDeseados');

    botonesCesta.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = '../html/iniciar-sesion.html';
            }
        });
    });

    botonesDeseados.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = '../html/iniciar-sesion.html';
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
                window.location.href = '../html/iniciar-sesion.html';
            }
        });
    });

    botonesAbajo.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
                window.location.href = '../html/iniciar-sesion.html';
            }
        });
    });
}

function simularLogin() {
    sessionStorage.setItem('isLoggedIn', 'true');
    const email = document.getElementById('email')?.value;
    if (email) sessionStorage.setItem('userName', email.split('@')[0]);
    window.location.href = '../html/ver-cuenta.html';
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
    window.location.href = '../html/ver-cuenta.html';
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
                window.location.href = '../html/iniciar-sesion.html';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const esHome = document.body.id === "home-id";
    const headerArchivo = esHome ? '../html/header-grande.html' : '../html/header-corto.html';
    if (esHome){cargarCarrusel();}

    cargarComponente('header', headerArchivo, inicializarHeader);
    cargarComponente('footer', '../html/footer.html');

    if (document.getElementById('productos-contenedor')) {
        cargarElementosRepetidos('productos-contenedor', '../html/producto.html', 12).then(() => {
            inicializarProductos();
            cargarProductosDesdeStrapi();
        });
    }
    if (document.getElementById('comentarios-contenedor')) {
        cargarElementosRepetidos('comentarios-contenedor', '../html/comentario.html', 12).then(() => {
            inicializarComentarios();
            cargarComentariosDesdeStrapi();
        });
    }

    if (document.getElementById('similares')) {
    cargarComponente('similares', '../html/similares.html').then(() => {
        cargarElementosRepetidos('productos-contenedor', '../html/producto.html', 12).then(() => {
            inicializarProductos();
            cargarProductosDesdeStrapi();
        });
    });
    }
    
    if (document.querySelector(".deseados-track")) {
        cargarListaDeseadosDesdeStrapi();
    }

    if (document.querySelector(".pedidos-track")) {
    cargarListaPedidosRealizadosDesdeStrapi();
    }

    if (document.body.id === "articulo-seleccionado") {
        inicializarArticuloSeleccionado();
        cargarProductoSeleccionado();
    }

    inicializarPagar();
});

document.addEventListener('DOMContentLoaded', () => {
    const isLogged = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLogged) {
    document.body.classList.add('not-logged-in');
    } else {
        document.body.classList.remove('not-logged-in');
    }
});

async function cargarHeadersDesdeStrapi() {
    try {
        const response = await fetch("http://localhost:1337/api/headers");
        const data = await response.json();
        const headers = data.data; // Array con los objetos de headers

        // Seleccionamos todos los elementos <a> de categorías en header grande y corto
        const enlacesGrande = document.querySelectorAll(".categorias_grande .text");
        const enlacesCorto = document.querySelectorAll(".categorias_corto .text"); // asumiendo que header corto tiene esta clase

        // Función auxiliar para rellenar los enlaces
        function rellenarEnlaces(enlaces) {
            enlaces.forEach((enlace, i) => {
                if (headers[i]) {
                    enlace.textContent = headers[i].Categoria;
                    // Opcional: hacer que el enlace filtre por categoría
                    enlace.href = `galeria.html?categoria=${encodeURIComponent(headers[i].Categoria)}`;
                } else {
                    enlace.textContent = "";
                    enlace.href = "#";
                }
            });
        }

        rellenarEnlaces(enlacesGrande);
        rellenarEnlaces(enlacesCorto);

    } catch (error) {
        console.error("Error cargando headers:", error);
    }
}

async function cargarCategoriasDesdeStrapi() {
    try {
        const response = await fetch("http://localhost:1337/api/categorias");
        const data = await response.json();
        const categorias = data.data;

        const enlaces = document.querySelectorAll(".categorias .enlaces");

        enlaces.forEach((enlace, i) => {
            if (categorias[i]) {
                const nombre = categorias[i].categoria;

                enlace.textContent = nombre;

                // enlace a galería filtrada
                enlace.href = `galeria.html?categoria=${encodeURIComponent(nombre)}`;
            } else {
                enlace.textContent = "";
                enlace.href = "#";
            }
        });

    } catch (error) {
        console.error("Error cargando categorias desde Strapi:", error);
    }
}

async function cargarListaDeseadosDesdeStrapi() {
    const track = document.querySelector(".deseados-track");
    if (!track) return;

    try {
        const response = await fetch("http://localhost:1337/api/lista-deseados?populate=*");
        const data = await response.json();

        console.log("Lista deseados:", data);

        const items = data?.data || [];
        const tarjetas = track.querySelectorAll(".deseado-item");

        if (items.length === 0) {
            tarjetas.forEach((tarjeta) => {
                const nombre = tarjeta.querySelector("h3");
                const opts = tarjeta.querySelector(".opts");
                const precio = tarjeta.querySelector(".price");
                const thumb = tarjeta.querySelector(".thumb");

                if (nombre) nombre.textContent = "Sin nombre";
                if (opts) opts.textContent = "";
                if (precio) precio.textContent = "";
                if (thumb) thumb.innerHTML = "";
            });
            return;
        }

        tarjetas.forEach((tarjeta, i) => {
            const item = items[i % items.length];

            const nombre = tarjeta.querySelector("h3");
            const opts = tarjeta.querySelector(".opts");
            const precio = tarjeta.querySelector(".price");
            const thumb = tarjeta.querySelector(".thumb");

            if (nombre) nombre.textContent = item.Nombre_del_item || "Sin nombre";
            if (opts) opts.textContent = item.Selecciones || "";
            if (precio) precio.textContent = item.Precio || "";

            const fotoUrl = item.Foto_item?.[0]?.url
                ? `http://localhost:1337${item.Foto_item[0].url}`
                : "";

            if (thumb) {
                thumb.innerHTML = fotoUrl
                    ? `<img src="${fotoUrl}" alt="${item.Nombre_del_item || "Producto"}">`
                    : "";
            }
        });

    } catch (error) {
        console.error("Error cargando lista de deseados:", error);
    }
}

async function cargarListaPedidosRealizadosDesdeStrapi() {
    const track = document.querySelector(".pedidos-track");
    if (!track) return;

    try {
        const response = await fetch("http://localhost:1337/api/lista-pedidos-realizados?populate=*");
        const data = await response.json();

        console.log("Lista pedidos realizados:", data);

        const items = data?.data || [];
        const tarjetas = track.querySelectorAll(".pedido-item");

        if (items.length === 0) {
            tarjetas.forEach((tarjeta) => {
                const nombre = tarjeta.querySelector(".info h3");
                const opts = tarjeta.querySelector(".opts");
                const precio = tarjeta.querySelector(".price");
                const estado = tarjeta.querySelector(".estado-valor");
                const thumb = tarjeta.querySelector(".thumb");

                if (nombre) nombre.textContent = "Sin nombre";
                if (opts) opts.textContent = "";
                if (precio) precio.textContent = "";
                if (estado) estado.textContent = "";
                if (thumb) thumb.innerHTML = "";
            });
            return;
        }

        tarjetas.forEach((tarjeta, i) => {
            const item = items[i % items.length];

            const nombre = tarjeta.querySelector(".info h3");
            const opts = tarjeta.querySelector(".opts");
            const precio = tarjeta.querySelector(".price");
            const estado = tarjeta.querySelector(".estado-valor");
            const thumb = tarjeta.querySelector(".thumb");

            if (nombre) nombre.textContent = item.Nombre_del_item || "Sin nombre";
            if (opts) opts.textContent = item.Selecciones || "";
            if (precio) precio.textContent = item.Precio || "";
            if (estado) estado.textContent = item.Estado || "";

            const fotoUrl = item.Foto_item?.[0]?.url
                ? `http://localhost:1337${item.Foto_item[0].url}`
                : "";

            if (thumb) {
                thumb.innerHTML = fotoUrl
                    ? `<img src="${fotoUrl}" alt="${item.Nombre_del_item || "Producto"}">`
                    : "";
            }
        });

    } catch (error) {
        console.error("Error cargando lista de pedidos realizados:", error);
    }
}
