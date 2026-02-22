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

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnCategorias");
  const contenedor = document.getElementById("categorias");

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
});