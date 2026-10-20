/**
 * Cake Catalog & Menu Showcase Component
 */
import { CAKE_CATALOG, CAKE_CATEGORIES } from '../data/cakes.js';
import { SHOP_CONFIG } from '../data/config.js';
import { store } from '../store.js';

export function renderCatalog(container) {
  let activeCategory = 'all';

  function render() {
    const filteredCakes = activeCategory === 'all'
      ? CAKE_CATALOG
      : CAKE_CATALOG.filter(c => c.category === activeCategory);

    container.innerHTML = `
      <section class="catalog-section" id="catalog">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">Signature Creations</span>
            <h2 class="section-title">The Cake Collection</h2>
            <p class="section-subtitle">
              Explore our handcrafted signature creations for weddings, birthdays, intimate date nights, and celebration dessert tables. Each recipe is baked to order.
            </p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="category-filter-tabs">
            ${CAKE_CATEGORIES.map(cat => `
              <button class="filter-tab ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.label}
              </button>
            `).join('')}
          </div>

          <!-- Cake Grid -->
          <div class="cakes-grid">
            ${filteredCakes.map(cake => `
              <div class="cake-card" data-cake-id="${cake.id}">
                <div class="cake-card-img-wrap">
                  <img src="${cake.image}" alt="${cake.name}" class="cake-card-img" loading="lazy" />
                  ${cake.badge ? `<span class="cake-card-badge">${cake.badge}</span>` : ''}
                  <span class="cake-card-servings-badge">${cake.servings}</span>
                </div>

                <div class="cake-card-body">
                  <span class="cake-card-tagline">${cake.tagline}</span>
                  <h3 class="cake-card-title">${cake.name}</h3>
                  <p class="cake-card-desc">${cake.shortDesc}</p>

                  <div class="cake-flavor-pills">
                    ${cake.dietary.map(d => `<span class="flavor-pill">${d}</span>`).join('')}
                  </div>

                  <div class="cake-card-footer">
                    <div class="cake-price">${SHOP_CONFIG.currencySymbol}${cake.price}</div>
                    
                    <div class="cake-actions-row">
                      <button class="btn btn-outline quick-view-btn" data-id="${cake.id}" style="padding: 9px 14px; font-size: 0.85rem;" title="View Details">
                        Details
                      </button>
                      <button class="btn btn-primary add-catalog-btn" data-id="${cake.id}" style="padding: 9px 16px; font-size: 0.85rem;">
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Quick View Modal Container -->
      <div class="modal-overlay" id="cake-modal-overlay">
        <div class="modal-content" id="cake-modal-content">
          <!-- Injected via openModal -->
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Filter click
    container.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    // Add to Cart from card
    container.querySelectorAll('.add-catalog-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const cake = CAKE_CATALOG.find(c => c.id === id);
        if (cake) {
          store.addToCart({
            id: cake.id,
            name: cake.name,
            price: cake.price,
            image: cake.image,
            servings: cake.servings,
            customization: {
              flavor: cake.spongeFlavor,
              filling: cake.filling,
              frosting: cake.frosting
            }
          });

          if (window.showToast) {
            window.showToast(`🍰 Added "${cake.name}" to your bag!`);
          }

          const overlay = document.getElementById('cart-drawer-overlay');
          if (overlay) overlay.classList.add('open');
        }
      });
    });

    // Quick View click
    container.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cake = CAKE_CATALOG.find(c => c.id === id);
        if (cake) openCakeModal(cake);
      });
    });
  }

  function openCakeModal(cake) {
    const overlay = container.querySelector('#cake-modal-overlay');
    const content = container.querySelector('#cake-modal-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <button class="modal-close-btn" id="close-cake-modal" aria-label="Close">&times;</button>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 36px;">
        <div>
          <img src="${cake.image}" alt="${cake.name}" style="width:100%; border-radius:var(--radius-md); object-fit:cover; aspect-ratio:4/3; box-shadow:var(--shadow-md);" />
          <div style="margin-top: 18px; background:var(--color-surface-warm); border-radius:var(--radius-sm); padding:14px; font-size:0.85rem; color:var(--color-text-muted);">
            <strong>⏰ Lead Time:</strong> Please order at least ${cake.leadDays} days before your event. Need it sooner? Chat with us on WhatsApp for rush options.
          </div>
        </div>

        <div>
          <span class="badge badge-gold" style="margin-bottom: 8px;">${cake.servings}</span>
          <h2 style="font-family:var(--font-serif); font-size:1.85rem; color:var(--color-text-main); margin-bottom:8px;">${cake.name}</h2>
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-serif); color:var(--color-berry); margin-bottom:16px;">
            ${SHOP_CONFIG.currencySymbol}${cake.price}
          </div>

          <p style="font-size:0.95rem; color:var(--color-text-muted); line-height:1.6; margin-bottom:20px;">
            ${cake.shortDesc}
          </p>

          <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; color:var(--color-gold); margin-bottom:10px;">Layer Breakdown</h4>
          <ul style="list-style:none; font-size:0.88rem; margin-bottom:24px; display:flex; flex-direction:column; gap:8px;">
            <li><strong>🍰 Sponge:</strong> ${cake.spongeFlavor}</li>
            <li><strong>✨ Filling:</strong> ${cake.filling}</li>
            <li><strong>🎨 Exterior:</strong> ${cake.frosting}</li>
          </ul>

          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary" id="modal-add-cart-btn" style="flex:1;">
              Add to Bag (${SHOP_CONFIG.currencySymbol}${cake.price})
            </button>
            <a href="https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=Hi!%20I'm%20interested%20in%20ordering%20${encodeURIComponent(cake.name)}" target="_blank" class="btn btn-whatsapp" style="padding:12px 18px;">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    overlay.classList.add('open');

    // Close listeners
    const closeBtn = content.querySelector('#close-cake-modal');
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    // Add to cart from modal
    const modalAddBtn = content.querySelector('#modal-add-cart-btn');
    modalAddBtn.addEventListener('click', () => {
      store.addToCart({
        id: cake.id,
        name: cake.name,
        price: cake.price,
        image: cake.image,
        servings: cake.servings,
        customization: {
          flavor: cake.spongeFlavor,
          filling: cake.filling,
          frosting: cake.frosting
        }
      });
      overlay.classList.remove('open');
      if (window.showToast) window.showToast(`🍰 Added "${cake.name}" to your bag!`);
      const cartOverlay = document.getElementById('cart-drawer-overlay');
      if (cartOverlay) cartOverlay.classList.add('open');
    });
  }

  render();
}
