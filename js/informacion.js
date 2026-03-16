document.addEventListener("DOMContentLoaded", async () => {
    const JSON_URL = "http://localhost:1337";
    const params = new URLSearchParams(window.location.search);
    
    const slug = params.get("tipo") || "historia"; 

    console.log("Buscando contenido para el slug:", slug);

    try {
        const response = await fetch(`${JSON_URL}/api/informacions?filters[slug][$eq]=${slug}&populate[Contenido][populate]=*`);
        const result = await response.json();
        
        const pagina = result.data[0];

        if (!pagina) {
            document.getElementById("main-title").textContent = "Página no encontrada";
            return;
        }

        document.getElementById("main-title").textContent = pagina.titulo_pagina;

        const contenedor = document.getElementById("cards-container");
        const contenedorDinamico = document.getElementById("contenedor-dinamico"); 

        pagina.Contenido.forEach(bloque => {
            console.log("Procesando componente:", bloque.__component);

            if (bloque.__component.includes("bloque-texto")) {
                const sec = document.getElementById("intro-section");
                sec.style.display = "block";
                document.getElementById("intro-text").textContent = bloque.cuerpo;
            }

            if (bloque.__component.includes("tarjeta-informativa")) {
                const div = document.createElement("div");
                div.className = "tarjeta";
                const imgUrl = bloque.imagen?.url ? `${JSON_URL}${bloque.imagen.url}` : '';
                
                div.innerHTML = `
                    <div class="tarjeta-img" style="background-image: url('${imgUrl}')"></div>
                    <div class="tarjeta-txt">${bloque.titulo}</div>
                `;
                document.getElementById("cards-container").appendChild(div);
            }

            if (bloque.__component.includes("seccion-destacada")) {
                const sec = document.getElementById("featured-section");
                sec.style.display = "flex";
                document.getElementById("featured-title").textContent = bloque.titulo;
                document.getElementById("featured-desc").textContent = bloque.descripcion;
                
                if (bloque.imagen?.url) {
                    const imgElement = document.getElementById("featured-img");
                    imgElement.style.backgroundImage = `url('${JSON_URL}${bloque.imagen.url}')`;
                    
                    imgElement.style.backgroundSize = "cover";
                    imgElement.style.backgroundPosition = "center";
                }
            }
        });

    } catch (error) {
        console.error("Error cargando JSON:", error);
        document.getElementById("main-title").textContent = "Error de conexión";
    }
});