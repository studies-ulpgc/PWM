document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductosParaPagarDesdeJSON();
    await cargarImagenLateralDesdeJSON();
});

async function cargarImagenLateralDesdeJSON() {
    const JSON_URL = "http://localhost:1337";
    const imgElement = document.getElementById("foto-json");

    if (!imgElement) return;

    try {
        const response = await fetch(`${JSON_URL}/api/imagen-izq?populate=*`);
        const result = await response.json();
        
        const contenido = result.data;

        const fotoUrl = contenido?.imagen_lateral?.[0]?.url;

        if (fotoUrl) {
            const rutaCompleta = `${JSON_URL}${fotoUrl}`;
            
            imgElement.src = rutaCompleta;
            
            imgElement.onload = () => {
                imgElement.style.display = "block";
                imgElement.style.opacity = "1";
            };
        } else {
            console.warn("No se encontró la imagen_lateral en JSON");
        }

    } catch (error) {
        console.error("Error cargando imagen lateral:", error);
    }
}

async function cargarProductosParaPagarDesdeJSON() {
    const JSON_URL = "http://localhost:1337";
    const track = document.querySelector(".scroll-hor");
    
    if (!track) return;

    try {
        const response = await fetch(`${JSON_URL}/api/productos-pagars?populate=*`);
        const data = await response.json();
        const items = data?.data || [];
        const tarjetas = track.querySelectorAll(".mini-producto");

        if (items.length === 0) return;

        tarjetas.forEach((tarjeta, i) => {
            const item = items[i % items.length]; 
            if (item && item.imagenes?.[0]?.url) {
                const fotoUrl = `${JSON_URL}${item.imagenes[0].url}`;
                tarjeta.style.backgroundImage = `url('${fotoUrl}')`;
                tarjeta.style.backgroundSize = "cover";
                tarjeta.style.backgroundPosition = "center";
            }
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}