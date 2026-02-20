async function cargarHeader() {
  try {
    const response = await fetch('HEADER.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('header');
    contenedor.innerHTML = templateHTML;

    const corto = contenedor.querySelector('.default-CORTO');
    if (corto) corto.remove();

  } catch (error) {
    console.error('Error cargando header:', error);
  }
}

// ===== CARGAR PRODUCTOS =====
async function cargarProductos() {
  try {
    // Cargar el template
    const response = await fetch('PRODUCTO.html');
    const templateHTML = await response.text();
    
    // Contenedor donde irán los productos
    const contenedor = document.getElementById('productos-contenedor');
    
    // Repetir el template 12 veces (3 filas x 4 productos)
    for (let i = 0; i < 12; i++) {
      contenedor.innerHTML += templateHTML;
    }
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}
cargarHeader();
cargarProductos();
