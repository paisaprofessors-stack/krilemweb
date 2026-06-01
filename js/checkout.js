const checkoutForm = document.querySelector("[data-checkout-form]");
const successPanel = document.querySelector("[data-checkout-success]");
const orderSummary = document.querySelector("[data-order-summary]");
const orderTotal = document.querySelector("[data-order-total]");

const FORM_ENDPOINT = ""; // TODO: paste your Google Apps Script / Formspree URL here

function formatPrice(value) {
  return "\u20b9" + Number(value).toLocaleString("en-IN");
}

function renderOrderSummary() {
  const items = JSON.parse(localStorage.getItem('krilem_cart') || '[]');
  if (!orderSummary) return;
  if (!items.length) {
    orderSummary.innerHTML = '<p class="muted">Your cart is empty.</p>';
    return;
  }
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  orderSummary.innerHTML = items.map((item) => `
    <article class="checkout-line">
      <img src="${item.image}" alt="${item.name}" width="84" height="104" loading="lazy">
      <div>
        <h3>${item.name}</h3>
        <p class="muted">Size ${item.size} / Qty ${item.quantity}</p>
        <p><strong>${formatPrice(item.price * item.quantity)}</strong></p>
      </div>
    </article>
  `).join("");
  if (orderTotal) orderTotal.textContent = formatPrice(total);
  const confirmLabel = document.querySelector("[data-cod-confirm-label]");
  if (confirmLabel) confirmLabel.textContent = `I confirm this is a COD order and I will pay ${formatPrice(total)} on delivery.`;
  const successAmt = document.querySelector("[data-success-amount]");
  if (successAmt) successAmt.textContent = formatPrice(total);
}

renderOrderSummary();

checkoutForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = checkoutForm.querySelector("button[type='submit']");
  submitButton.classList.add("is-loading");
  submitButton.textContent = "Confirming COD...";

  const items = JSON.parse(localStorage.getItem('krilem_cart') || '[]');
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const payload = {
    name: checkoutForm.name.value.trim(),
    phone: checkoutForm.phone.value.trim(),
    pincode: checkoutForm.pincode.value.trim(),
    address: checkoutForm.address.value.trim(),
    items: items.map((i) => `${i.name} x${i.quantity} (Size ${i.size})`).join(', '),
    total: formatPrice(total),
    timestamp: new Date().toISOString()
  };

  try {
    if (FORM_ENDPOINT) {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    // Clear cart after successful order
    localStorage.removeItem('krilem_cart');
    submitButton.classList.remove("is-loading");
    submitButton.textContent = "COD Confirmed";
    successPanel?.classList.add("is-visible");
    successPanel?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Update cart badge to 0
    document.querySelectorAll("[data-cart-count]").forEach((n) => { n.textContent = "0"; });
    document.querySelectorAll("[data-cart-total]").forEach((n) => { n.textContent = "\u20b90"; });
  } catch (err) {
    submitButton.classList.remove("is-loading");
    submitButton.textContent = "Confirm COD Order";
    alert("Something went wrong. Please try again or contact us on WhatsApp.");
  }
});
