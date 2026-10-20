/**
 * Nexora Laptop & Parts - Order Tracking Modal Component
 */
import { store } from '../store.js';

export function renderOrderTrackingModal(container) {
  container.innerHTML = `
    <div class="modal-overlay" id="tracking-modal-overlay">
      <div class="modal-card" style="max-width: 600px; padding: 2rem;">
        <button class="modal-close-btn" id="tracking-close-trigger" aria-label="Close Tracking Modal">✕</button>

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 2.25rem; margin-bottom: 0.5rem;">📦</div>
          <h2 class="modal-title" style="font-size: 1.5rem; margin-bottom: 0.35rem;">Track Your Order</h2>
          <p class="section-desc" style="font-size: 0.85rem;">
            Enter your Order ID (found on your invoice or WhatsApp message) to check live testing, packaging, and dispatch status.
          </p>
        </div>

        <!-- Lookup Form -->
        <form id="order-tracking-form" style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
          <input 
            type="text" 
            id="tracking-query-input" 
            class="checkout-input" 
            placeholder="e.g. NX-84920 or NX-84882" 
            required 
            style="text-transform: uppercase; font-family: var(--font-mono); font-weight: 600;"
          />
          <button type="submit" class="btn-primary" style="padding: 0.65rem 1.25rem;">
            <span>Track</span>
          </button>
        </form>

        <!-- Tracking Results Mount -->
        <div id="tracking-results-mount"></div>
      </div>
    </div>
  `;

  const overlay = container.querySelector('#tracking-modal-overlay');
  const closeBtn = container.querySelector('#tracking-close-trigger');
  const form = container.querySelector('#order-tracking-form');
  const queryInput = container.querySelector('#tracking-query-input');
  const resultsMount = container.querySelector('#tracking-results-mount');

  function closeModal() {
    overlay.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = queryInput.value.trim().toUpperCase();
    const order = store.getOrderById(query);

    if (!order) {
      resultsMount.innerHTML = `
        <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 1rem; text-align: center; font-size: 0.85rem; color: #fff;">
          <strong>Order not found.</strong><br>
          Please check your Order ID (e.g. <code>NX-84920</code>). If you placed the order recently via WhatsApp, contact our hotline for immediate updates.
        </div>
      `;
      return;
    }

    // Determine progress steps based on status
    const statuses = ['Processing', 'Confirmed', 'Dispatched', 'Delivered'];
    const currentIdx = statuses.indexOf(order.status) > -1 ? statuses.indexOf(order.status) : 1;

    resultsMount.innerHTML = `
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div>
            <span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan);">${order.orderId}</span>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${new Date(order.date).toLocaleDateString()}</div>
          </div>
          <span class="status-badge status-${(order.status || 'confirmed').toLowerCase()}">${order.status}</span>
        </div>

        <!-- Visual Timeline -->
        <div style="display: flex; justify-content: space-between; position: relative; margin: 1.5rem 0.5rem;">
          <div style="position: absolute; top: 12px; left: 10%; right: 10%; height: 2px; background: rgba(255,255,255,0.1); z-index: 1;"></div>
          <div style="position: absolute; top: 12px; left: 10%; width: ${(currentIdx / (statuses.length - 1)) * 80}%; height: 2px; background: var(--accent-cyan); z-index: 2; transition: width 0.5s ease;"></div>

          ${statuses.map((st, i) => {
            const isCompleted = i <= currentIdx;
            return `
              <div style="display: flex; flex-direction: column; align-items: center; z-index: 3; gap: 0.35rem;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: ${isCompleted ? 'var(--accent-cyan)' : 'var(--bg-surface)'}; border: 2px solid ${isCompleted ? 'var(--accent-cyan)' : 'var(--border-subtle)'}; color: ${isCompleted ? '#020617' : 'var(--text-dim)'}; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700;">
                  ${isCompleted ? '✓' : i + 1}
                </div>
                <span style="font-size: 0.7rem; color: ${isCompleted ? '#fff' : 'var(--text-dim)'}; font-weight: 600;">${st}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Summary & Details -->
        <div style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5;">
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Delivery Address:</strong> ${order.customerAddress}, ${order.customerCity}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Total:</strong> <strong style="color: #fff;">${store.formatPrice(order.total)}</strong></p>
        </div>

        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-size: 0.75rem; color: var(--text-dim);">Need immediate courier tracking number?</span>
          <a href="https://wa.me/${store.config.whatsappNumber}?text=Hi%20D-Tech%2C%20checking%20status%20for%20order%20%23${order.orderId}" target="_blank" rel="noopener noreferrer" class="quote-helper-wa-btn">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    `;
  });
}
