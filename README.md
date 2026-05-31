# Krilem Streetwear Store

Static multi-page e-commerce site for a premium dark-themed Indian streetwear brand.

## Files

- `index.html` - Homepage with hero, product grids, collection bento, community fits, reviews, and newsletter.
- `shop.html` - Filterable catalogue page using style, fit, color, and size filters.
- `new-arrivals.html` - New arrivals listing page.
- `best-sellers.html` - Best sellers listing page.
- `sale.html` - Sale listing page.
- `collections/anime.html` - Anime collection page.
- `collections/streetwear.html` - Streetwear collection page.
- `collections/minimal.html` - Minimal collection page.
- `collections/vintage.html` - Vintage collection page.
- `collections/limited-drops.html` - Limited drops collection page.
- `product/akatsuki-oversized-tee.html` - Main product page with gallery, sticky buy panel, size modal, accordion, reviews, and mobile sticky buy bar.
- `cart.html` - Minimal two-step cart review and checkout form.
- `css/tokens.css` - Color, spacing, radius, shadow, motion, typography, and layout tokens.
- `css/base.css` - Reset, global layout, focus, accessibility, and reduced-motion styles.
- `css/components.css` - Shared navbar, buttons, cards, badges, accordions, modals, cart drawer, reviews, and footer.
- `css/pages/home.css` - Homepage-specific hero, bento, community, and newsletter styles.
- `css/pages/shop.css` - Shop and filter layout styles.
- `css/pages/product.css` - Product page gallery, buy panel, expanded gallery, and sticky mobile bar styles.
- `css/pages/collection.css` - Collection hero styles.
- `css/pages/cart.css` - Cart and checkout form styles.
- `js/cart.js` - In-memory cart state, add/remove/update operations, cart drawer, and CTA feedback.
- `js/gallery.js` - Product thumbnail switching.
- `js/accordion.js` - Accordion open/close state using CSS grid height animation.
- `js/modal.js` - Size chart modal open, close, backdrop, and Escape handling.
- `js/nav.js` - Mobile nav toggle and sticky header scroll state.
- `js/timer.js` - Two-hour countdown and mobile sticky bar visibility.
- `js/filters.js` - Shop page filter logic.
- `js/animations.js` - IntersectionObserver scroll reveal effects.
- `js/checkout.js` - Fast checkout submit state and completion animation.

## Open Locally

Open `index.html` directly in a browser. No build step or server is required.

## Add New Products

Edit product cards in `index.html`, `shop.html`, listing pages, and the relevant `collections/*.html` file. For filter support on `shop.html`, add `data-style`, `data-fit`, `data-color`, and `data-size` to the new product card. For a full product detail page, copy `product/akatsuki-oversized-tee.html`, update text, image seeds, prices, gallery thumbnails, and add the new relative link wherever the product appears.

# krilemweb
