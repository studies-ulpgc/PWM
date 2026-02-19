async function loadTemplate(className, file) {
  const response = await fetch(`COMÚN/${file}.html`);
  const data = await response.text();
  document.getElementsByClassName(className).innerHTML = data;
}

async function loadPage(page) {
  const response = await fetch(`CSS/${page}.html`);
  const data = await response.text();
  document.getElementsByClassName("Main Home").innerHTML = data;
}

document.addEventListener("DOMContentLoaded", () => {
  loadTemplate("header", "HEADER");
  loadTemplate("footer", "FOOTER");
  loadPage("HOME"); // carga home por defecto
});
