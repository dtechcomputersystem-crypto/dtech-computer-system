/**
 * Nexora Laptop & Parts - Cart Slide-Over Drawer Component
 */
import { store } from '../store.js';

export function renderCartDrawer(container) {
  let selectedDeliveryMethod = 'standard';

  function updateCartUI() {
    const items = store.getCartItems();
    const count = store.getCartCount();
    const subtotal = store.getCartSubtotal();
    const shipping = store.getCartShipping(selectedDeliveryMethod);
    const total = store.getCartTotal(selectedDeliveryMethod);

    container.innerHTML = `
      <div class="cart-drawer-overlay" id="cart-drawer-overlay">
        <div class="cart-drawer">
          <!-- Drawer Header -->
          <div class="cart-drawer-header">
            <h3 class="cart-drawer-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Shopping Bag (${count})</span>
            </h3>
            <button class="cart-drawer-close" id="cart-drawer-close-btn" aria-label="Close Shopping Bag">✕</button>
          </div>

          <!-- Cart Items List -->
          <div class="cart-items-list">
            ${items.length === 0 ? `
              <div class="cart-empty-message">
                <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🛒</div>
                <h4 style="color: #fff; margin-bottom: 0.35rem;">Your Cart is Empty</h4>
                <p style="font-size: 0.85rem; color: var(--text-dim);">Add laptops, replacement screens, batteries, or SSD upgrades to proceed.</p>
              </div>
            ` : items.map((item, index) => `
              <div class="cart-item-row">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
                <div class="cart-item-info">
                  <span class="cart-item-name">${item.name}</span>
                  <span class="cart-item-sku">SKU: ${item.sku}</span>
                  <span class="cart-item-price">${store.formatPrice(item.price)} each</span>

                  <div class="cart-item-stepper">
                    <button class="cart-step-btn" data-action="decrement" data-index="${index}">−</button>
                    <span class="cart-step-val">${item.quantity}</span>
                    <button class="cart-step-btn" data-action="increment" data-index="${index}">+</button>

                    <button class="cart-remove-btn" data-action="remove" data-index="${index}" title="Remove item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Cart Drawer Footer -->
          ${items.length > 0 ? `
            <div class="cart-drawer-footer">
              <!-- Delivery Selector -->
              <div class="delivery-selector-wrap">
                <span class="delivery-label">Shipping Method:</span>
                <div class="delivery-options-grid">
                  <button class="delivery-option-btn ${selectedDeliveryMethod === 'standard' ? 'active' : ''}" data-delivery="standard">
                    Standard (${subtotal >= store.config.shipping.freeShippingThreshold ? 'FREE' : store.formatPrice(store.config.shipping.standardFee)})
                  </button>
                  <button class="delivery-option-btn ${selectedDeliveryMethod === 'express' ? 'active' : ''}" data-delivery="express">
                    Express (${store.formatPrice(store.config.shipping.expressFee)})
                  </button>
                  <button class="delivery-option-btn ${selectedDeliveryMethod === 'pickup' ? 'active' : ''}" data-delivery="pickup">
                    In-Store Pickup (Free)
                  </button>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="cart-summary-lines">
                <div class="cart-summary-line">
                  <span>Subtotal:</span>
                  <span>${store.formatPrice(subtotal)}</span>
                </div>
                <div class="cart-summary-line">
                  <span>Delivery:</span>
                  <span>${shipping === 0 ? 'FREE' : store.formatPrice(shipping)}</span>
                </div>
                <div class="cart-summary-line total">
                  <span>Total Amount:</span>
                  <span>${store.formatPrice(total)}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="cart-checkout-actions">
                <button class="btn-checkout-wa" id="cart-quick-wa-checkout-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Send Order via WhatsApp</span>
                </button>

                <button class="btn-checkout-site" id="cart-open-checkout-modal-btn">
                  <span>Checkout on Website (Invoice & COD)</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Bind Close
    const overlay = container.querySelector('#cart-drawer-overlay');
    const closeBtn = container.querySelector('#cart-drawer-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }

    // Bind Delivery Method Selectors
    container.querySelectorAll('.delivery-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDeliveryMethod = btn.dataset.delivery;
        updateCartUI();
        const ov = container.querySelector('#cart-drawer-overlay');
        if (ov) ov.classList.add('open');
      });
    });

    // Bind Quantity Steppers
    container.querySelectorAll('[data-action="increment"]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.updateQuantity(parseInt(btn.dataset.index), 1);
      });
    });

    container.querySelectorAll('[data-action="decrement"]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.updateQuantity(parseInt(btn.dataset.index), -1);
      });
    });

    container.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.removeFromCart(parseInt(btn.dataset.index));
      });
    });

    // Bind Checkout on Website
    const checkoutSiteBtn = container.querySelector('#cart-open-checkout-modal-btn');
    if (checkoutSiteBtn) {
      checkoutSiteBtn.addEventListener('click', () => {
        if (overlay) overlay.classList.remove('open');
        const checkoutModal = document.getElementById('checkout-modal-overlay');
        if (checkoutModal) checkoutModal.classList.add('open');
      });
    }

    // Bind Quick WhatsApp Checkout
    const quickWaBtn = container.querySelector('#cart-quick-wa-checkout-btn');
    if (quickWaBtn) {
      quickWaBtn.addEventListener('click', () => {
        if (overlay) overlay.classList.remove('open');
        const checkoutModal = document.getElementById('checkout-modal-overlay');
        if (checkoutModal) checkoutModal.classList.add('open');
      });
    }
  }

  // Initial render
  updateCartUI();

  // Subscribe to Cart and Currency updates
  store.subscribe((event) => {
    if (['CART_UPDATED', 'CURRENCY_CHANGED'].includes(event)) {
      const wasOpen = container.querySelector('#cart-drawer-overlay')?.classList.contains('open');
      updateCartUI();
      if (wasOpen) {
        const ov = container.querySelector('#cart-drawer-overlay');
        if (ov) ov.classList.add('open');
      }
    }
  });
}
