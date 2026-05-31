document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-accordion-trigger]");
  if (!trigger) return;
  const item = trigger.closest(".accordion-item");
  const isOpen = item.classList.toggle("open");
  trigger.setAttribute("aria-expanded", String(isOpen));
});
