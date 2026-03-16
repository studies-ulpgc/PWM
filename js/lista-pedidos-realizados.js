
async function cargarListaPedidosRealizadosDesdeJSON() {
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

            aplicarFiltroPedidos();
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

        aplicarFiltroPedidos();

    } catch (error) {
        console.error("Error cargando lista de pedidos realizados:", error);
    }
}