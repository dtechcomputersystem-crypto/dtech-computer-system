/**
 * Baker's Back-Office Operations Console Modal
 */
import { SHOP_CONFIG } from '../data/config.js';
import { store } from '../store.js';

export function renderBakerAdmin(container) {
  function render() {
    const orders = store.getOrders();

    container.innerHTML = `
      <div class="modal-overlay" id="baker-modal-overlay">
        <div class="modal-content" style="max-width: 920px;">
          <button class="modal-close-btn" id="close-baker-modal" aria-label="Close">&times;</button>
          
          <div class="baker-dashboard-wrap">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--color-border); padding-bottom:18px;">
              <div>
                <span class="badge badge-berry" style="margin-bottom:6px;">Internal Back-Office</span>
                <h2 style="font-family:var(--font-serif); font-size:1.75rem; color:var(--color-text-main);">Baker's Production Schedule</h2>
                <p style="font-size:0.85rem; color:var(--color-text-muted);">Manage upcoming celebration dates, client notes, and baking progress.</p>
              </div>

              <button class="btn btn-primary" id="add-manual-order-btn" style="padding:10px 18px; font-size:0.85rem;">
                + Add Phone Order
              </button>
            </div>

            <!-- Orders Metric Row -->
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:24px;">
              <div style="background:var(--color-surface-warm); padding:16px; border-radius:var(--radius-md); border:1px solid var(--color-border);">
                <div style="font-size:0.8rem; color:var(--color-text-muted); font-weight:700;">TOTAL ACTIVE BOOKINGS</div>
                <div style="font-size:1.8rem; font-family:var(--font-serif); font-weight:800; color:var(--color-berry);">${orders.length}</div>
              </div>
              <div style="background:var(--color-gold-light); padding:16px; border-radius:var(--radius-md); border:1px solid rgba(201,151,87,0.3);">
                <div style="font-size:0.8rem; color:var(--color-gold); font-weight:700;">UPCOMING THIS WEEK</div>
                <div style="font-size:1.8rem; font-family:var(--font-serif); font-weight:800; color:var(--color-gold);">
                  ${orders.filter(o => o.status !== 'Delivered').length}
                </div>
              </div>
              <div style="background:var(--color-sage); padding:16px; border-radius:var(--radius-md); border:1px solid rgba(45,90,56,0.2);">
                <div style="font-size:0.8rem; color:var(--color-sage-text); font-weight:700;">TOTAL ESTIMATED REVENUE</div>
                <div style="font-size:1.8rem; font-family:var(--font-serif); font-weight:800; color:var(--color-sage-text);">
                  ${SHOP_CONFIG.currencySymbol}${orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(0)}
                </div>
              </div>
            </div>

            <!-- Orders List -->
            <div style="display:flex; flex-direction:column; gap:16px; max-height:480px; overflow-y:auto;">
              ${orders.map(order => `
                <div class="baker-order-card" style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px; background:#FFFFFF; border:1px solid var(--color-border); padding:20px; border-radius:var(--radius-md);">
                  <div style="flex-grow:1;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                      <strong style="font-family:var(--font-serif); font-size:1.15rem; color:var(--color-text-main);">${order.cakeTitle}</strong>
                      <span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span>
                    </div>

                    <div style="font-size:0.85rem; color:var(--color-text-muted); line-height:1.5;">
                      <div>👤 <strong>Client:</strong> ${order.customerName} (${order.customerPhone})</div>
                      <div>📅 <strong>Event Date:</strong> <span style="color:var(--color-berry); font-weight:700;">${order.eventDate}</span> • ${order.deliveryType}</div>
                      ${order.inscription ? `<div>✍️ <strong>Inscription:</strong> <em>"${order.inscription}"</em></div>` : ''}
                      ${order.deliveryAddress ? `<div>📍 <strong>Location:</strong> ${order.deliveryAddress}</div>` : ''}
                    </div>
                  </div>

                  <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                    <div style="font-family:var(--font-serif); font-size:1.35rem; font-weight:800; color:var(--color-berry);">
                      ${SHOP_CONFIG.currencySymbol}${order.totalAmount}
                    </div>

                    <select class="status-select" data-id="${order.id}" style="padding:6px 10px; border-radius:var(--radius-sm); border:1px solid var(--color-border); font-size:0.8rem; background:var(--color-bg); font-weight:600;">
                      <option value="New Inquiry" ${order.status === 'New Inquiry' ? 'selected' : ''}>New Inquiry</option>
                      <option value="Baking Scheduled" ${order.status === 'Baking Scheduled' ? 'selected' : ''}>Baking Scheduled</option>
                      <option value="Decorating" ${order.status === 'Decorating' ? 'selected' : ''}>Decorating</option>
                      <option value="Ready for Pickup" ${order.status === 'Ready for Pickup' ? 'selected' : ''}>Ready for Pickup</option>
                      <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered / Completed</option>
                    </select>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function getStatusBadgeClass(status) {
    if (status === 'Ready for Pickup' || status === 'Delivered') return 'badge-sage';
    if (status === 'Decorating' || status === 'Baking Scheduled') return 'badge-gold';
    return 'badge-berry';
  }

  function bindEvents() {
    const overlay = container.querySelector('#baker-modal-overlay');
    const closeBtn = container.querySelector('#close-baker-modal');

    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }

    // Status change
    container.querySelectorAll('.status-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = sel.getAttribute('data-id');
        store.updateOrderStatus(id, sel.value);
        if (window.showToast) window.showToast(`Updated ${id} to "${sel.value}"`);
      });
    });

    // Add manual order button
    const addManualBtn = container.querySelector('#add-manual-order-btn');
    if (addManualBtn) {
      addManualBtn.addEventListener('click', () => {
        const client = prompt("Enter Client Name:", "Emily Watson");
        if (!client) return;
        const cake = prompt("Enter Cake Details / Occasion:", "8\" Chocolate Birthday Cake");
        if (!cake) return;
        const date = prompt("Enter Event Date (YYYY-MM-DD):", "2026-09-30");

        store.addOrder({
          customerName: client,
          customerPhone: "+1 (555) 000-0000",
          eventDate: date,
          deliveryType: "Studio Pickup",
          deliveryAddress: "Studio Counter",
          cakeTitle: cake,
          totalAmount: 115.00,
          status: "Baking Scheduled"
        });

        render();
        const o = container.querySelector('#baker-modal-overlay');
        if (o) o.classList.add('open');
      });
    }
  }

  store.subscribe((event) => {
    if (event === 'ORDERS_UPDATED') {
      const wasOpen = container.querySelector('#baker-modal-overlay')?.classList.contains('open');
      render();
      if (wasOpen) {
        const o = container.querySelector('#baker-modal-overlay');
        if (o) o.classList.add('open');
      }
    }
  });

  render();
}
