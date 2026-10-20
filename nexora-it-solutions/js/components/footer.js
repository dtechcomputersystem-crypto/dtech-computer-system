/**
 * Nexora Laptop & Parts - Reviews, FAQ & Footer Component
 */
import { store } from '../store.js';
import { customerReviews, faqList } from '../data/reviews.js';

export function renderFooter(container) {
  const config = store.config;

  container.innerHTML = `
    <!-- Customer Reviews Section -->
    <section class="reviews-section" id="customer-reviews">
      <div class="container">
        <div class="section-header-centered">
          <span class="section-eyebrow">Customer Trust</span>
          <h2 class="section-title">Verified Buyer & Technician Reviews</h2>
          <p class="section-desc">See why thousands of laptop owners, gamers, and repair technicians choose D-Tech Computer System.</p>
        </div>

        <div class="reviews-grid">
          ${customerReviews.map(rev => `
            <div class="review-card">
              <div class="review-author-row">
                <img src="${rev.avatar}" alt="${rev.author}" class="review-avatar" />
                <div>
                  <div class="review-author-name">${rev.author}</div>
                  <div class="review-author-role">${rev.role} • ${rev.date}</div>
                </div>
              </div>

              <div class="card-rating-row" style="margin-bottom: 0;">
                <span>★★★★★</span>
                <span class="review-product-pill">Purchased: ${rev.product}</span>
              </div>

              <p class="review-comment">
                "${rev.comment}"
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Technical FAQ Accordion Section -->
    <section class="faq-section" id="faq-section">
      <div class="container">
        <div class="section-header-centered">
          <span class="section-eyebrow">Got Questions?</span>
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-desc">Answers regarding laptop part compatibility, warranties, courier delivery, and WhatsApp ordering.</p>
        </div>

        <div class="faq-list">
          ${faqList.map((item, idx) => `
            <div class="faq-item ${idx === 0 ? 'open' : ''}">
              <button class="faq-question-btn">
                <span>${item.question}</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                ${item.answer}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Main Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand Info -->
          <div class="footer-brand-col">
            <a href="#app-hero" class="brand-logo" title="D-Tech Computer System - Your Tech Partner">
              <img src="${config.logo || 'assets/images/d-tech-logo.jpg'}" alt="D-Tech Computer System Logo" class="brand-logo-footer-img" />
              <div class="logo-text-group">
                <span class="brand-title">${config.name.toUpperCase()}</span>
                <span class="brand-subtitle">Your Tech Partner</span>
              </div>
            </a>
            <p class="footer-desc">
              Your trusted partner for brand new laptops, genuine OEM replacement batteries, high-refresh rate displays, GaN chargers, and high-speed NVMe storage upgrades.
            </p>
            <div style="font-size: 0.8125rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.45rem;">
              <span>📍 <strong>Location:</strong> ${config.address}, ${config.city}</span>
              <span>📞 <strong>Call / WhatsApp:</strong> <a href="https://wa.me/${config.whatsappNumber}" target="_blank" class="footer-link" style="color: var(--accent-cyan-light); font-weight: 700;">${config.phone}</a></span>
              <span>✉️ <strong>Email:</strong> <a href="mailto:${config.email}" class="footer-link" style="color: var(--accent-cyan-light); font-weight: 600;">${config.email}</a></span>
            </div>
          </div>

          <!-- Col 2: Categories -->
          <div>
            <h4 class="footer-col-title">Product Catalog</h4>
            <ul class="footer-links-list">
              <li><a href="#app-catalog" class="footer-link">Gaming Rigs & Laptops</a></li>
              <li><a href="#app-catalog" class="footer-link">OEM Laptop Batteries</a></li>
              <li><a href="#app-catalog" class="footer-link">LCD & 144Hz Screen Panels</a></li>
              <li><a href="#app-catalog" class="footer-link">100W GaN Fast Chargers</a></li>
              <li><a href="#app-catalog" class="footer-link">PCIe Gen4 NVMe SSDs</a></li>
              <li><a href="#app-catalog" class="footer-link">DDR4 / DDR5 SODIMM RAM</a></li>
            </ul>
          </div>

          <!-- Col 3: Customer Care -->
          <div>
            <h4 class="footer-col-title">Customer Care</h4>
            <ul class="footer-links-list">
              <li><a href="#app-finder" class="footer-link">Laptop Compatibility Checker</a></li>
              <li><a href="#app-catalog" class="footer-link">Special Offers & Deals</a></li>
              <li><a href="#faq-section" class="footer-link">Warranty & Returns Policy</a></li>
              <li><a href="#customer-reviews" class="footer-link">Verified Reviews</a></li>
              <li><a href="https://wa.me/${config.whatsappNumber}" target="_blank" class="footer-link">WhatsApp Direct Support</a></li>
            </ul>
          </div>

          <!-- Col 4: Operating Hours -->
          <div>
            <h4 class="footer-col-title">Operating Hours</h4>
            <ul class="footer-links-list" style="font-size: 0.8125rem;">
              <li><strong>Weekdays:</strong> ${config.hours.weekdays}</li>
              <li><strong>Saturday:</strong> ${config.hours.saturday}</li>
              <li><strong>Sunday:</strong> ${config.hours.sunday}</li>
              <li style="margin-top: 0.75rem; color: var(--accent-emerald);">
                ● WhatsApp Order Lines: <strong>Open 24/7</strong>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="footer-bottom-row">
          <span>&copy; ${new Date().getFullYear()} ${config.name}. All Rights Reserved. OEM part numbers used for reference only.</span>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Terms of Service</a>
            <a href="#" class="footer-link">Warranty Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Attach FAQ Accordion toggle
  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const wasOpen = parent.classList.contains('open');

      // Close all
      container.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));

      if (!wasOpen) {
        parent.classList.add('open');
      }
    });
  });
}
