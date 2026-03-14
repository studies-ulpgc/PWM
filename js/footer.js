document.addEventListener("DOMContentLoaded", async () => {
    const STRAPI_URL = "http://localhost:1337";

    const selectores = document.querySelectorAll(".selector-personalizado .dropdown");
    const contenedorLocalizacion = selectores[0];
    const contenedorIdioma = selectores[1];

    if (!contenedorLocalizacion || !contenedorIdioma) return;

    try {
        const resInt = await fetch(`${STRAPI_URL}/api/internacionals?populate=*`);
        const dataInt = await resInt.json();
        const lugares = dataInt?.data || [];

        if (lugares.length > 0) {
            contenedorLocalizacion.innerHTML = "";
            lugares.forEach(item => {
                const li = document.createElement("li");
                li.style.display = "flex";
                li.style.alignItems = "center";
                li.style.gap = "10px";

                const banderaUrl = item.bandera?.[0]?.url 
                    ? `${STRAPI_URL}${item.bandera[0].url}` 
                    : "";

                li.innerHTML = `
                    ${banderaUrl ? `<img src="${banderaUrl}" style="width: 20px; height: auto; border-radius: 2px; object-fit: contain;">` : ""}
                    <span>${item.localizacion}</span>
                `;
                contenedorLocalizacion.appendChild(li);
            });
        }

        const resIdio = await fetch(`${STRAPI_URL}/api/idiomas?populate=*`);
        const dataIdio = await resIdio.json();
        const idiomas = dataIdio?.data || [];

        if (idiomas.length > 0) {
            contenedorIdioma.innerHTML = "";
            idiomas.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.idioma;
                contenedorIdioma.appendChild(li);
            });
        }

    } catch (error) {
        console.error("Error cargando el footer desde Strapi:", error);
    }
});