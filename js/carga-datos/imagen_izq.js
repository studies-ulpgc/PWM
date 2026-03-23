document.addEventListener("DOMContentLoaded", async () => {
    await cargarImagenLateralDesdeJSON();
});

async function cargarImagenLateralDesdeJSON() {
    const JSON_URL = "../json";
    const imgElement = document.getElementById("foto-json");

    if (!imgElement) return;

    try {
        const response = await fetch(`${JSON_URL}/imagen_izq.json`);
        const result = await response.json();
        
        const contenido = result.data;

        const fotoUrl = contenido?.imagen_lateral?.[0]?.url;

        if (fotoUrl) {
            const rutaCompleta = `..${fotoUrl}`;
            
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