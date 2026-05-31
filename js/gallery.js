const galleryStage = document.querySelector("[data-gallery-main]");
const galleryBadge = document.querySelector(".gallery-badge");
const captionText = document.querySelector(".caption-text strong");
const captionDesc = document.querySelector(".caption-text span");
const captionCounter = document.querySelector(".caption-counter");
const lightbox = document.querySelector("[data-gallery-lightbox]");
const lightboxImage = document.querySelector("[data-gallery-lightbox-img]");
let lastTap = 0;

function getThumbCount() {
  return document.querySelectorAll("[data-gallery-thumb]").length;
}

function updateGalleryInfo(thumb) {
  const label = thumb.querySelector(".thumb-label")?.textContent || "";
  const num = thumb.querySelector(".thumb-num")?.textContent || "";
  const total = getThumbCount();

  if (galleryBadge) galleryBadge.textContent = label.toUpperCase();
  if (captionText) captionText.textContent = label;
  if (captionDesc) captionDesc.textContent = `Direct ${label.toLowerCase()} product view.`;
  if (captionCounter) captionCounter.textContent = `${num} / 0${total}`;
}

document.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-gallery-thumb]");
  if (!thumb || !galleryStage) return;

  document.querySelectorAll("[data-gallery-thumb]").forEach((node) => node.classList.remove("is-active"));
  thumb.classList.add("is-active");

  galleryStage.classList.add("is-switching");
  window.setTimeout(() => {
    galleryStage.src = thumb.dataset.full;
    galleryStage.alt = thumb.dataset.alt;
    galleryStage.classList.remove("is-switching");
  }, 120);

  updateGalleryInfo(thumb);
});

galleryStage?.closest(".gallery-stage")?.addEventListener("click", () => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = galleryStage.src;
  lightboxImage.alt = galleryStage.alt;
  lightbox.classList.add("is-open");
  document.body.classList.add("modal-open");
});

lightbox?.addEventListener("click", (event) => {
  const now = Date.now();
  if (event.target.closest("[data-gallery-close]")) {
    lightbox.classList.remove("is-open", "is-zoomed");
    document.body.classList.remove("modal-open");
    return;
  }
  if (event.target === lightbox) {
    lightbox.classList.remove("is-open", "is-zoomed");
    document.body.classList.remove("modal-open");
    return;
  }
  if (now - lastTap < 320) {
    lightbox.classList.toggle("is-zoomed");
  }
  lastTap = now;
});

const usualSize = document.querySelector("[data-usual-size]");
const dropFit = document.querySelector("[data-drop-fit]");
const sizeResult = document.querySelector("[data-size-result]");

function updateSizeHelper() {
  if (!usualSize || !dropFit || !sizeResult) return;
  const order = ["S", "M", "L", "XL", "XXL"];
  const baseIndex = order.indexOf(usualSize.value);
  const recommended = dropFit.value === "more" ? order[Math.min(baseIndex + 1, order.length - 1)] : usualSize.value;
  sizeResult.textContent = `Recommended: ${recommended}. ${dropFit.value === "more" ? "More drop, more drama." : "True streetwear silhouette."}`;
}

usualSize?.addEventListener("change", updateSizeHelper);
dropFit?.addEventListener("change", updateSizeHelper);
updateSizeHelper();

document.querySelector("[data-pincode-check]")?.addEventListener("click", () => {
  const input = document.querySelector("[data-pincode-input]");
  const result = document.querySelector("[data-pincode-result]");
  if (!input || !result) return;
  const date = new Date();
  date.setDate(date.getDate() + (input.value.length === 6 ? 4 : 5));
  result.textContent = input.value.length === 6
    ? `Delivers by ${date.toLocaleDateString("en-IN", { weekday: "short", month: "long", day: "numeric" })}. COD available.`
    : "Enter a 6-digit pincode. We will sort the scene.";
});
