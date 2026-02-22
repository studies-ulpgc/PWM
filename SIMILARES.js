async function cargarProductos() {
  try {
    const response = await fetch('PRODUCTO.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('productos-contenedor');

    for (let i = 0; i < 12; i++) {
      contenedor.innerHTML += templateHTML;
    }
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

cargarProductos();