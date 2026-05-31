document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-modal-open]");
  if (trigger) {
    const modal = document.querySelector(trigger.dataset.modalOpen);
    modal?.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  if (event.target.closest("[data-modal-close]") || event.target.matches("[data-modal-backdrop]")) {
    event.target.closest(".modal")?.classList.remove("is-open");
    if (!document.querySelector(".modal.is-open")) document.body.classList.remove("modal-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".modal.is-open").forEach((modal) => modal.classList.remove("is-open"));
  document.body.classList.remove("modal-open");
});
