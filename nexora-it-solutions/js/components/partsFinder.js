/**
 * Nexora Laptop & Parts - Interactive Compatibility & Parts Matcher Component
 */
import { store } from '../store.js';

export function renderPartsFinder(container) {
  const brands = ["Dell", "HP", "Lenovo", "ASUS", "Acer", "Apple", "Samsung", "MSI", "Toshiba"];
  const partTypes = [
    { id: "battery", label: "OEM Laptop Battery" },
    { id: "screen", label: "LCD / IPS Replacement Screen" },
    { id: "charger", label: "Power Adapter & Charger" },
    { id: "ram", label: "RAM Memory Upgrade (DDR4 / DDR5)" },
    { id: "ssd", label: "M.2 NVMe SSD Storage" },
    { id: "keyboard", label: "Replacement Keyboard" },
    { id: "stand", label: "Laptop Stand & Cooling Pad" },
    { id: "dock", label: "USB-C / Thunderbolt Dock" }
  ];

  container.innerHTML = `
    <section class="parts-finder-section" id="app-finder">
      <div class="container">
        <div class="section-header-centered">
          <span class="section-eyebrow">Compatibility Engine</span>
          <h2 class="section-title">Find the Exact Part for Your Laptop</h2>
          <p class="section-desc">Select your laptop brand and the component you need. We'll instantly match 100% verified compatible parts.</p>
        </div>

        <div class="finder-box-card">
          <form id="parts-finder-form" class="finder-steps-grid">
            <!-- Step 1: Laptop Brand -->
            <div class="finder-field-group">
              <label for="finder-brand-select" class="finder-label">
                <span>1. Select Laptop Brand</span>
              </label>
              <select id="finder-brand-select" class="finder-select" required>
                <option value="">-- Choose Brand --</option>
                ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
              </select>
            </div>

            <!-- Step 2: Part Needed -->
            <div class="finder-field-group">
              <label for="finder-part-select" class="finder-label">
                <span>2. Component Needed</span>
              </label>
              <select id="finder-part-select" class="finder-select" required>
                <option value="">-- Choose Component --</option>
                ${partTypes.map(p => `<option value="${p.id}">${p.label}</option>`).join('')}
              </select>
            </div>

            <!-- Step 3: Exact Model Number -->
            <div class="finder-field-group">
              <label for="finder-model-input" class="finder-label">
                <span>3. Laptop Model / Serial</span>
              </label>
              <input 
                type="text" 
                id="finder-model-input" 
                class="finder-input" 
                placeholder="e.g. Dell XPS 15 9570, Nitro 5 AN515..." 
              />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="finder-submit-btn" id="finder-search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Match Parts</span>
            </button>
          </form>

          <!-- Real-Time Results or WhatsApp Quote Helper -->
          <div id="finder-results-box" class="finder-results-box">
            <div id="finder-status-msg" class="finder-match-count"></div>
            
            <div class="finder-quote-helper">
              <div class="quote-helper-text">
                <strong>Need a rare part or want to verify model compatibility?</strong><br>
                Send your laptop model or part sticker photo directly to our technician on WhatsApp for an instant quote!
              </div>
              <a href="#" id="finder-direct-wa-btn" target="_blank" rel="noopener noreferrer" class="quote-helper-wa-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Request Custom Part Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach finder logic
  const form = container.querySelector('#parts-finder-form');
  const brandSelect = container.querySelector('#finder-brand-select');
  const partSelect = container.querySelector('#finder-part-select');
  const modelInput = container.querySelector('#finder-model-input');
  const resultsBox = container.querySelector('#finder-results-box');
  const statusMsg = container.querySelector('#finder-status-msg');
  const directWaBtn = container.querySelector('#finder-direct-wa-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const brand = brandSelect.value;
    const partType = partSelect.value;
    const model = modelInput.value.trim();

    // Set filter on store
    if (brand) store.setBrand(brand);
    if (model) store.setSearchQuery(model);
    else if (brand) store.setSearchQuery(brand);

    // Update WhatsApp direct quote URL
    const waUrl = store.buildWhatsAppPartsInquiryUrl(brand || 'Universal', partType || 'Any Part', model, 'Model compatibility check requested');
    directWaBtn.href = waUrl;

    const filtered = store.getFilteredProducts();
    resultsBox.classList.add('active');
    statusMsg.innerHTML = `Found <strong>${filtered.length}</strong> matching item(s) for <em>${brand} ${model ? model : ''}</em>. Scroll down to review or send an inquiry below!`;

    // Scroll to catalog smoothly
    const catalog = document.getElementById('app-catalog');
    if (catalog) {
      setTimeout(() => {
        catalog.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  });
}
