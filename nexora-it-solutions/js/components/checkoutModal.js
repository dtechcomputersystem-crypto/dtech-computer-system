/**
 * Nexora Laptop & Parts - Order Checkout & Printable Invoice Receipt Modal Component
 */
import { store } from '../store.js';

export function renderCheckoutModal(container) {
  function renderUI() {
    const items = store.getCartItems();
    const subtotal = store.getCartSubtotal();
    const shipping = store.getCartShipping('standard');
    const total = store.getCartTotal('standard');
    const config = store.config;

    container.innerHTML = `
      <div class="modal-overlay" id="checkout-modal-overlay">
        <div class="modal-card checkout-modal-card">
          <button class="modal-close-btn" id="checkout-close-trigger" aria-label="Close Checkout">✕</button>

          <div id="checkout-form-container">
            <h2 class="modal-title" style="margin-bottom: 0.25rem;">Checkout & Dispatch Order</h2>
            <p class="section-desc" style="font-size: 0.85rem;">
              Provide your delivery details. You can send this order directly via WhatsApp or place it on the website for instant receipt and dispatch.
            </p>

            <form id="checkout-order-form" class="checkout-form-grid">
              <!-- Full Name -->
              <div>
                <label for="checkout-name" class="checkout-label">Full Name *</label>
                <input type="text" id="checkout-name" class="checkout-input" placeholder="e.g. John Doe" required />
              </div>

              <!-- Phone / WhatsApp -->
              <div>
                <label for="checkout-phone" class="checkout-label">WhatsApp / Phone Number *</label>
                <input type="tel" id="checkout-phone" class="checkout-input" placeholder="e.g. +1 555-0192 or 0771234567" required />
              </div>

              <!-- Email -->
              <div>
                <label for="checkout-email" class="checkout-label">Email Address</label>
                <input type="email" id="checkout-email" class="checkout-input" placeholder="john@example.com" />
              </div>

              <!-- City / Province -->
              <div>
                <label for="checkout-city" class="checkout-label">City / Region *</label>
                <input type="text" id="checkout-city" class="checkout-input" placeholder="e.g. San Jose, CA or Colombo" required />
              </div>

              <!-- Delivery Address -->
              <div class="full-span">
                <label for="checkout-address" class="checkout-label">Shipping / Delivery Address *</label>
                <input type="text" id="checkout-address" class="checkout-input" placeholder="Street address, Apartment, Suite, Landmark" required />
              </div>

              <!-- Laptop Model (For Part Verification) -->
              <div class="full-span">
                <label for="checkout-laptop-model" class="checkout-label">
                  Your Laptop Model Number (Optional - our tech team will verify part compatibility before shipping!)
                </label>
                <input type="text" id="checkout-laptop-model" class="checkout-input" placeholder="e.g. Dell XPS 15 9570, Lenovo T480, Acer Nitro 5" />
              </div>

              <!-- Delivery Method -->
              <div>
                <label for="checkout-delivery-method" class="checkout-label">Delivery Speed</label>
                <select id="checkout-delivery-method" class="checkout-select">
                  <option value="standard">Standard Courier (${shipping === 0 ? 'FREE' : store.formatPrice(shipping)})</option>
                  <option value="express">Express Priority (${store.formatPrice(config.shipping.expressFee)})</option>
                  <option value="pickup">In-Store Pickup (Free at Tech Plaza)</option>
                </select>
              </div>

              <!-- Payment Method -->
              <div>
                <label for="checkout-payment-method" class="checkout-label">Payment Method</label>
                <select id="checkout-payment-method" class="checkout-select">
                  <option value="Cash on Delivery">Cash on Delivery (Pay upon delivery)</option>
                  <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  <option value="WhatsApp Confirmation">Confirm & Pay via WhatsApp</option>
                  <option value="Credit / Debit Card">Credit / Debit Card (Online)</option>
                </select>
              </div>

              <!-- Special Notes -->
              <div class="full-span">
                <label for="checkout-notes" class="checkout-label">Special Delivery Instructions</label>
                <textarea id="checkout-notes" class="checkout-textarea" rows="2" placeholder="e.g. Call before delivery, urgent screen repair needed..."></textarea>
              </div>

              <!-- Live Order Summary Box -->
              <div class="full-span" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1rem;">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan-light); margin-bottom: 0.5rem;">
                  ORDER ITEMS SUMMARY (${store.getCartCount()} ITEMS)
                </div>
                ${items.map(i => `
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">
                    <span>${i.name} (x${i.quantity})</span>
                    <span>${store.formatPrice(i.price * i.quantity)}</span>
                  </div>
                `).join('')}
                <div style="border-top: 1px solid var(--border-subtle); margin-top: 0.5rem; padding-top: 0.5rem; display: flex; justify-content: space-between; font-weight: 700; color: #fff;">
                  <span>Grand Total:</span>
                  <span id="checkout-display-total" style="color: var(--accent-cyan); font-size: 1.1rem;">${store.formatPrice(total)}</span>
                </div>
              </div>

              <!-- Submission Buttons -->
              <div class="full-span" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
                <!-- WhatsApp Order Button -->
                <button type="button" id="btn-submit-order-wa" class="btn-checkout-wa" style="width: 100%;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Send Order Directly to WhatsApp</span>
                </button>

                <!-- Website Order Placement -->
                <button type="submit" class="btn-checkout-site" style="width: 100%;">
                  <span>Place Order & Generate Tax Invoice</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Order Confirmation & Printable Invoice Container (Initially Hidden) -->
          <div id="checkout-receipt-container" style="display: none;"></div>
        </div>
      </div>
    `;

    // Elements & Handlers
    const overlay = container.querySelector('#checkout-modal-overlay');
    const closeBtn = container.querySelector('#checkout-close-trigger');
    const form = container.querySelector('#checkout-order-form');
    const formContainer = container.querySelector('#checkout-form-container');
    const receiptContainer = container.querySelector('#checkout-receipt-container');
    const submitWaBtn = container.querySelector('#btn-submit-order-wa');
    const deliveryMethodSelect = container.querySelector('#checkout-delivery-method');
    const displayTotal = container.querySelector('#checkout-display-total');

    function closeModal() {
      overlay.classList.remove('open');
      // Reset receipt view back to form after short delay
      setTimeout(() => {
        formContainer.style.display = 'block';
        receiptContainer.style.display = 'none';
        receiptContainer.innerHTML = '';
      }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Update total when delivery method changes
    deliveryMethodSelect.addEventListener('change', () => {
      const currentMethod = deliveryMethodSelect.value;
      const newTotal = store.getCartTotal(currentMethod);
      displayTotal.textContent = store.formatPrice(newTotal);
    });

    // Handle Order Submission
    function handleOrder(isWhatsApp = false) {
      const name = container.querySelector('#checkout-name').value.trim();
      const phone = container.querySelector('#checkout-phone').value.trim();
      const email = container.querySelector('#checkout-email').value.trim();
      const city = container.querySelector('#checkout-city').value.trim();
      const address = container.querySelector('#checkout-address').value.trim();
      const laptopModel = container.querySelector('#checkout-laptop-model').value.trim();
      const deliveryMethod = deliveryMethodSelect.value;
      const paymentMethod = container.querySelector('#checkout-payment-method').value;
      const notes = container.querySelector('#checkout-notes').value.trim();

      if (!name || !phone || !city || !address) {
        if (window.showToast) window.showToast('Please fill in all required fields (Name, Phone, City, Address).');
        return;
      }

      const cartItems = store.getCartItems();
      if (cartItems.length === 0) {
        if (window.showToast) window.showToast('Your shopping bag is empty!');
        return;
      }

      const orderData = {
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerCity: city,
        customerAddress: address,
        laptopModel: laptopModel,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
        notes: notes,
        items: [...cartItems],
        subtotal: store.getCartSubtotal(),
        shipping: store.getCartShipping(deliveryMethod),
        total: store.getCartTotal(deliveryMethod)
      };

      // Create order in store
      const createdOrder = store.createOrder(orderData);

      // If WhatsApp order, open WhatsApp URL in new window
      if (isWhatsApp) {
        const waUrl = store.buildWhatsAppOrderUrl(createdOrder);
        window.open(waUrl, '_blank');
      }

      // Show receipt in modal
      showInvoiceReceipt(createdOrder);
    }

    // Bind WhatsApp Order Button
    submitWaBtn.addEventListener('click', () => {
      handleOrder(true);
    });

    // Bind Website Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleOrder(false);
    });

    // Render Printable Tax Invoice
    function showInvoiceReceipt(order) {
      formContainer.style.display = 'none';
      receiptContainer.style.display = 'block';

      const waOrderUrl = store.buildWhatsAppOrderUrl(order);

      receiptContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 2.75rem; color: var(--accent-emerald);">✔</div>
          <h2 style="font-family: var(--font-heading); color: #fff; margin-bottom: 0.35rem;">Order Placed Successfully!</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            Order Reference: <strong style="color: var(--accent-cyan); font-family: var(--font-mono);">${order.orderId}</strong>
          </p>
        </div>

        <!-- Printable Invoice -->
        <div class="invoice-card" id="printable-invoice">
          <div class="invoice-header">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="${config.logo || 'assets/images/d-tech-logo.jpg'}" alt="D-Tech Logo" style="height: 52px; width: 52px; object-fit: contain; border-radius: 8px; border: 1px solid #e2e8f0; padding: 2px; background: #fff;" />
              <div>
                <div class="invoice-logo-title">${config.name.toUpperCase()}</div>
                <div style="font-size: 0.8rem; color: #0284c7; font-weight: 700;">Your Tech Partner</div>
                <div style="font-size: 0.75rem; color: #64748b;">Phone: <strong>${config.phone}</strong> | Email: <strong>${config.email}</strong></div>
                <div style="font-size: 0.75rem; color: #64748b;">${config.address}, ${config.city}</div>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="invoice-ref-badge">INVOICE: ${order.orderId}</span>
              <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.35rem;">Date: ${new Date(order.date).toLocaleDateString()}</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #0284c7; margin-top: 0.25rem;">Status: ${order.status}</div>
            </div>
          </div>

          <!-- Customer & Shipping Block -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; font-size: 0.85rem; background: #f8fafc; padding: 0.85rem; border-radius: 8px;">
            <div>
              <strong style="color: #0f172a;">Customer Details:</strong><br>
              ${order.customerName}<br>
              Phone: ${order.customerPhone}<br>
              ${order.customerEmail ? `Email: ${order.customerEmail}<br>` : ''}
              ${order.laptopModel ? `<strong>Laptop Model:</strong> ${order.laptopModel}<br>` : ''}
            </div>
            <div>
              <strong style="color: #0f172a;">Shipping Address:</strong><br>
              ${order.customerAddress}<br>
              ${order.customerCity}<br>
              <strong>Payment:</strong> ${order.paymentMethod}<br>
              <strong>Delivery:</strong> ${order.deliveryMethod === 'pickup' ? 'Store Pickup' : order.deliveryMethod === 'express' ? 'Express Priority' : 'Standard Delivery'}
            </div>
          </div>

          <!-- Items Table -->
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Item & SKU</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>
                    <strong>${item.name}</strong><br>
                    <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #64748b;">SKU: ${item.sku}</span>
                  </td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">${store.formatPrice(item.price)}</td>
                  <td style="text-align: right;">${store.formatPrice(item.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Totals -->
          <div style="border-top: 2px solid #e2e8f0; padding-top: 0.75rem; display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem; font-size: 0.875rem;">
            <div>Subtotal: <strong>${store.formatPrice(order.subtotal)}</strong></div>
            <div>Shipping Fee: <strong>${order.shipping === 0 ? 'FREE' : store.formatPrice(order.shipping)}</strong></div>
            <div class="invoice-total-box" style="margin-top: 0.5rem; font-size: 1.25rem;">
              Total: ${store.formatPrice(order.total)}
            </div>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px dashed #cbd5e1; font-size: 0.75rem; color: #64748b; text-align: center;">
            Thank you for shopping with ${config.name}! All replacement parts are tested with 1-Year Warranty. For inquiries, contact WhatsApp: ${config.phone}.
          </div>
        </div>

        <!-- Action Row -->
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
          <button id="invoice-print-btn" class="btn-primary" style="flex: 1;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print / Save PDF Invoice</span>
          </button>

          <a href="${waOrderUrl}" target="_blank" rel="noopener noreferrer" class="btn-wa-hero" style="flex: 1;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Confirm Order on WhatsApp</span>
          </a>
        </div>
      `;

      // Bind Print Button
      container.querySelector('#invoice-print-btn').addEventListener('click', () => {
        window.print();
      });
    }
  }

  // Initial render
  renderUI();

  // Re-render when cart or currency updates
  store.subscribe((event) => {
    if (['CART_UPDATED', 'CURRENCY_CHANGED'].includes(event)) {
      const wasOpen = container.querySelector('#checkout-modal-overlay')?.classList.contains('open');
      renderUI();
      if (wasOpen) {
        container.querySelector('#checkout-modal-overlay')?.classList.add('open');
      }
    }
  });
}
