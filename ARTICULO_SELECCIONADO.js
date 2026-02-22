async function cargarCategorias() {
  const contenedor = document.getElementById("categorias");

  if (contenedor.innerHTML.trim() !== "") {
    contenedor.style.display =
      contenedor.style.display === "block" ? "none" : "block";
    return;
  }

  try {
    const response = await fetch("CATEGORIAS.html");
    const templateHTML = await response.text();
    contenedor.innerHTML = templateHTML;
    contenedor.style.display = "block";
  } catch (error) {
    console.error("Error cargando categorias:", error);
  }
}

function inicializarHeader() {
  const boton = document.getElementById("btnCategorias");
  const contenedor = document.getElementById("categorias");

  if (!boton) return;

  boton.addEventListener("click", (e) => {
    e.stopPropagation();
    cargarCategorias();
  });

  document.addEventListener("click", (e) => {
    const clickDentroMenu = contenedor.contains(e.target);
    const clickEnBoton = boton.contains(e.target);

    if (!clickDentroMenu && !clickEnBoton) {
      contenedor.style.display = "none";
    }
  });
}

async function cargarHeader() {
  try {
    const response = await fetch('HEADER_CORTO.html');
    const templateHTML = await response.text();
    
    const contenedor = document.getElementById('header');
    contenedor.innerHTML = templateHTML;

    inicializarHeader();

  } catch (error) {
    console.error('Error cargando header:', error);
  }
}

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

async function cargarComentarios() {
  try {
    // Cargar el template
    const response = await fetch('COMENTARIO.html');
    const templateHTML = await response.text();
    
    // Contenedor donde irán los comentarios
    const contenedor = document.getElementById('comentarios-contenedor');
    
    // Repetir el template 12 veces (3 filas x 4 productos)
    for (let i = 0; i < 12; i++) {
      contenedor.innerHTML += templateHTML;
    }
  } catch (error) {
    console.error('Error cargando comentarios:', error);
  }
}

async function cargarFooter() {
  try {
    // Cargar el template
    const response = await fetch('FOOTER.html');
    const templateHTML = await response.text();
    
    // Contenedor donde irá el footer
    const contenedor = document.getElementById('footer');
    contenedor.innerHTML = templateHTML;

  } catch (error) {
    console.error('Error cargando footer:', error);
  }
}

cargarHeader();
cargarProductos();
cargarComentarios();
cargarFooter();