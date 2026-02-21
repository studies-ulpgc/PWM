async function cargarCategorias() {
  try {
    const response = await fetch('CATEGORIAS.html');
    const templateHTML = await response.text();

    const contenedor = document.getElementById('categorias');
    contenedor.innerHTML = templateHTML;

  } catch (error) {
    console.error('Error cargando categorias:', error);
  }
}

cargarCategorias();