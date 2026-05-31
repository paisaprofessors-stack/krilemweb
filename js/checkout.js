const checkoutForm = document.querySelector("[data-checkout-form]");
const successPanel = document.querySelector("[data-checkout-success]");

checkoutForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = checkoutForm.querySelector("button[type='submit']");
  submitButton.classList.add("is-loading");
  submitButton.textContent = "Confirming COD...";
  window.setTimeout(() => {
    submitButton.classList.remove("is-loading");
    submitButton.textContent = "COD Confirmed";
    successPanel?.classList.add("is-visible");
    successPanel?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 520);
});
