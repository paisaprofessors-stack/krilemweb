const filterForm = document.querySelector("[data-filter-form]");
const productCards = [...document.querySelectorAll("[data-product-card]")];

function selectedValues(name) {
  return [...filterForm.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function matches(card, name, values) {
  if (!values.length) return true;
  const cardValues = (card.dataset[name] || "").split(" ");
  return values.some((value) => cardValues.includes(value));
}

function applyFilters() {
  if (!filterForm) return;
  const style = selectedValues("style");
  const fit = selectedValues("fit");
  const color = selectedValues("color");
  const size = selectedValues("size");
  productCards.forEach((card) => {
    const visible = matches(card, "style", style) && matches(card, "fit", fit) && matches(card, "color", color) && matches(card, "size", size);
    card.hidden = !visible;
  });
}

filterForm?.addEventListener("change", applyFilters);
applyFilters();
