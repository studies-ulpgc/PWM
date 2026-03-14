function normalizarTexto(texto) {
    return (texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function aplicarFiltroPedidos() {
    const checks = document.querySelectorAll('.filtro-panel input[type="checkbox"]');
    const pedidos = document.querySelectorAll('.pedido-item');

    if (checks.length === 0 || pedidos.length === 0) return;

    const estadosSeleccionados = Array.from(checks)
        .filter(check => check.checked)
        .map(check => {
            const texto = check.parentElement.querySelector("span")?.textContent || "";
            return normalizarTexto(texto);
        });

    pedidos.forEach((pedido) => {
        const estadoElemento = pedido.querySelector(".estado-valor");
        const estadoPedido = normalizarTexto(estadoElemento?.textContent || "");

        const mostrar =
            estadosSeleccionados.length === 0 ||
            estadosSeleccionados.includes(estadoPedido);

        pedido.style.display = mostrar ? "" : "none";
    });
}

function inicializarFiltroPedidos() {
    const panel = document.querySelector(".filtro-panel");
    if (!panel) return;

    if (panel.dataset.inicializado === "true") return;
    panel.dataset.inicializado = "true";

    const checks = panel.querySelectorAll('input[type="checkbox"]');

    checks.forEach((check) => {
        check.addEventListener("change", aplicarFiltroPedidos);
    });

    aplicarFiltroPedidos();
}