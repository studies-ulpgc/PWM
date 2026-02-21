async function cargarHeader() {
  try {
    const response = await fetch('HEADER.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('header');
    contenedor.innerHTML = templateHTML;

    const grande = contenedor.querySelector('.default-GRANDE');
    if (grande) grande.remove();

  } catch (error) {
    console.error('Error cargando header:', error);
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
cargarFooter();