document.addEventListener("DOMContentLoaded", async () => {
    const STRAPI_URL = "http://localhost:1337";
    const params = new URLSearchParams(window.location.search);
    
    // Intentamos pillar 'tipo' de la URL, si no, usamos 'historia' por defecto
    const slug = params.get("tipo") || "historia"; 

    console.log("Buscando contenido para el slug:", slug);

    try {
        // IMPORTANTE: Asegúrate de que el plural sea /informacions o /informaciones según tu Strapi
        const response = await fetch(`${STRAPI_URL}/api/informacions?filters[slug][$eq]=${slug}&populate[Contenido][populate]=*`);
        const result = await response.json();
        
        const pagina = result.data[0];

        if (!pagina) {
            document.getElementById("main-title").textContent = "Página no encontrada";
            return;
        }

        // 1. Título
        document.getElementById("main-title").textContent = pagina.titulo_pagina;

        const contenedor = document.getElementById("cards-container");
        const contenedorDinamico = document.getElementById("contenedor-dinamico"); 
        // Nota: Asegúrate de que en el HTML pusiste id="contenedor-dinamico" rodeando todo

        // 2. Procesar bloques
        pagina.Contenido.forEach(bloque => {
            console.log("Procesando componente:", bloque.__component);

            // Bloque de Texto (Usamos .includes para evitar errores de categoría)
            if (bloque.__component.includes("bloque-texto")) {
                const sec = document.getElementById("intro-section");
                sec.style.display = "block";
                document.getElementById("intro-text").textContent = bloque.cuerpo;
            }

            // Tarjetas
            if (bloque.__component.includes("tarjeta-informativa")) {
                const div = document.createElement("div");
                div.className = "tarjeta";
                const imgUrl = bloque.imagen?.url ? `${STRAPI_URL}${bloque.imagen.url}` : '';
                
                div.innerHTML = `
                    <div class="tarjeta-img" style="background-image: url('${imgUrl}')"></div>
                    <div class="tarjeta-txt">${bloque.titulo}</div>
                `;
                document.getElementById("cards-container").appendChild(div);
            }

            // Destacado
            if (bloque.__component.includes("seccion-destacada")) {
                const sec = document.getElementById("featured-section");
                sec.style.display = "flex";
                document.getElementById("featured-title").textContent = bloque.titulo;
                document.getElementById("featured-desc").textContent = bloque.descripcion;
                
                if (bloque.imagen?.url) {
                    const imgElement = document.getElementById("featured-img"); // Guardamos el elemento en una constante
                    imgElement.style.backgroundImage = `url('${STRAPI_URL}${bloque.imagen.url}')`;
                    
                    // --- AÑADE ESTAS DOS LÍNEAS ---
                    imgElement.style.backgroundSize = "cover";      // Hace que la foto rellene el cuadrado
                    imgElement.style.backgroundPosition = "center"; // La centra para que no se vea solo una esquina
                    // ------------------------------
                }
            }
        });

    } catch (error) {
        console.error("Error cargando Strapi:", error);
        document.getElementById("main-title").textContent = "Error de conexión";
    }
});