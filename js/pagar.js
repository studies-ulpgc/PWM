async function cargarProductosParaPagarDesdeStrapi() {
    const STRAPI_URL = "http://localhost:1337";
    const track = document.querySelector(".scroll-hor");
    
    if (!track) return;

    try {
        const response = await fetch(`${STRAPI_URL}/api/productos?populate=*`);
        const data = await response.json();
        const items = data?.data || [];
        
        const tarjetas = track.querySelectorAll(".mini-producto");

        if (items.length === 0) return;

        tarjetas.forEach((tarjeta, i) => {
            const item = items[i % items.length]; 

            if (item && item.Foto && item.Foto.length > 0) {
                const fotoUrl = `${STRAPI_URL}${item.Foto[0].url}`;

                tarjeta.style.backgroundImage = `url('${fotoUrl}')`;
                tarjeta.style.backgroundSize = "cover";
                tarjeta.style.backgroundPosition = "center";
                tarjeta.style.backgroundRepeat = "no-repeat";
            }
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}