const timerNodes = document.querySelectorAll("[data-countdown]");
const saleNodes = document.querySelectorAll("[data-sale-countdown]");
let remainingSeconds = 2 * 60 * 60;
let saleSeconds = (2 * 60 * 60) + (47 * 60) + 13;

function deliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 4);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function tickTimer() {
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  timerNodes.forEach((node) => {
    node.textContent = `Order within ${hours}h ${minutes}m for delivery by ${deliveryDate()}`;
  });
  remainingSeconds = Math.max(0, remainingSeconds - 1);
  const saleHours = String(Math.floor(saleSeconds / 3600)).padStart(2, "0");
  const saleMinutes = String(Math.floor((saleSeconds % 3600) / 60)).padStart(2, "0");
  const saleRemaining = String(saleSeconds % 60).padStart(2, "0");
  saleNodes.forEach((node) => {
    node.textContent = `${saleHours}:${saleMinutes}:${saleRemaining}`;
  });
  saleSeconds = Math.max(0, saleSeconds - 1);
}

if (timerNodes.length || saleNodes.length) {
  tickTimer();
  window.setInterval(tickTimer, 1000);
}

const mainCta = document.querySelector("[data-main-cta]");
const stickyBar = document.querySelector("[data-sticky-buy]");

if (mainCta && stickyBar && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    stickyBar.classList.toggle("is-visible", !entry.isIntersecting);
  }, { threshold: 0.2 });
  observer.observe(mainCta);
}
