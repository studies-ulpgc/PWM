async function cargarProductosDesdeStrapi() {
    const contenedor = document.getElementById("productos-contenedor");
    if (!contenedor) return;

    try {
        const response = await fetch("http://localhost:1337/api/productos?populate=*");
        const data = await response.json();
        const productos = data.data; // Los 4 productos de Strapi

        // Seleccionamos TODAS las tarjetas que dibujaste en el HTML
        const tarjetas = contenedor.querySelectorAll(".producto");

        // Recorremos las tarjetas del HTML (por ejemplo, las 12 que tengas)
        tarjetas.forEach((tarjeta, i) => {
            
            // Aquí está el truco: 
            // Si i=0, usa producto 0. Si i=4 y solo hay 4, usa el 0 otra vez (4 % 4 = 0)
            const producto = productos[i % productos.length];

            const descripcion = tarjeta.querySelector(".descripcion");
            const precioEntero = tarjeta.querySelector(".texto");
            const precioDecimal = tarjeta.querySelector(".texto-2");
            const imagen = tarjeta.querySelector(".image");
            const valoracion = tarjeta.querySelector(".valoracion");

            // Rellenamos la tarjeta con el producto que toque en el "bucle"
            if (descripcion) descripcion.textContent = producto.Descripcion;

            // Precio
            if (precioEntero && precioDecimal) {
                const precio = producto.Precio.replace("€", "").trim().split(".");
                precioEntero.textContent = precio[0];
                precioDecimal.textContent = precio[1] || "00";
            }

            // Imagen de fondo
            const foto = producto.Foto?.[0]?.url;
            if (foto && imagen) {
                imagen.style.backgroundImage = `url(http://localhost:1337${foto})`;
                imagen.style.backgroundSize = "cover";
                imagen.style.backgroundPosition = "center";
            }

            // Valoración (estrellas)
            const estrellas = producto.Valoracion?.[0]?.url;
            if (estrellas && valoracion) {
                valoracion.src = `http://localhost:1337${estrellas}`;
            }

            // 🔴 ESTA LÍNEA FALTABA
    tarjeta.addEventListener("click", () => {
        window.location.href = `articulo-seleccionado.html?id=${producto.id}`;
    });
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

async function cargarCarrusel() {
    const contenedores = document.querySelectorAll(".animation-container");
    if (contenedores.length === 0) return;

    try {
        const response = await fetch("http://localhost:1337/api/productos?populate=*");
        const data = await response.json();
        const productos = data.data;

        contenedores.forEach(contenedor => {
            contenedor.innerHTML = ""; // Limpiamos el HTML estático
            
            // Creamos 6 elementos (repitiendo si hace falta)
            for (let i = 0; i < 6; i++) {
                const producto = productos[i % productos.length];
                const fotoUrl = producto.Foto?.[0]?.url;

                const a = document.createElement("a");
                a.href = `articulo-seleccionado.html?id=${producto.id}`;
                a.className = "foto";
                a.style.backgroundImage = `url(http://localhost:1337${fotoUrl})`;
                a.style.backgroundSize = "cover";
                a.style.backgroundPosition = "center";
                
                contenedor.appendChild(a);
            }
        });
    } catch (error) {
        console.error("Error al cargar el carrusel:", error);
    }
}

function obtenerIdProducto() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}
async function cargarProductoSeleccionado() {

    const id = obtenerIdProducto();
    if (!id) return;

    try {

        const response = await fetch(`http://localhost:1337/api/productos?id=${id}&populate=*`);
        const data = await response.json();

        const producto = data.data[0];

        const nombre = document.querySelector(".nombre-principal");
        const descripcion = document.querySelector(".descripcion-texto");
        const precio = document.querySelector(".precio-producto");
        const imagenPrincipal = document.querySelector(".imagen-principal");
        const valoracion = document.querySelector(".rating-visual");

        if (nombre) nombre.textContent = producto.Descripcion;
        if (descripcion) descripcion.textContent = producto.Descripcion_larga;

        if (precio) precio.textContent = producto.Precio;

        const foto = producto.Foto?.[0]?.url;
        if (foto && imagenPrincipal) {
            imagenPrincipal.src = `http://localhost:1337${foto}`;
        }

        const estrellas = producto.Valoracion?.[0]?.url;
        if (estrellas && valoracion) {
            valoracion.src = `http://localhost:1337${estrellas}`;
        }

    } catch (error) {
        console.error("Error cargando producto:", error);
    }
}