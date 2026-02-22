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
  const botonCategorias = document.getElementById("btnCategorias");
  const contenedorCategorias = document.getElementById("categorias");
  
  const authIcon = document.getElementById('auth-icon');
  const userPopup = document.getElementById('user-popup');
  const logoutBtn = document.getElementById('logout-btn');

  if (botonCategorias) {
    botonCategorias.addEventListener("click", (e) => {
      e.stopPropagation();
      cargarCategorias();
    });
  }

  if (authIcon && userPopup) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    authIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      if (isLoggedIn) {
        userPopup.classList.toggle('show');
      } else {
        window.location.href = 'INICIAR_SESION.html';
      }
    });

    if (isLoggedIn) {
      const nombreGuardado = localStorage.getItem('userName') || 'Usuario';
      const nombreNegrita = userPopup.querySelector('strong');
      if (nombreNegrita) {
        nombreNegrita.innerText = nombreGuardado;
      }
    }

    userPopup.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      window.location.href = 'HOME.html';
    });
  }

  document.addEventListener("click", () => {
    if (contenedorCategorias) contenedorCategorias.style.display = "none";
    if (userPopup) userPopup.classList.remove('show');
  });
}

async function cargarHeader() {
  try {
    const response = await fetch('HEADER_GRANDE.html');
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