/**
 * Nexora Laptop & Parts - Navigation Header Component
 */
import { store } from '../store.js';

export function renderNavbar(container) {
  const config = store.config;
  const currencies = store.getCurrencies();
  const currentCurrency = store.getCurrentCurrency();
  const cartCount = store.getCartCount();

  container.innerHTML = `
    <!-- Top Announcement Bar -->
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-features">
          <span class="top-bar-item">
            <span class="icon-glow">⚡</span> <strong>Same-Day Dispatch</strong> on orders before 3 PM
          </span>
          <span class="top-bar-item">
            <span class="icon-glow">🛡️</span> 100% Genuine Tested OEM Parts with Warranty
          </span>
          <span class="top-bar-item">
            <span class="icon-glow">💬</span> WhatsApp / Call: <a href="https://wa.me/${config.whatsappNumber}" target="_blank" class="top-bar-link"><strong>${config.displayPhone}</strong></a>
          </span>
          <span class="top-bar-item">
            <span class="icon-glow">✉️</span> <a href="mailto:${config.email}" class="top-bar-link"><strong>${config.email}</strong></a>
          </span>
        </div>

        <div class="top-bar-actions">
          <!-- Currency Selector -->
          <div class="currency-select-wrap">
            <span>🌐</span>
            <select id="currency-selector" class="currency-select" title="Change Currency">
              ${currencies.map(c => `
                <option value="${c.code}" ${c.code === currentCurrency ? 'selected' : ''}>${c.label}</option>
              `).join('')}
            </select>
          </div>

          <!-- Order Tracking Link -->
          <button id="nav-track-order-btn" class="admin-link-btn" title="Track Existing Order">
            <span>📦</span> Track Order
          </button>

          <!-- Store Owner Admin Link -->
          <button id="nav-admin-portal-btn" class="admin-link-btn" title="Store Owner Portal">
            <span>⚙️</span> Store Admin
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="header-nav">
      <div class="container navbar-inner">
        <!-- Brand Logo -->
        <a href="#app-hero" class="brand-logo" title="D-Tech Computer System - Your Tech Partner">
          <img src="${config.logo || 'assets/images/d-tech-logo.jpg'}" alt="D-Tech Computer System Logo" class="brand-logo-img" />
          <div class="logo-text-group">
            <span class="brand-title">D-TECH</span>
            <span class="brand-subtitle">COMPUTER SYSTEM</span>
          </div>
        </a>

        <!-- Global Search Bar -->
        <div class="nav-search-bar">
          <div class="nav-search-inner">
            <span class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input 
              type="text" 
              id="global-search-input" 
              class="nav-search-input" 
              placeholder="Search laptops, batteries, screens, chargers, DDR5, SSD..."
              value="${store.searchQuery}"
              autocomplete="off"
            />
            <span class="search-badge-hint">ESC to clear</span>
          </div>
        </div>

        <!-- Right Action Buttons -->
        <div class="navbar-actions">
          <button id="nav-find-part-btn" class="nav-parts-finder-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            Find My Part
          </button>

          <!-- Shopping Cart Trigger -->
          <button id="open-cart-drawer-btn" class="nav-cart-btn" aria-label="Open Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart</span>
            <span id="nav-cart-badge" class="cart-counter-badge">${cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  `;

  // Attach Event Handlers
  const currencySel = container.querySelector('#currency-selector');
  if (currencySel) {
    currencySel.addEventListener('change', (e) => {
      store.setCurrency(e.target.value);
    });
  }

  const searchInput = container.querySelector('#global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      store.setSearchQuery(e.target.value);
      // Auto-scroll to catalog if not there
      const catSection = document.getElementById('app-catalog');
      if (catSection && window.scrollY < 200) {
        catSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        store.setSearchQuery('');
      }
    });
  }

  const findPartBtn = container.querySelector('#nav-find-part-btn');
  if (findPartBtn) {
    findPartBtn.addEventListener('click', () => {
      const finder = document.getElementById('app-finder');
      if (finder) {
        finder.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const trackBtn = container.querySelector('#nav-track-order-btn');
  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      const modal = document.getElementById('tracking-modal-overlay');
      if (modal) modal.classList.add('open');
    });
  }

  const adminBtn = container.querySelector('#nav-admin-portal-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      const modal = document.getElementById('admin-modal-overlay');
      if (modal) modal.classList.add('open');
    });
  }

  // Reactive Cart Badge Update
  store.subscribe((event, payload) => {
    if (event === 'CART_UPDATED') {
      const badge = container.querySelector('#nav-cart-badge');
      if (badge) {
        badge.textContent = store.getCartCount();
      }
    }
  });
}
