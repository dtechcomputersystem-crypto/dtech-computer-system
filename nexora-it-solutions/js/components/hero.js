/**
 * Nexora Laptop & Parts - Hero Showcase Component
 */
import { store } from '../store.js';

export function renderHero(container) {
  const config = store.config;

  container.innerHTML = `
    <section class="hero-section" id="hero-banner">
      <div class="container hero-grid">
        <!-- Left Hero Content -->
        <div class="hero-content">
          <div class="hero-badge-pill">
            <span>✨</span> 
            <span>D-TECH COMPUTER SYSTEM • YOUR TECH PARTNER</span>
          </div>

          <h1 class="hero-title">
            Find the Perfect <span class="text-gradient-cyan">Laptop & Parts</span> with Guaranteed Compatibility.
          </h1>

          <p class="hero-description">
            Power your workflow with flagship gaming rigs, laptops, and genuine OEM laptop replacement parts from D-Tech Computer System — from high-capacity batteries and 144Hz displays to 100W GaN chargers and blazing-fast NVMe storage. Verified fit, full warranty, and direct WhatsApp order dispatch.
          </p>

          <div class="hero-actions-row">
            <a href="#app-catalog" class="btn-primary" id="hero-browse-btn">
              <span>Explore Products</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href="https://wa.me/${config.whatsappNumber}?text=Hi%20${encodeURIComponent(config.shortName)}%2C%20I%20would%20like%20to%20inquire%20about%20a%20laptop%20or%20part!" target="_blank" rel="noopener noreferrer" class="btn-wa-hero">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Instant WhatsApp Order</span>
            </a>

            <a href="#app-finder" class="btn-secondary">
              <span>Check Compatibility</span>
            </a>
          </div>

          <!-- Trust Bar -->
          <div class="hero-trust-bar">
            <div class="trust-item">
              <div class="trust-icon-box">⚡</div>
              <div class="trust-text-group">
                <span class="trust-title">Fast Shipping</span>
                <span class="trust-sub">Same-Day Dispatch</span>
              </div>
            </div>

            <div class="trust-item">
              <div class="trust-icon-box">🛡️</div>
              <div class="trust-text-group">
                <span class="trust-title">1-Year Warranty</span>
                <span class="trust-sub">100% Tested Parts</span>
              </div>
            </div>

            <div class="trust-item">
              <div class="trust-icon-box">🔧</div>
              <div class="trust-text-group">
                <span class="trust-title">Expert Fit</span>
                <span class="trust-sub">Model Verification</span>
              </div>
            </div>

            <div class="trust-item">
              <div class="trust-icon-box">⭐</div>
              <div class="trust-text-group">
                <span class="trust-title">4.9 / 5.0 Stars</span>
                <span class="trust-sub">5,000+ Customers</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Visual Banner Card -->
        <div class="hero-visual-card">
          <img src="assets/images/hero-laptops.jpg" alt="Nexora High-Performance Laptops and Hardware Parts Showcase" class="hero-main-img" loading="eager" />
          <div class="hero-floating-stat">
            <div class="floating-stat-item">
              <span class="floating-stat-val">500+</span>
              <span class="floating-stat-lbl">Parts In Stock</span>
            </div>
            <div class="floating-stat-item">
              <span class="floating-stat-val">100%</span>
              <span class="floating-stat-lbl">OEM Tested</span>
            </div>
            <div class="floating-stat-item">
              <span class="floating-stat-val">24/7</span>
              <span class="floating-stat-lbl">WhatsApp Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
