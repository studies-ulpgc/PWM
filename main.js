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

  if (authIcon && userPopup) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    authIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isLoggedIn) {
        userPopup.classList.toggle('show');
      } else {
        window.location.href = 'INICIAR_SESION.html';
      }
    });

    if (isLoggedIn) {
      const nombreGuardado = localStorage.getItem('userName') || 'Usuario';
      const strong = userPopup.querySelector('strong');
      if (strong) strong.innerText = nombreGuardado;
    }
    
    userPopup.addEventListener('click', (e) => e.stopPropagation());
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      window.location.href = 'HOME.html';
    });
  }

  document.addEventListener("click", () => {
    if (userPopup) userPopup.classList.remove('show');
    if (contenedorCategorias) contenedorCategorias.style.display = "none";
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

function simularLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    const email = document.getElementById('email').value;
    localStorage.setItem('userName', email.split('@')[0]);
    
    alert("¡Sesión iniciada!");
    window.location.href = 'HOME.html';
}

function simularRegistro() {
    // 1. Obtenemos el nombre del input para que el Pop-up diga "Hola, Juan"
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');

    // 2. Guardamos la ficha de sesión y el nombre
    localStorage.setItem('isLoggedIn', 'true');
    
    if (nombreInput && nombreInput.value !== "") {
        localStorage.setItem('userName', nombreInput.value);
    } else if (emailInput && emailInput.value !== "") {
        // Si no puso nombre, usamos la primera parte del email
        localStorage.setItem('userName', emailInput.value.split('@')[0]);
    }

    alert("¡Cuenta creada e inicio de sesión automático!");

    // 3. Redirigimos a la Home
    window.location.href = 'HOME.html';
}

cargarHeader();
cargarFooter();