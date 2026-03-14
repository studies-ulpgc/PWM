document.addEventListener("DOMContentLoaded", async () => {
    const STRAPI_URL = "http://localhost:1337"; 
    const imgElement = document.getElementById("foto-strapi");

    if (!imgElement) {
        console.error("No se encontró el elemento con ID 'foto-strapi'");
        return;
    }

    try {
        const response = await fetch(`${STRAPI_URL}/api/imagen-izq?populate=*`);
        if (!response.ok) throw new Error("Error en la petición a Strapi");
        
        const result = await response.json();
        const contenido = result.data;

        const fotoUrl = contenido.imagen_lateral?.[0]?.url;

        if (fotoUrl) {
            const rutaCompleta = `${STRAPI_URL}${fotoUrl}`;
            console.log("Cargando imagen desde:", rutaCompleta);
            
            imgElement.src = rutaCompleta;
            
            imgElement.onload = () => {
                imgElement.style.display = "block";
                imgElement.style.opacity = "1";
            };
        } else {
            console.warn("No hay URL en el campo imagen_lateral");
        }

    } catch (error) {
        console.error("Error cargando imagen de Strapi:", error);
    }
});