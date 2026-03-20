
async function cargarHeadersDesdeJSON() {
    try {
        const response = await fetch("../json/header.json");
        const data = await response.json();
        const headers = data.data;
        const enlacesGrande = document.querySelectorAll(".categorias_grande .text");
        const enlacesCorto = document.querySelectorAll(".categorias_corto .text");

        function rellenarEnlaces(enlaces) {
            enlaces.forEach((enlace, i) => {
                if (headers[i]) {
                    enlace.textContent = headers[i].Categoria;
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

async function cargarCategoriasDesdeJSON() {
    try {
        const response = await fetch("../json/categorias.json");
        const data = await response.json();
        const categorias = data.data;

        const enlaces = document.querySelectorAll(".categorias .enlaces");

        enlaces.forEach((enlace, i) => {
            if (categorias[i]) {
                const nombre = categorias[i].categoria;

                enlace.textContent = nombre;
                enlace.href = `galeria.html?categoria=${encodeURIComponent(nombre)}`;
            } else {
                enlace.textContent = "";
                enlace.href = "#";
            }
        });

    } catch (error) {
        console.error("Error cargando categorias:", error);
    }
}
