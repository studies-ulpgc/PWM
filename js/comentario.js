async function cargarComentariosDesdeJSON() {
    const contenedor = document.getElementById("comentarios-contenedor");
    if (!contenedor) return;

    try {
        const response = await fetch("../json/comentario.json");
        const data = await response.json();
        const comentarios = data.data;

        const tarjetas = contenedor.querySelectorAll(".comentar");

        tarjetas.forEach((tarjeta, i) => {
            const comentario = comentarios[i % comentarios.length];

            const titulo = tarjeta.querySelector(".titulo");
            const fecha = tarjeta.querySelector(".fecha");
            const texto = tarjeta.querySelector(".texto");
            const valoracion = tarjeta.querySelector(".valoracion");

            if (titulo) titulo.textContent = comentario.Titulo;

            if (fecha) {
                const fechaStr = comentario.Fecha;
                const fechaObj = new Date(fechaStr);
                fecha.textContent = fechaObj.toLocaleDateString("es-ES");
            }

            if (texto) texto.textContent = comentario.Texto;

            const estrellas = comentario.Valoracion?.[0]?.url;
            if (estrellas && valoracion) {
                valoracion.src = `..${estrellas}`;
            }
        });

    } catch (error) {
        console.error("Error cargando comentarios:", error);
    }
}