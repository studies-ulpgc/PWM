
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
