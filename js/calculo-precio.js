const cartItems = [
  { id: 1, price: 0, selected: true },
  { id: 2, price: 0, selected: true },
  { id: 3, price: 0, selected: true },
  { id: 4, price: 0, selected: true },
  { id: 5, price: 0, selected: true },
  { id: 6, price: 0, selected: true },
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

const cestaTrack = document.getElementById("cesta-track");
const totalAmountEl = document.getElementById("total-amount");

function updateTotal() {
  const total = cartItems
    .filter((p) => p.selected)
    .reduce((acc, p) => acc + p.price, 0);

  totalAmountEl.textContent = formatNumberES(total);
}

function renderCart() {
  cestaTrack.innerHTML = "";

  cartItems.forEach((p) => {
    const card = document.createElement("article");
    card.className = "cart-item";

    card.innerHTML = `
      <div class="cart-check">
        <input type="checkbox" ${p.selected ? "checked" : ""} aria-label="Seleccionar ${p.name}">
      </div>

      <div class="cart-thumb">
        ${p.img ? `<img src="${p.img}" alt="${p.name}">` : ""}
      </div>

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

function getImageUrl(item) {
  if (!item?.Foto || !Array.isArray(item.Foto) || item.Foto.length === 0) {
    return "";
  }

  const url = item.Foto[0].url;
  return url ? `http://localhost:1337${url}` : "";
}

async function cargarCartDesdeJSON() {
  try {

    const response = await fetch("http://localhost:1337/api/productos?populate=*");
    const data = await response.json();

    console.log("Productos:", data);

    const items = data?.data || [];

    if (items.length === 0) {
      console.warn("No hay productos");
      renderCart();
      return;
    }

    cartItems.forEach((cartItem, i) => {

      const producto = items[i % items.length];

      cartItem.name = producto.Descripcion || "Sin nombre";
      const tallaRandom = getRandomFromList(producto.Talla);
      const colorRandom = getRandomColor();

      cartItem.opts = `Talla: ${tallaRandom} · Color: ${colorRandom}`;
      cartItem.price = parseFloat(producto.Precio) || 0;
      cartItem.img = getImageUrl(producto);

    });

    renderCart();

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function getRandomFromList(text) {
  if (!text) return "";

  const list = text.split(",").map(e => e.trim());
  const randomIndex = Math.floor(Math.random() * list.length);

  return list[randomIndex];
}

function getRandomColor() {
  const colors = ["Negro", "Blanco", "Azul", "Gris", "Verde", "Rojo", "Beige"];
  return colors[Math.floor(Math.random() * colors.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCartDesdeJSON();
});