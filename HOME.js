async function cargarHeader() {
  try {
    const response = await fetch('HEADER_GRANDE.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('header');
    contenedor.innerHTML = templateHTML;

  } catch (error) {
    console.error('Error cargando header:', error);
  }
}

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
cargarProductos();
cargarFooter();