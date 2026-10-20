/**
 * Nexora Laptop & Parts - Store Owner / Back-Office Admin Portal Component
 */
import { store } from '../store.js';

export function renderAdminDashboard(container) {
  let activeTab = 'orders'; // 'orders', 'inventory', 'settings'

  function renderUI() {
    const orders = store.getOrders();
    const products = store.getAllProducts();
    const config = store.config;

    container.innerHTML = `
      <div class="modal-overlay" id="admin-modal-overlay">
        <div class="modal-card admin-modal-card">
          <button class="modal-close-btn" id="admin-close-trigger" aria-label="Close Store Admin">✕</button>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h2 class="modal-title" style="font-size: 1.6rem;">Store Management & Operations</h2>
              <p class="section-desc" style="font-size: 0.85rem;">Manage customer orders, update parts inventory, and configure store settings.</p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; background: rgba(6,182,212,0.15); color: var(--accent-cyan); padding: 0.3rem 0.65rem; border-radius: 6px;">
              Admin Mode Active
            </span>
          </div>

          <!-- Admin Tabs -->
          <div class="admin-tabs">
            <button class="admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}" data-tab="orders">
              📦 Customer Orders (${orders.length})
            </button>
            <button class="admin-tab-btn ${activeTab === 'inventory' ? 'active' : ''}" data-tab="inventory">
              💻 Inventory & Products (${products.length})
            </button>
            <button class="admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
              ⚙️ Store Settings & WhatsApp
            </button>
          </div>

          <!-- Tab 1: Orders -->
          ${activeTab === 'orders' ? `
            <div class="admin-table-wrap">
              ${orders.length === 0 ? `
                <p style="text-align: center; padding: 2rem; color: var(--text-dim);">No customer orders yet.</p>
              ` : `
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer & Phone</th>
                      <th>Items Summary</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orders.map(order => `
                      <tr>
                        <td>
                          <strong style="font-family: var(--font-mono); color: var(--accent-cyan-light);">${order.orderId}</strong>
                          <div style="font-size: 0.7rem; color: var(--text-dim);">${new Date(order.date).toLocaleDateString()}</div>
                        </td>
                        <td>
                          <strong>${order.customerName}</strong>
                          <div style="font-size: 0.75rem; color: var(--text-muted);">${order.customerPhone}</div>
                          <div style="font-size: 0.7rem; color: var(--text-dim);">${order.customerCity}</div>
                        </td>
                        <td>
                          ${order.items.map(i => `<div style="font-size: 0.75rem;">• ${i.name} (x${i.quantity})</div>`).join('')}
                        </td>
                        <td>
                          <strong>${store.formatPrice(order.total)}</strong>
                        </td>
                        <td>
                          <span style="font-size: 0.75rem;">${order.paymentMethod}</span>
                        </td>
                        <td>
                          <select class="checkout-select order-status-select" data-order-id="${order.orderId}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                            <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
                            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <a href="${store.buildWhatsAppOrderUrl(order)}" target="_blank" class="quote-helper-wa-btn" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                            WA Chat
                          </a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `}
            </div>
          ` : ''}

          <!-- Tab 2: Inventory -->
          ${activeTab === 'inventory' ? `
            <div>
              <!-- Add New Product Form -->
              <details style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">
                <summary style="cursor: pointer; font-weight: 700; color: var(--accent-cyan-light); font-size: 0.95rem;">
                  ➕ Add New Product / Laptop / Replacement Part
                </summary>
                <form id="admin-add-product-form" class="checkout-form-grid" style="margin-top: 1rem;">
                  <div>
                    <label class="checkout-label">Product Name *</label>
                    <input type="text" id="new-prod-name" class="checkout-input" placeholder="e.g. Dell Inspiron 15 Replacement Keyboard" required />
                  </div>
                  <div>
                    <label class="checkout-label">Brand *</label>
                    <input type="text" id="new-prod-brand" class="checkout-input" placeholder="e.g. Dell / HP / ASUS / Samsung" required />
                  </div>
                  <div>
                    <label class="checkout-label">Category *</label>
                    <select id="new-prod-category" class="checkout-select" required>
                      <option value="laptops">Laptops</option>
                      <option value="parts">Replacement Parts</option>
                      <option value="storage-ram">RAM & Storage Upgrades</option>
                      <option value="accessories">Accessories & Gear</option>
                    </select>
                  </div>
                  <div>
                    <label class="checkout-label">Price ($ USD) *</label>
                    <input type="number" id="new-prod-price" step="0.01" class="checkout-input" placeholder="49.00" required />
                  </div>
                  <div>
                    <label class="checkout-label">Stock Quantity</label>
                    <input type="number" id="new-prod-stock" class="checkout-input" value="15" />
                  </div>
                  <div>
                    <label class="checkout-label">SKU Code</label>
                    <input type="text" id="new-prod-sku" class="checkout-input" placeholder="NX-KBD-DEL15" />
                  </div>
                  <div class="full-span">
                    <label class="checkout-label">Image URL or Local Path</label>
                    <input type="text" id="new-prod-image" class="checkout-input" placeholder="assets/images/battery-pack.jpg or https://..." value="assets/images/battery-pack.jpg" required />
                  </div>
                  <div class="full-span">
                    <label class="checkout-label">Short Description</label>
                    <input type="text" id="new-prod-desc" class="checkout-input" placeholder="Key specs, compatibility, pin count, voltage..." required />
                  </div>
                  <div class="full-span">
                    <button type="submit" class="btn-primary" style="padding: 0.65rem 1.5rem;">Save & Publish Product</button>
                  </div>
                </form>
              </details>

              <!-- Products Quick List -->
              <div class="admin-table-wrap">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name & SKU</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${products.map(prod => `
                      <tr>
                        <td>
                          <img src="${prod.image}" alt="${prod.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px;" />
                        </td>
                        <td>
                          <strong>${prod.name}</strong>
                          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim);">${prod.sku}</div>
                        </td>
                        <td>
                          <span style="font-size: 0.75rem;">${prod.categoryLabel || prod.category}</span>
                        </td>
                        <td>
                          <strong style="color: var(--accent-cyan);">${store.formatPrice(prod.price)}</strong>
                        </td>
                        <td>
                          <span style="font-size: 0.8rem;">${prod.stockCount || 10} pcs</span>
                        </td>
                        <td>
                          <button class="cart-remove-btn delete-prod-btn" data-id="${prod.id}" title="Delete Product" style="color: var(--accent-rose);">
                            Delete
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- Tab 3: Settings -->
          ${activeTab === 'settings' ? `
            <form id="admin-settings-form" class="checkout-form-grid">
              <div>
                <label class="checkout-label">Business WhatsApp Number (without '+' or spaces) *</label>
                <input type="text" id="set-wa-num" class="checkout-input" value="${config.whatsappNumber}" required />
                <span style="font-size: 0.7rem; color: var(--text-dim);">e.g. 94774906048</span>
              </div>
              <div>
                <label class="checkout-label">Display Phone / Hotline *</label>
                <input type="text" id="set-phone" class="checkout-input" value="${config.displayPhone}" required />
              </div>
              <div>
                <label class="checkout-label">Business Store Name *</label>
                <input type="text" id="set-name" class="checkout-input" value="${config.name}" required />
              </div>
              <div>
                <label class="checkout-label">Support Email *</label>
                <input type="email" id="set-email" class="checkout-input" value="${config.email}" required />
              </div>
              <div class="full-span">
                <label class="checkout-label">Physical Store Location / Address</label>
                <input type="text" id="set-address" class="checkout-input" value="${config.address}, ${config.city}" required />
              </div>
              <div class="full-span" style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="submit" class="btn-primary">Save Settings</button>
                <button type="button" id="btn-reset-catalog" class="btn-secondary" style="color: var(--accent-rose);">
                  Reset Products to Defaults
                </button>
              </div>
            </form>
          ` : ''}
        </div>
      </div>
    `;

    // Elements & Handlers
    const overlay = container.querySelector('#admin-modal-overlay');
    const closeBtn = container.querySelector('#admin-close-trigger');

    function closeModal() {
      overlay.classList.remove('open');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Tab buttons
    container.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        renderUI();
        container.querySelector('#admin-modal-overlay')?.classList.add('open');
      });
    });

    // Order status change
    container.querySelectorAll('.order-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const orderId = sel.dataset.orderId;
        const newStatus = e.target.value;
        store.updateOrderStatus(orderId, newStatus);
        if (window.showToast) window.showToast(`Order #${orderId} marked as ${newStatus}`);
      });
    });

    // Delete Product
    container.querySelectorAll('.delete-prod-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove this product?')) {
          store.deleteProduct(btn.dataset.id);
          renderUI();
          container.querySelector('#admin-modal-overlay')?.classList.add('open');
          if (window.showToast) window.showToast('Product removed.');
        }
      });
    });

    // Add Product Form
    const addProdForm = container.querySelector('#admin-add-product-form');
    if (addProdForm) {
      addProdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#new-prod-name').value.trim();
        const brand = container.querySelector('#new-prod-brand').value.trim();
        const category = container.querySelector('#new-prod-category').value;
        const price = parseFloat(container.querySelector('#new-prod-price').value) || 0;
        const stock = parseInt(container.querySelector('#new-prod-stock').value) || 10;
        const sku = container.querySelector('#new-prod-sku').value.trim() || ('NX-' + Date.now().toString().slice(-6));
        const image = container.querySelector('#new-prod-image').value.trim();
        const desc = container.querySelector('#new-prod-desc').value.trim();

        const catLabels = {
          'laptops': 'Gaming & Ultrabooks',
          'parts': 'Laptop Replacement Parts',
          'storage-ram': 'RAM & Storage Upgrades',
          'accessories': 'Accessories & Gear'
        };

        store.addProduct({
          name: name,
          brand: brand,
          category: category,
          categoryLabel: catLabels[category] || 'Hardware',
          price: price,
          originalPrice: Math.round(price * 1.2),
          stockCount: stock,
          sku: sku,
          image: image,
          shortDesc: desc,
          description: desc,
          inStock: stock > 0
        });

        if (window.showToast) window.showToast(`Product "${name}" added to store!`);
        activeTab = 'inventory';
        renderUI();
        container.querySelector('#admin-modal-overlay')?.classList.add('open');
      });
    }

    // Save Settings
    const setForm = container.querySelector('#admin-settings-form');
    if (setForm) {
      setForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWa = container.querySelector('#set-wa-num').value.replace(/[^0-9]/g, '');
        const newPhone = container.querySelector('#set-phone').value.trim();
        const newName = container.querySelector('#set-name').value.trim();
        const newEmail = container.querySelector('#set-email').value.trim();

        store.config.whatsappNumber = newWa;
        store.config.displayPhone = newPhone;
        store.config.name = newName;
        store.config.email = newEmail;
        store.saveToStorage('nx_config', store.config);

        if (window.showToast) window.showToast('Store settings & WhatsApp hotline updated!');
        closeModal();
      });
    }

    // Reset Catalog
    const resetCatBtn = container.querySelector('#btn-reset-catalog');
    if (resetCatBtn) {
      resetCatBtn.addEventListener('click', () => {
        if (confirm('Reset catalog back to initial product list?')) {
          store.resetProductsToDefault();
          renderUI();
          container.querySelector('#admin-modal-overlay')?.classList.add('open');
          if (window.showToast) window.showToast('Catalog restored to default.');
        }
      });
    }
  }

  // Initial render
  renderUI();

  // Re-render on state changes
  store.subscribe((event) => {
    if (['ORDER_CREATED', 'PRODUCTS_UPDATED'].includes(event)) {
      const wasOpen = container.querySelector('#admin-modal-overlay')?.classList.contains('open');
      renderUI();
      if (wasOpen) {
        container.querySelector('#admin-modal-overlay')?.classList.add('open');
      }
    }
  });
}
