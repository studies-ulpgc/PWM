function obtenerCategoria() {
    const params = new URLSearchParams(window.location.search);
    return params.get("categoria");
}

async function cargarProductosDesdeJSON() {
    const contenedor = document.getElementById("productos-contenedor");
    if (!contenedor) return;

    try {
        const categoria = obtenerCategoria();
        const categoriasValidas = ["Camisas", "Chaquetas"];

        let url = "http://localhost:1337/api/productos?populate=*";

        if (categoria && categoriasValidas.includes(categoria)) {
            url += `&filters[Categoria][$eq]=${encodeURIComponent(categoria)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        const productos = data.data;
        const tarjetas = contenedor.querySelectorAll(".producto");

        tarjetas.forEach((tarjeta, i) => {
            
            const producto = productos[i % productos.length];

            const descripcion = tarjeta.querySelector(".descripcion");
            const precioEntero = tarjeta.querySelector(".texto");
            const precioDecimal = tarjeta.querySelector(".texto-2");
            const imagen = tarjeta.querySelector(".image");
            const valoracion = tarjeta.querySelector(".valoracion");
            const link = tarjeta.querySelector("a.informacion-producto");

            if (descripcion) descripcion.textContent = producto.Descripcion;

            if (precioEntero && precioDecimal) {
                const precio = producto.Precio.replace("€", "").trim().split(".");
                precioEntero.textContent = precio[0];
                precioDecimal.textContent = precio[1] || "00";
            }

            const foto = producto.Foto?.[0]?.url;
            if (foto && imagen) {
                imagen.style.backgroundImage = `url(http://localhost:1337${foto})`;
                imagen.style.backgroundSize = "cover";
                imagen.style.backgroundPosition = "center";
            }

            const estrellas = producto.Valoracion?.[0]?.url;
            if (estrellas && valoracion) {
                valoracion.src = `http://localhost:1337${estrellas}`;
            }

            if (link) {
                link.href = `articulo-seleccionado.html?id=${producto.id}`;
            }

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
            contenedor.innerHTML = "";

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

        const response = await fetch(`http://localhost:1337/api/productos?filters[id][$eq]=${id}&populate=*`);
        const data = await response.json();

        const producto = data.data[0];

        const nombre = document.querySelector(".nombre-principal");
        const descripcion = document.querySelector(".descripcion-texto");
        const precio = document.querySelector(".precio-producto");
        const imagenPrincipal = document.querySelector(".imagen-principal");
        const valoracion = document.querySelector(".rating-visual");
        const subtitulo = document.querySelector(".eslogan-secundario");
        const grupoCheckbox = document.querySelector(".grupo-checkbox");
        const conteoValoraciones = document.querySelector(".conteo-valoraciones");
        const puntuacionTotal = document.querySelector(".puntuacion-total");

        const miniaturas = producto.miniaturas || [];
        const elementosMiniatura = document.querySelectorAll(".miniatura");

        miniaturas.forEach((img, i) => {

            if (elementosMiniatura[i]) {

                const url = `http://localhost:1337${img.url}`;

                elementosMiniatura[i].src = url;

                elementosMiniatura[i].addEventListener("click", () => {
                    imagenPrincipal.src = url;
                });

            }

        });

        if (nombre) nombre.textContent = producto.Descripcion;
        if (descripcion) descripcion.textContent = producto.Descripcion_larga;
        if (subtitulo) subtitulo.textContent = producto.Subtitulo || "";

        if (precio) {
            const precioLimpio = producto.Precio.replace("€", "").trim();
            const [entero, decimal] = precioLimpio.split(".");
            precio.querySelector(".entero").textContent = entero;
            precio.querySelector(".decimal").textContent = decimal ? `.${decimal}€` : ".00€";
        }

        const foto = producto.Foto?.[0]?.url;
        if (foto && imagenPrincipal) {
            imagenPrincipal.src = `http://localhost:1337${foto}`;
        }

        const estrellas = producto.Valoracion?.[0]?.url;
        if (estrellas && valoracion) {
            valoracion.src = `http://localhost:1337${estrellas}`;
        }
        if (estrellas && puntuacionTotal) {
            puntuacionTotal.src = `http://localhost:1337${estrellas}`;
        }

        if (grupoCheckbox) {
            grupoCheckbox.innerHTML = "";
            const tallas = producto.Talla?.split(",").map(t => t.trim()) || [];
            tallas.forEach(talla => {
                const label = document.createElement("label");
                label.className = "campo-checkbox";
                
                const input = document.createElement("input");
                input.type = "checkbox";
                input.className = "input-checkbox";
                input.checked = true;

                const span = document.createElement("span");
                span.textContent = talla;

                label.appendChild(input);
                label.appendChild(span);
                grupoCheckbox.appendChild(label);
            });
        }

        if (conteoValoraciones) {
            conteoValoraciones.textContent = `Valoraciones totales (${producto.Votos})`;
        }

    } catch (error) {
        console.error("Error cargando producto:", error);
    }
}