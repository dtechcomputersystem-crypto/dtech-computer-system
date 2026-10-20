/**
 * Nexora Laptop & Parts - Product Catalog Component
 */
import { store } from '../store.js';
import { getCategories, getPopularBrands } from '../data/products.js';

export function renderProductCatalog(container) {
  function updateUI() {
    const products = store.getFilteredProducts();
    const categories = getCategories();
    const brands = getPopularBrands();
    const activeCat = store.activeCategory;
    const activeBrand = store.activeBrand;
    const sortBy = store.sortBy;
    const inStockOnly = store.inStockOnly;

    container.innerHTML = `
      <section class="catalog-section" id="catalog-showcase">
        <div class="container">
          <!-- Section Title -->
          <div class="section-header-centered">
            <span class="section-eyebrow">Verified Inventory</span>
            <h2 class="section-title">Hardware Catalog & Genuine Parts</h2>
            <p class="section-desc">Select from brand new laptops or direct-fit replacement parts with comprehensive warranties.</p>
          </div>

          <!-- Controls Container -->
          <div class="catalog-controls-container">
            <!-- Category Tabs Row -->
            <div class="category-tabs-row">
              ${categories.map(cat => `
                <button class="category-tab-btn ${cat.id === activeCat ? 'active' : ''}" data-cat="${cat.id}">
                  <span>${cat.icon}</span>
                  <span>${cat.label}</span>
                </button>
              `).join('')}
            </div>

            <!-- Sub Filters: Brand Chips, Sort, In-Stock -->
            <div class="filter-sub-bar">
              <div class="filter-brand-group">
                <span class="filter-label-small">Brand:</span>
                ${brands.map(b => `
                  <button class="brand-chip ${b === activeBrand ? 'active' : ''}" data-brand="${b}">
                    ${b}
                  </button>
                `).join('')}
              </div>

              <div class="filter-secondary-group">
                <!-- Sort Select -->
                <select id="catalog-sort-select" class="sort-select" title="Sort Products">
                  <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Sort: Featured</option>
                  <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Top Customer Rated</option>
                </select>

                <!-- In-Stock Toggle -->
                <label class="stock-toggle-label">
                  <input type="checkbox" id="catalog-stock-toggle" class="stock-checkbox" ${inStockOnly ? 'checked' : ''} />
                  <span>In-Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="product-grid" id="products-container">
            ${products.length === 0 ? `
              <div class="empty-catalog">
                <div class="empty-icon">🔍</div>
                <h3>No Products Found</h3>
                <p>We couldn't find items matching your search criteria. Try adjusting the filters or request a custom part quote.</p>
                <button id="reset-filters-btn" class="btn-primary" style="margin-top: 1rem;">Reset All Filters</button>
              </div>
            ` : products.map(product => {
              const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
              const formattedPrice = store.formatPrice(product.price);
              const formattedOriginal = product.originalPrice ? store.formatPrice(product.originalPrice) : null;

              return `
                <div class="product-card" data-id="${product.id}">
                  <!-- Card Media -->
                  <div class="card-media" data-action="quickview" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" />
                    ${product.badge ? `<span class="card-badge ${product.badgeColor || 'badge-cyan'}">${product.badge}</span>` : ''}
                    <span class="card-category-tag">${product.categoryLabel}</span>
                  </div>

                  <!-- Card Body -->
                  <div class="card-body">
                    <div class="card-sku-row">
                      <span class="card-sku">${product.sku}</span>
                      <span class="card-stock-status stock-in">
                        <span class="stock-dot"></span>
                        <span>${product.inStock ? 'In Stock' : 'Pre-Order'}</span>
                      </span>
                    </div>

                    <h3 class="card-title" data-action="quickview" data-id="${product.id}" title="${product.name}">
                      ${product.name}
                    </h3>

                    <div class="card-rating-row">
                      <span>★ ${product.rating.toFixed(1)}</span>
                      <span class="reviews-count">(${product.reviewsCount} reviews)</span>
                    </div>

                    <p class="card-desc">
                      ${product.shortDesc}
                    </p>

                    <!-- Price Row -->
                    <div class="card-price-row">
                      <span class="card-current-price">${formattedPrice}</span>
                      ${formattedOriginal ? `<span class="card-original-price">${formattedOriginal}</span>` : ''}
                      ${discountPercent > 0 ? `<span class="card-discount-pill">-${discountPercent}%</span>` : ''}
                    </div>

                    <!-- Action Buttons -->
                    <div class="card-actions-row">
                      <button class="btn-add-cart" data-action="add-cart" data-id="${product.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <span>Add to Cart</span>
                      </button>

                      <a href="${store.buildWhatsAppDirectProductUrl(product)}" target="_blank" rel="noopener noreferrer" class="btn-card-wa" title="Order / Inquire via WhatsApp">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      </a>

                      <button class="btn-view-quick" data-action="quickview" data-id="${product.id}">
                        View Full Specs & Compatibility →
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;

    // Bind Category Tab Buttons
    container.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setCategory(btn.dataset.cat);
      });
    });

    // Bind Brand Filter Chips
    container.querySelectorAll('.brand-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setBrand(btn.dataset.brand);
      });
    });

    // Bind Sort Dropdown
    const sortSel = container.querySelector('#catalog-sort-select');
    if (sortSel) {
      sortSel.addEventListener('change', (e) => {
        store.setSortBy(e.target.value);
      });
    }

    // Bind In Stock Toggle
    const stockTgl = container.querySelector('#catalog-stock-toggle');
    if (stockTgl) {
      stockTgl.addEventListener('change', (e) => {
        store.setInStockOnly(e.target.checked);
      });
    }

    // Bind Reset Filters Button
    const resetBtn = container.querySelector('#reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.setCategory('all');
        store.setBrand('All Brands');
        store.setSearchQuery('');
        store.setInStockOnly(false);
      });
    }

    // Bind Product Card Actions
    container.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prod = store.getAllProducts().find(p => p.id === btn.dataset.id);
        if (prod) {
          store.addToCart(prod, 1);
        }
      });
    });

    container.querySelectorAll('[data-action="quickview"]').forEach(el => {
      el.addEventListener('click', () => {
        const prod = store.getAllProducts().find(p => p.id === el.dataset.id);
        if (prod) {
          store.setSelectedProduct(prod);
        }
      });
    });
  }

  // Initial render
  updateUI();

  // Subscribe to state updates
  store.subscribe((event) => {
    if (['FILTER_CHANGED', 'PRODUCTS_UPDATED', 'CURRENCY_CHANGED'].includes(event)) {
      updateUI();
    }
  });
}
