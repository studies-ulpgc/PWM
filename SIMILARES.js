function initSimilaresSection(section) {
  if (section.dataset.similaresInit === "1") return;
  section.dataset.similaresInit = "1";

  const track = section.querySelector(".similares-track");
  const tpl = section.querySelector("template[data-similares-template]");
  const leftBtn = section.querySelector(".c-btn--left");
  const rightBtn = section.querySelector(".c-btn--right");

  if (!track || !tpl) return;

  const count = Number(section.dataset.count || 12);

  track.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    fragment.appendChild(tpl.content.firstElementChild.cloneNode(true));
  }

  track.appendChild(fragment);

  const firstCard = track.querySelector(".PRODUCTO");
  const gap = 30;
  const step = firstCard ? firstCard.getBoundingClientRect().width + gap : 300;

  rightBtn?.addEventListener("click", () => {
    track.scrollBy({ left: step, behavior: "smooth" });
  });

  leftBtn?.addEventListener("click", () => {
    track.scrollBy({ left: -step, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-similares]").forEach(initSimilaresSection);
});

window.initSimilares = function (root = document) {
  root.querySelectorAll("[data-similares]").forEach(initSimilaresSection);
};