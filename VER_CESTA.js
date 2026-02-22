const cartItems = [
  { id: 1, name: "Nombre del item", opts: "Selecciones (color, talla)", price: 15, selected: true },
  { id: 2, name: "Nombre del item", opts: "Selecciones (color, talla)", price: 15, selected: true },
  { id: 3, name: "Nombre del item", opts: "Selecciones (color, talla)", price: 10, selected: true },
  { id: 4, name: "Nombre del item", opts: "Selecciones (color, talla)", price: 10, selected: true },
  { id: 5, name: "Nombre del item", opts: "Selecciones (color, talla)", price: 10, selected: true },
  { id: 6, name: "Nombre del item", opts: "Selecciones (color, talla)", price: 10, selected: true },
];

function formatEUR(value) {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatNumberES(value) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}


function updateTotal() {
  const total = cartItems
    .filter((p) => p.selected)
    .reduce((acc, p) => acc + p.price, 0);

  totalAmountEl.textContent = formatNumberES(total);;
}

const similares = Array.from({ length: 10 }, (_, i) => ({
  id: 100 + i,
  name: "Lorem ipsum",
  price: 0.0,
  rating: 2,
}));

const cestaTrack = document.getElementById("cesta-track");
const totalAmountEl = document.getElementById("total-amount");

// Render cesta
function renderCart() {
  cestaTrack.innerHTML = "";
  cartItems.forEach((p) => {
    const card = document.createElement("article");
    card.className = "cart-item";

    card.innerHTML = `
      <div class="cart-check">
        <input type="checkbox" ${p.selected ? "checked" : ""} aria-label="Seleccionar ${p.name}">
      </div>
      <div class="cart-thumb" aria-hidden="true"></div>
      <div class="cart-info">
        <h3>${p.name}</h3>
        <p>${p.opts}</p>
        <p class="cart-price">${formatEUR(p.price)}</p>
      </div>
    `;

    const checkbox = card.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", (e) => {
      p.selected = e.target.checked;
      updateTotal();
    });

    cestaTrack.appendChild(card);
  });

  updateTotal();
}

async function cargarHeader() {
  try {
    const response = await fetch('HEADER_CORTO.html');
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

renderCart();
cargarHeader();
cargarFooter();