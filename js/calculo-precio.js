const cartItems = [
  { id: 1, price: 15, selected: true },
  { id: 2, price: 15, selected: true },
  { id: 3, price: 10, selected: true },
  { id: 4, price: 10, selected: true },
  { id: 5, price: 10, selected: true },
  { id: 6, price: 10, selected: true },
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
  if (!item?.Imagen_item || !Array.isArray(item.Imagen_item) || item.Imagen_item.length === 0) {
    return "";
  }

  const url = item.Imagen_item[0].url;
  return url ? `http://localhost:1337${url}` : "";
}

async function cargarCartDesdeStrapi() {
  try {
    const response = await fetch("http://localhost:1337/api/ver-cestas?populate=*");
    const data = await response.json();

    console.log("Respuesta completa de Strapi:", data);
    console.log("Primer item:", data?.data?.[0]);

    const items = data?.data || [];

    if (items.length === 0) {
      console.warn("La colección ver-cesta está vacía");
      renderCart();
      return;
    }

    cartItems.forEach((cartItem, i) => {
      const item = items[i % items.length];

      cartItem.name = item.Nombre_del_item || "Sin nombre";
      cartItem.opts = item.Selecciones || "";
      cartItem.img = getImageUrl(item);

      console.log("URL imagen:", cartItem.img);
    });

    renderCart();
  } catch (error) {
    console.error("Error cargando ver-cesta:", error);
  }
}

cargarCartDesdeStrapi();