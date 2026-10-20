/**
 * Nexora Laptop & Parts - Product Details & Specifications Modal Component
 */
import { store } from '../store.js';

export function renderProductModal(container) {
  let currentQty = 1;

  function renderModal(product) {
    if (!product) {
      container.innerHTML = '';
      return;
    }

    currentQty = 1;
    const formattedPrice = store.formatPrice(product.price);
    const formattedOriginal = product.originalPrice ? store.formatPrice(product.originalPrice) : null;
    const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
    const specs = product.specs || {};
    const compatibleModels = product.compatibleModels || [];

    container.innerHTML = `
      <div class="modal-overlay open" id="product-detail-modal-overlay">
        <div class="modal-card">
          <!-- Close Button -->
          <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close Product Details">✕</button>

          <div class="modal-product-grid">
            <!-- Left: Gallery Column -->
            <div class="modal-gallery-wrap">
              <div class="modal-main-img-box">
                <img src="${gallery[0]}" alt="${product.name}" id="modal-primary-img" class="modal-main-img" />
              </div>

              ${gallery.length > 1 ? `
                <div class="modal-thumb-row">
                  ${gallery.map((imgUrl, i) => `
                    <img src="${imgUrl}" alt="Thumbnail ${i + 1}" class="modal-thumb ${i === 0 ? 'active' : ''}" data-src="${imgUrl}" />
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <!-- Right: Product Information Column -->
            <div class="modal-info-col">
              <div class="modal-category-sku">
                <span>📂 ${product.categoryLabel}</span>
                <span class="card-sku">SKU: ${product.sku}</span>
              </div>

              <h2 class="modal-title">${product.name}</h2>

              <div class="card-rating-row">
                <span>★ ${product.rating.toFixed(1)} Rating</span>
                <span class="reviews-count">(${product.reviewsCount} verified technical reviews)</span>
              </div>

              <div class="modal-price-box">
                <span class="modal-curr-price">${formattedPrice}</span>
                ${formattedOriginal ? `<span class="modal-orig-price">${formattedOriginal}</span>` : ''}
                <span class="card-stock-status stock-in" style="margin-left: auto;">
                  <span class="stock-dot"></span>
                  <span>${product.inStock ? `${product.stockCount || 10}+ Units Available` : 'Pre-order'}</span>
                </span>
              </div>

              <p class="section-desc" style="font-size: 0.9rem; line-height: 1.6;">
                ${product.description || product.shortDesc}
              </p>

              <!-- Technical Specifications Table -->
              ${Object.keys(specs).length > 0 ? `
                <div>
                  <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan-light); margin-bottom: 0.4rem;">
                    Technical Specifications
                  </h4>
                  <table class="modal-specs-table">
                    <tbody>
                      ${Object.entries(specs).map(([key, val]) => `
                        <tr>
                          <td>${key}</td>
                          <td>${val}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}

              <!-- Model Compatibility List -->
              ${compatibleModels.length > 0 ? `
                <div class="modal-compat-box">
                  <div class="compat-title">Verified Laptop Compatibility</div>
                  <div class="compat-tags-list">
                    ${compatibleModels.map(model => `
                      <span class="compat-tag">✔ ${model}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Warranty and Peace of Mind -->
              <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: var(--accent-emerald);">🛡️</span>
                <span><strong>Warranty:</strong> ${product.warranty || '1-Year Hassle-Free Replacement Warranty'}</span>
              </div>

              <!-- Action Row: Quantity + Add to Cart + WhatsApp -->
              <div class="modal-actions-area">
                <div class="qty-cart-row">
                  <div class="qty-stepper">
                    <button class="qty-btn" id="modal-qty-minus">−</button>
                    <span class="qty-val" id="modal-qty-val">${currentQty}</span>
                    <button class="qty-btn" id="modal-qty-plus">+</button>
                  </div>

                  <button class="btn-modal-cart" id="modal-add-cart-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>

                <!-- Instant WhatsApp Direct Order -->
                <a href="${store.buildWhatsAppDirectProductUrl(product)}" target="_blank" rel="noopener noreferrer" class="btn-modal-wa" id="modal-wa-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Buy Now via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Gallery Thumbnails
    const primaryImg = container.querySelector('#modal-primary-img');
    container.querySelectorAll('.modal-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        container.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        primaryImg.src = thumb.dataset.src;
      });
    });

    // Quantity Stepper
    const qtyValEl = container.querySelector('#modal-qty-val');
    container.querySelector('#modal-qty-minus').addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyValEl.textContent = currentQty;
      }
    });

    container.querySelector('#modal-qty-plus').addEventListener('click', () => {
      currentQty++;
      qtyValEl.textContent = currentQty;
    });

    // Add to Cart
    container.querySelector('#modal-add-cart-btn').addEventListener('click', () => {
      store.addToCart(product, currentQty);
      closeModal();
    });

    // Close logic
    function closeModal() {
      container.innerHTML = '';
      store.setSelectedProduct(null);
    }

    container.querySelector('#modal-close-trigger').addEventListener('click', closeModal);
    const overlay = container.querySelector('#product-detail-modal-overlay');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Subscribe to product selection
  store.subscribe((event, payload) => {
    if (event === 'PRODUCT_SELECTED') {
      renderModal(payload);
    }
  });
}
