// Cargar templates y ensamblar la página
async function loadTemplate(templatePath, containerId) {
    try {
        const response = await fetch(templatePath);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando ${templatePath}:`, error);
    }
}

// Cargar estructura principal
Promise.all([
    loadTemplate('HEADER.html', 'header-container'),
    loadTemplate('HOME.html', 'main-container'),
    loadTemplate('FOOTER.html', 'footer-container')
]).then(() => {
    // Una vez cargado todo, ejecutar el JS específico del HOME
    if (window.initHome) {
        window.initHome();
    }
});