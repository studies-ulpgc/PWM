async function cargarHeader() {
  try {
    const response = await fetch('HEADER_CORTO.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('header');
    contenedor.innerHTML = templateHTML;

  } catch (error) {
    console.error('Error cargando header:', error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const btnEditar = document.getElementById('btn-editar-direccion');
    const menuDirecciones = document.getElementById('menu-direcciones');

    if (btnEditar && menuDirecciones) {
        btnEditar.addEventListener('click', function(e) {
            e.stopPropagation(); 
            menuDirecciones.classList.toggle('mostrar');
            console.log("Menú activado"); // Esto te ayudará a ver en consola si funciona
        });

        document.addEventListener('click', function(e) {
            if (!menuDirecciones.contains(e.target)) {
                menuDirecciones.classList.remove('mostrar');
            }
        });
    }
});
async function cargarFooter() {
  try {
    const response = await fetch('FOOTER.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('footer');
    contenedor.innerHTML = templateHTML;

  } catch (error) {
    console.error('Error cargando footer:', error);
  }
}

cargarHeader();
cargarFooter();