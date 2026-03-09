async function cargarProductosDesdeStrapi() {

    const contenedor = document.getElementById("productos-contenedor");
    if (!contenedor) return;

    try {

        const response = await fetch("http://localhost:1337/api/productos?populate=*");
        const data = await response.json();

        const productos = data.data;
        const tarjetas = contenedor.querySelectorAll(".producto");

        productos.forEach((producto, i) => {

            if (!tarjetas[i]) return;

            const tarjeta = tarjetas[i];

            const descripcion = tarjeta.querySelector(".descripcion");
            const precioEntero = tarjeta.querySelector(".texto");
            const precioDecimal = tarjeta.querySelector(".texto-2");
            const imagen = tarjeta.querySelector(".image");
            const valoracion = tarjeta.querySelector(".valoracion");

            // descripcion
            descripcion.textContent = producto.Descripcion;

            // precio
            const precio = producto.Precio.replace("€","").trim().split(".");
            precioEntero.textContent = precio[0];
            precioDecimal.textContent = precio[1];

            // imagen
            const foto = producto.Foto?.[0]?.url;
            if (foto) {
                imagen.style.backgroundImage =
                    `url(http://localhost:1337${foto})`;
                imagen.style.backgroundSize = "cover";
                imagen.style.backgroundPosition = "center";
            }

            // valoracion
            const estrellas = producto.Valoracion?.[0]?.url;
            if (estrellas) {
                valoracion.src = `http://localhost:1337${estrellas}`;
            }

        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}