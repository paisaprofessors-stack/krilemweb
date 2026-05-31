let cart = { items: [], count: 0, total: 0 };

const formatPrice = (value) => "\u20b9" + value.toLocaleString("en-IN");

function updateCount() {
  cart.count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = cart.count;
  });
  document.querySelectorAll("[data-cart-total]").forEach((node) => {
    node.textContent = formatPrice(cart.total);
  });
  renderCart();
}

function addItem(product) {
  const existing = cart.items.find((item) => item.id === product.id && item.size === product.size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
  updateCount();
  openCart();
}

function removeItem(id, size) {
  cart.items = cart.items.filter((item) => !(item.id === id && item.size === size));
  updateCount();
}

function renderCart() {
  const target = document.querySelector("[data-cart-items]");
  if (!target) return;
  if (!cart.items.length) {
    target.innerHTML = '<p class="muted">Your cart is empty. Add a tee to keep momentum.</p>';
    return;
  }
  target.innerHTML = cart.items.map((item) => `
    <article class="cart-line">
      <img src="${item.image}" alt="${item.name}" width="64" height="80" loading="lazy">
      <div>
        <strong>${item.name}</strong>
        <p class="muted">Size ${item.size} / Qty ${item.quantity}</p>
        <p>${formatPrice(item.price)}</p>
      </div>
      <button class="btn btn-secondary" type="button" data-remove-item="${item.id}" data-remove-size="${item.size}" aria-label="Remove ${item.name}">Remove</button>
    </article>
  `).join("");
}

function openCart() {
  const drawer = document.querySelector("[data-cart-drawer]");
  if (!drawer) return;
  drawer.classList.add("is-open");
  document.body.classList.add("cart-open");
}

function productFromButton(addButton) {
  const stickySize = addButton.closest("[data-sticky-buy]")?.querySelector("[data-sticky-size]")?.value;
  const selectedSize = stickySize || document.querySelector(".size-btn.is-selected")?.dataset.size || addButton.dataset.size || "L";
  return {
    id: addButton.dataset.productId || "akatsuki-oversized-tee",
    name: addButton.dataset.productName || "Akatsuki Oversized Tee",
    price: Number(addButton.dataset.productPrice || 649),
    image: addButton.dataset.productImage || "https://picsum.photos/seed/akatsuki-front/800/1000",
    size: selectedSize
  };
}

function flashButton(addButton, text, callback) {
  const original = addButton.textContent;
  addButton.classList.add("is-loading");
  addButton.textContent = "Adding...";
  window.setTimeout(() => {
    addButton.classList.remove("is-loading");
    addButton.textContent = text;
    addButton.setAttribute("aria-live", "polite");
    callback?.();
    window.setTimeout(() => {
      addButton.textContent = original;
    }, 1400);
  }, 260);
}

function closeCart() {
  const drawer = document.querySelector("[data-cart-drawer]");
  if (!drawer) return;
  drawer.classList.remove("is-open");
  document.body.classList.remove("cart-open");
}

document.addEventListener("click", (event) => {
  const sizeButton = event.target.closest(".size-btn");
  if (sizeButton) {
    document.querySelectorAll(".size-btn").forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-checked", "false");
    });
    sizeButton.classList.add("is-selected");
    sizeButton.setAttribute("aria-checked", "true");
  }

  const buyNowButton = event.target.closest("[data-buy-now]");
  if (buyNowButton) {
    addItem(productFromButton(buyNowButton));
    flashButton(buyNowButton, "Added \u2713", () => {
      window.setTimeout(() => {
        window.location.href = buyNowButton.dataset.checkoutUrl || "../cart.html";
      }, 360);
    });
    return;
  }

  const addButton = event.target.closest("[data-add-cart]");
  if (addButton) {
    addItem(productFromButton(addButton));
    flashButton(addButton, "Added \u2713");
  }

  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]") || event.target.matches("[data-cart-backdrop]")) closeCart();

  const removeButton = event.target.closest("[data-remove-item]");
  if (removeButton) {
    removeItem(removeButton.dataset.removeItem, removeButton.dataset.removeSize);
  }
});

updateCount();
