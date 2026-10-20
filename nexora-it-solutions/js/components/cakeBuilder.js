/**
 * Interactive Custom Cake Builder & Price Calculator
 */
import { SHOP_CONFIG } from '../data/config.js';
import { store } from '../store.js';

export const CAKE_BUILDER_OPTIONS = {
  occasions: [
    { id: "Birthday", label: "Birthday Milestone", icon: "🎂" },
    { id: "Wedding", label: "Fairytale Wedding", icon: "💍" },
    { id: "Anniversary", label: "Anniversary Celebration", icon: "🥂" },
    { id: "Baby Shower", label: "Baby Shower / Gender Reveal", icon: "👶" },
    { id: "Corporate", label: "Corporate Event / Brand Launch", icon: "🏢" },
    { id: "Celebration", label: "Other Special Celebration", icon: "✨" }
  ],
  sizes: [
    { id: "bento-4", label: "4\" Bento Cake", servings: "2-3 portions", basePrice: 38, tiers: 1 },
    { id: "tall-6", label: "6\" Tall (4 Layers)", servings: "12-16 portions", basePrice: 85, tiers: 1 },
    { id: "medium-8", label: "8\" Classic Celebration", servings: "20-25 portions", basePrice: 115, tiers: 1 },
    { id: "two-tier", label: "2-Tier Grand Celebration", servings: "35-40 portions", basePrice: 220, tiers: 2 },
    { id: "three-tier", label: "3-Tier Luxury Wedding", servings: "70-80 portions", basePrice: 385, tiers: 3 }
  ],
  flavors: [
    { id: "vanilla-berry", name: "Madagascar Vanilla Bean & Berry", desc: "Light sponge with real vanilla pods", priceDiff: 0 },
    { id: "belgian-chocolate", name: "Belgian Noir Chocolate Fudge", desc: "Rich 70% Callebaut dark cocoa", priceDiff: 5 },
    { id: "red-velvet", name: "Signature Red Velvet", desc: "Velvety cocoa crumb with hint of vanilla", priceDiff: 5 },
    { id: "salted-caramel", name: "Salted Butter Caramel Pecan", desc: "Brown butter sponge with toasted pecans", priceDiff: 8 },
    { id: "lemon-raspberry", name: "Lemon Zest & Raspberry Swirl", desc: "Zesty lemon infused with fruit coulis", priceDiff: 5 },
    { id: "pistachio-rose", name: "Sicilian Pistachio & Rosewater", desc: "Gourmet nutty sponge with floral notes", priceDiff: 10 }
  ],
  fillings: [
    { id: "swiss-buttercream", name: "Silky Swiss Meringue", priceDiff: 0 },
    { id: "white-ganache", name: "Whipped White Chocolate Ganache", priceDiff: 5 },
    { id: "dark-ganache", name: "Dark Chocolate Truffle Ganache", priceDiff: 5 },
    { id: "berry-coulis", name: "Fresh Raspberry & Berry Coulis", priceDiff: 6 },
    { id: "cream-cheese", name: "Madagascar Vanilla Cream Cheese", priceDiff: 4 }
  ],
  styles: [
    { id: "semi-naked", name: "Rustic Semi-Naked Crumb", desc: "Natural organic bakery aesthetic", priceDiff: 0 },
    { id: "floral-gold", name: "Fresh Botanicals & 24K Gold Leaf", desc: "Hand-placed fresh blooms & gold foil", priceDiff: 25 },
    { id: "drip-cake", name: "Modern Pastel Drip & Macarons", desc: "Belgian drip, macarons & berries", priceDiff: 20 },
    { id: "lambeth-vintage", name: "Victorian Lambeth Piped Ruffles", desc: "Intricate vintage royal piping", priceDiff: 22 },
    { id: "sculpted-minimal", name: "Sleek Concrete Stone & Stencil", desc: "Architectural modern edge finish", priceDiff: 18 }
  ],
  dietary: [
    { id: "standard", name: "Traditional Artisanal Recipe", desc: "Finest organic dairy & farm eggs", priceDiff: 0 },
    { id: "eggless", name: "100% Pure Eggless", desc: "Same fluffy texture, completely egg-free", priceDiff: 5 },
    { id: "gluten-free", name: "Gluten-Free Friendly", desc: "Made with almond & rice flour", priceDiff: 10 },
    { id: "vegan", name: "Plant-Based / Vegan", desc: "Dairy-free & egg-free organic ingredients", priceDiff: 8 }
  ]
};

export function renderCakeBuilder(container) {
  const current = store.getCustomCake();

  function calculatePrice() {
    const size = CAKE_BUILDER_OPTIONS.sizes.find(s => s.id === current.sizeId) || CAKE_BUILDER_OPTIONS.sizes[2];
    const flavor = CAKE_BUILDER_OPTIONS.flavors.find(f => f.id === current.flavorId) || CAKE_BUILDER_OPTIONS.flavors[0];
    const filling = CAKE_BUILDER_OPTIONS.fillings.find(f => f.id === current.fillingId) || CAKE_BUILDER_OPTIONS.fillings[0];
    const style = CAKE_BUILDER_OPTIONS.styles.find(s => s.id === current.styleId) || CAKE_BUILDER_OPTIONS.styles[1];
    const diet = CAKE_BUILDER_OPTIONS.dietary.find(d => d.id === current.dietaryId) || CAKE_BUILDER_OPTIONS.dietary[0];

    const total = size.basePrice + flavor.priceDiff + filling.priceDiff + style.priceDiff + diet.priceDiff;
    return {
      size,
      flavor,
      filling,
      style,
      diet,
      total
    };
  }

  function getVisualStackHtml(tiers) {
    if (tiers === 3) {
      return `
        <div class="stack-tier tier-top">Top Tier (6")</div>
        <div class="stack-tier tier-mid">Middle Tier (8")</div>
        <div class="stack-tier tier-base">Base Tier (10")</div>
      `;
    } else if (tiers === 2) {
      return `
        <div class="stack-tier tier-mid">Top Tier (6")</div>
        <div class="stack-tier tier-base">Base Tier (8")</div>
      `;
    } else {
      return `
        <div class="stack-tier tier-base" style="width: 140px; height: 42px;">Single Tier Celebration</div>
      `;
    }
  }

  function render() {
    const calc = calculatePrice();

    container.innerHTML = `
      <section class="builder-section" id="builder">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">Interactive Studio</span>
            <h2 class="section-title">Design Your Custom Celebration Cake</h2>
            <p class="section-subtitle">
              Configure every layer to match your event theme, dietary needs, and guest count. Receive an instant price quote and submit your order directly via WhatsApp or online checkout!
            </p>
          </div>

          <div class="builder-layout">
            <!-- Builder Steps -->
            <div class="builder-steps-container">
              <!-- Step 1: Occasion -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">1</span>
                  <h3 class="step-title">What is the occasion?</h3>
                </div>
                <div class="options-pill-grid">
                  ${CAKE_BUILDER_OPTIONS.occasions.map(occ => `
                    <div class="option-box ${current.occasion === occ.id ? 'selected' : ''}" data-step="occasion" data-value="${occ.id}">
                      <div class="option-icon">${occ.icon}</div>
                      <span class="option-name">${occ.label}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 2: Size & Servings -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">2</span>
                  <h3 class="step-title">Cake Size & Servings</h3>
                </div>
                <div class="options-pill-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
                  ${CAKE_BUILDER_OPTIONS.sizes.map(size => `
                    <div class="option-box ${current.sizeId === size.id ? 'selected' : ''}" data-step="sizeId" data-value="${size.id}">
                      <span class="option-name">${size.label}</span>
                      <span class="option-sub">${size.servings}</span>
                      <div class="option-price-diff">${SHOP_CONFIG.currencySymbol}${size.basePrice} Base</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 3: Sponge Flavor -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">3</span>
                  <h3 class="step-title">Base Sponge Flavor</h3>
                </div>
                <div class="options-pill-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
                  ${CAKE_BUILDER_OPTIONS.flavors.map(flv => `
                    <div class="option-box ${current.flavorId === flv.id ? 'selected' : ''}" data-step="flavorId" data-value="${flv.id}">
                      <span class="option-name">${flv.name}</span>
                      <span class="option-sub">${flv.desc}</span>
                      ${flv.priceDiff > 0 ? `<div class="option-price-diff">+${SHOP_CONFIG.currencySymbol}${flv.priceDiff}</div>` : '<div class="option-price-diff">Included</div>'}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 4: Filling & Ganache -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">4</span>
                  <h3 class="step-title">Filling & Inner Ganache</h3>
                </div>
                <div class="options-pill-grid" style="grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));">
                  ${CAKE_BUILDER_OPTIONS.fillings.map(fil => `
                    <div class="option-box ${current.fillingId === fil.id ? 'selected' : ''}" data-step="fillingId" data-value="${fil.id}">
                      <span class="option-name">${fil.name}</span>
                      ${fil.priceDiff > 0 ? `<div class="option-price-diff">+${SHOP_CONFIG.currencySymbol}${fil.priceDiff}</div>` : '<div class="option-price-diff">Included</div>'}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 5: Exterior Style -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">5</span>
                  <h3 class="step-title">Exterior Design & Finish</h3>
                </div>
                <div class="options-pill-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
                  ${CAKE_BUILDER_OPTIONS.styles.map(sty => `
                    <div class="option-box ${current.styleId === sty.id ? 'selected' : ''}" data-step="styleId" data-value="${sty.id}">
                      <span class="option-name">${sty.name}</span>
                      <span class="option-sub">${sty.desc}</span>
                      ${sty.priceDiff > 0 ? `<div class="option-price-diff">+${SHOP_CONFIG.currencySymbol}${sty.priceDiff}</div>` : '<div class="option-price-diff">Included</div>'}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 6: Dietary Preference -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">6</span>
                  <h3 class="step-title">Dietary Requirements</h3>
                </div>
                <div class="options-pill-grid">
                  ${CAKE_BUILDER_OPTIONS.dietary.map(diet => `
                    <div class="option-box ${current.dietaryId === diet.id ? 'selected' : ''}" data-step="dietaryId" data-value="${diet.id}">
                      <span class="option-name">${diet.name}</span>
                      <span class="option-sub">${diet.desc}</span>
                      ${diet.priceDiff > 0 ? `<div class="option-price-diff">+${SHOP_CONFIG.currencySymbol}${diet.priceDiff}</div>` : '<div class="option-price-diff">Included</div>'}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 7: Event Details & Custom Message -->
              <div class="step-card">
                <div class="step-header">
                  <span class="step-number">7</span>
                  <h3 class="step-title">Date & Custom Inscription</h3>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div>
                    <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:6px;">Event Date (Min 3-day notice):</label>
                    <input type="date" id="builder-event-date" value="${current.eventDate}" style="width:100%; padding:10px 14px; border:1px solid var(--color-border); border-radius:var(--radius-sm); font-size:0.9rem;" />
                  </div>
                  <div>
                    <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:6px;">Fulfillment Preference:</label>
                    <select id="builder-delivery-opt" style="width:100%; padding:10px 14px; border:1px solid var(--color-border); border-radius:var(--radius-sm); font-size:0.9rem;">
                      <option value="pickup" ${current.deliveryOption === 'pickup' ? 'selected' : ''}>Studio Pickup (Free)</option>
                      <option value="delivery" ${current.deliveryOption === 'delivery' ? 'selected' : ''}>Hand-Delivery to Venue (+${SHOP_CONFIG.currencySymbol}${SHOP_CONFIG.defaultDeliveryFee})</option>
                    </select>
                  </div>
                </div>

                <div style="margin-top: 16px;">
                  <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:6px;">Custom Message on Cake or Board:</label>
                  <input type="text" id="builder-inscription" value="${current.inscription}" placeholder="e.g. Happy 30th Birthday Rachel!" style="width:100%; padding:10px 14px; border:1px solid var(--color-border); border-radius:var(--radius-sm); font-size:0.9rem;" />
                </div>
              </div>
            </div>

            <!-- Receipt & Preview Panel -->
            <div class="builder-receipt-panel">
              <div class="receipt-header">
                <h3 class="receipt-title">Your Bespoke Creation</h3>
                <span class="receipt-tag">${current.occasion} Centerpiece</span>
              </div>

              <!-- Visual Tier Stack -->
              <div class="cake-visual-stack">
                ${getVisualStackHtml(calc.size.tiers)}
              </div>

              <!-- Itemized Lines -->
              <ul class="receipt-lines">
                <li class="receipt-line">
                  <span class="receipt-label">Occasion:</span>
                  <span class="receipt-value">${current.occasion}</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Size & Servings:</span>
                  <span class="receipt-value">${calc.size.label} (${calc.size.servings})</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Sponge:</span>
                  <span class="receipt-value">${calc.flavor.name}</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Filling:</span>
                  <span class="receipt-value">${calc.filling.name}</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Style:</span>
                  <span class="receipt-value">${calc.style.name}</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Dietary:</span>
                  <span class="receipt-value">${calc.diet.name}</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Target Date:</span>
                  <span class="receipt-value">${current.eventDate}</span>
                </li>
                <li class="receipt-line">
                  <span class="receipt-label">Inscription:</span>
                  <span class="receipt-value" style="font-style:italic;">"${current.inscription || 'None'}"</span>
                </li>
              </ul>

              <!-- Total Box -->
              <div class="receipt-total-box">
                <span class="total-title">Estimated Total:</span>
                <span class="total-price">${SHOP_CONFIG.currencySymbol}${calc.total}</span>
              </div>

              <!-- Action Buttons -->
              <div class="builder-actions">
                <button class="btn btn-whatsapp" id="builder-whatsapp-btn" style="width: 100%;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                </button>

                <button class="btn btn-primary" id="builder-add-cart-btn" style="width: 100%;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  <span>Add Custom Cake to Bag</span>
                </button>
              </div>

              <p style="font-size:0.75rem; color:var(--color-text-muted); text-align:center; margin-top:14px;">
                🔒 No immediate charge. You can chat with our head baker to confirm final artistic touches.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;

    bindEvents(calc);
  }

  function bindEvents(calc) {
    // Option clicks
    container.querySelectorAll('.option-box').forEach(box => {
      box.addEventListener('click', () => {
        const step = box.getAttribute('data-step');
        const value = box.getAttribute('data-value');
        store.updateCustomCake({ [step]: value });
        render();
      });
    });

    // Inputs
    const dateInput = container.querySelector('#builder-event-date');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        store.updateCustomCake({ eventDate: e.target.value });
      });
    }

    const delivSelect = container.querySelector('#builder-delivery-opt');
    if (delivSelect) {
      delivSelect.addEventListener('change', (e) => {
        store.updateCustomCake({ deliveryOption: e.target.value });
      });
    }

    const inscInput = container.querySelector('#builder-inscription');
    if (inscInput) {
      inscInput.addEventListener('input', (e) => {
        store.updateCustomCake({ inscription: e.target.value });
        const valElem = container.querySelector('.receipt-line:nth-child(8) .receipt-value');
        if (valElem) valElem.textContent = `"${e.target.value || 'None'}"`;
      });
    }

    // Add to Cart button
    const addCartBtn = container.querySelector('#builder-add-cart-btn');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const item = {
          id: `custom-cake-${Date.now()}`,
          name: `Custom ${current.occasion} Cake (${calc.size.label})`,
          price: calc.total,
          image: calc.size.tiers === 3 ? "assets/images/wedding-cake.jpg" : "assets/images/birthday-cake.jpg",
          servings: calc.size.servings,
          eventDate: current.eventDate,
          customization: {
            occasion: current.occasion,
            size: calc.size.label,
            flavor: calc.flavor.name,
            filling: calc.filling.name,
            style: calc.style.name,
            dietary: calc.diet.name,
            inscription: current.inscription,
            deliveryOption: current.deliveryOption
          }
        };

        store.addToCart(item);

        // Notify user
        if (window.showToast) {
          window.showToast(`🍰 Added Custom ${current.occasion} Cake to your bag!`);
        }

        // Open cart drawer
        const cartDrawer = document.getElementById('cart-drawer-overlay');
        if (cartDrawer) cartDrawer.classList.add('open');
      });
    }

    // WhatsApp Order button
    const waBtn = container.querySelector('#builder-whatsapp-btn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const summary = {
          isCustomBuilder: true,
          occasion: current.occasion,
          sizeLabel: `${calc.size.label} (${calc.size.servings})`,
          flavorLabel: calc.flavor.name,
          fillingLabel: calc.filling.name,
          frostingLabel: calc.style.name,
          styleLabel: calc.style.name,
          dietaryLabel: calc.diet.name,
          inscription: current.inscription,
          eventDate: current.eventDate,
          deliveryType: current.deliveryOption,
          totalAmount: calc.total
        };

        const waUrl = store.generateWhatsAppUrl(summary);
        window.open(waUrl, '_blank');
      });
    }
  }

  render();
}
