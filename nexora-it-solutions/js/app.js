/**
 * Nexora Laptop & Parts - Main Application Orchestrator
 */
import { renderNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderPartsFinder } from './components/partsFinder.js';
import { renderProductCatalog } from './components/productCatalog.js';
import { renderProductModal } from './components/productModal.js';
import { renderCartDrawer } from './components/cartDrawer.js';
import { renderCheckoutModal } from './components/checkoutModal.js';
import { renderOrderTrackingModal } from './components/orderTrackingModal.js';
import { renderAdminDashboard } from './components/adminDashboard.js';
import { renderFooter } from './components/footer.js';
import { store } from './store.js';

// Global Cyber Toast Notification System
window.showToast = function(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-cyan);">⚡</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

document.addEventListener('DOMContentLoaded', () => {
  // Mount components into DOM containers
  const navMount = document.getElementById('app-navbar');
  const heroMount = document.getElementById('app-hero');
  const finderMount = document.getElementById('app-finder');
  const catalogMount = document.getElementById('app-catalog');
  const productModalMount = document.getElementById('app-product-modal');
  const cartDrawerMount = document.getElementById('app-cart-drawer');
  const checkoutModalMount = document.getElementById('app-checkout-modal');
  const trackingModalMount = document.getElementById('app-tracking-modal');
  const adminModalMount = document.getElementById('app-admin-modal');
  const footerMount = document.getElementById('app-footer');

  if (navMount) renderNavbar(navMount);
  if (heroMount) renderHero(heroMount);
  if (finderMount) renderPartsFinder(finderMount);
  if (catalogMount) renderProductCatalog(catalogMount);
  if (productModalMount) renderProductModal(productModalMount);
  if (cartDrawerMount) renderCartDrawer(cartDrawerMount);
  if (checkoutModalMount) renderCheckoutModal(checkoutModalMount);
  if (trackingModalMount) renderOrderTrackingModal(trackingModalMount);
  if (adminModalMount) renderAdminDashboard(adminModalMount);
  if (footerMount) renderFooter(footerMount);

  // Global Cart Open Trigger (From navbar or other places)
  document.addEventListener('click', (e) => {
    if (e.target.closest('#open-cart-drawer-btn')) {
      const drawer = document.getElementById('cart-drawer-overlay');
      if (drawer) drawer.classList.add('open');
    }
  });

  // Floating WhatsApp Quick Action Button
  const waNumber = store.config.whatsappNumber;
  const floatingWa = document.createElement('a');
  floatingWa.href = `https://wa.me/${waNumber}?text=Hi%20${encodeURIComponent(store.config.shortName)}%2C%20I'm%20inquiring%20about%20a%20laptop%20or%20part!`;
  floatingWa.target = "_blank";
  floatingWa.rel = "noopener noreferrer";
  floatingWa.className = "floating-wa-btn";
  floatingWa.title = "Chat with Laptop Specialist on WhatsApp";
  floatingWa.setAttribute('aria-label', 'Contact on WhatsApp');
  floatingWa.innerHTML = `
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  `;
  document.body.appendChild(floatingWa);
});
