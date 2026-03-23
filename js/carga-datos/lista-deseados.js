async function cargarListaDeseadosDesdeJSON() {
    const track = document.querySelector(".deseados-track");
    if (!track) return;

    try {
        const response = await fetch("../json/producto.json");
        const data = await response.json();

        const productos = data?.data || [];
        const tarjetas = track.querySelectorAll(".deseado-item");

        if (productos.length === 0) {
            tarjetas.forEach((tarjeta) => {
                const nombre = tarjeta.querySelector("h3");
                if (nombre) nombre.textContent = "No hay productos";
            });
            return;
        }

        tarjetas.forEach((tarjeta, i) => {
            const producto = productos[i % productos.length];

            const nombre = tarjeta.querySelector("h3");
            const opts = tarjeta.querySelector(".opts");
            const precio = tarjeta.querySelector(".price");
            const thumb = tarjeta.querySelector(".thumb");

            if (nombre) nombre.textContent = producto.Descripcion || "Sin nombre";
            if (opts) opts.textContent = producto.Talla || "";
            if (precio) precio.textContent = producto.Precio || "";

            const fotoUrl = producto.Foto?.[0]?.url 
                ? `..${producto.Foto[0].url}` 
                : "";

            if (thumb) {
                thumb.innerHTML = fotoUrl
                    ? `<img src="${fotoUrl}" alt="${producto.Descripcion}">`
                    : "";
            }
        });

    } catch (error) {
        console.error("Error cargando lista de deseados desde local:", error);
    }
}