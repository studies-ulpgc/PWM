async function cargarFootersDesdeJSON() {
    const JSON_URL = "../json";

    const selectores = document.querySelectorAll(".selector-personalizado .dropdown");
    const contenedorLocalizacion = selectores[0];
    const contenedorIdioma = selectores[1];

    if (!contenedorLocalizacion || !contenedorIdioma) return;

    try {
        const resInt = await fetch(`${JSON_URL}/internacional.json`);
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
                    ? `..${item.bandera[0].url}` 
                    : "";

                li.innerHTML = `
                    ${banderaUrl ? `<img src="${banderaUrl}" style="width: 20px; height: auto; border-radius: 2px; object-fit: contain;">` : ""}
                    <span>${item.localizacion}</span>
                `;
                contenedorLocalizacion.appendChild(li);
            });
        }

        const resIdio = await fetch(`${JSON_URL}/idiomas.json`);
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
        console.error("Error cargando el footer desde JSON:", error);
    }
};