/**
 * Portion & Cake Sizing Guide Component
 */
export function renderFlavorGuide(container) {
  container.innerHTML = `
    <section class="guide-section" id="guide">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">Portion & Sizing Guide</span>
          <h2 class="section-title">How Much Cake Do You Need?</h2>
          <p class="section-subtitle">
            Not sure what size to order for your celebration? Use our portion guide below. All our tall cakes feature 4 delicate sponge layers providing generous party servings!
          </p>
        </div>

        <div class="portion-grid">
          <!-- Bento -->
          <div class="portion-card">
            <div class="portion-illustration">🍱</div>
            <h3 class="portion-title">4" Bento Lunchbox</h3>
            <div class="portion-servings">2 – 3 Servings</div>
            <p class="portion-desc">
              Adorable personal celebration cake. Ideal for anniversaries, Valentine's, picnic treats, or an intimate birthday surprise.
            </p>
          </div>

          <!-- 6" Tall -->
          <div class="portion-card">
            <div class="portion-illustration">🎂</div>
            <h3 class="portion-title">6" Tall (4 Layers)</h3>
            <div class="portion-servings">12 – 16 Servings</div>
            <p class="portion-desc">
              Our most popular birthday size! Standing 7 inches tall, this provides 14-16 generous party slices for family and close friends.
            </p>
          </div>

          <!-- 8" Classic -->
          <div class="portion-card">
            <div class="portion-illustration">🎈</div>
            <h3 class="portion-title">8" Classic Round</h3>
            <div class="portion-servings">20 – 25 Servings</div>
            <p class="portion-desc">
              Generous centerpiece for larger celebrations, milestone 21st, 30th, 50th birthdays, and bridal shower dessert buffets.
            </p>
          </div>

          <!-- 2-Tier -->
          <div class="portion-card">
            <div class="portion-illustration">✨</div>
            <h3 class="portion-title">2-Tier Grand (6" + 8")</h3>
            <div class="portion-servings">35 – 40 Servings</div>
            <p class="portion-desc">
              Stunning multi-level presentation for micro-weddings, engagement dinners, and milestone corporate cocktail parties.
            </p>
          </div>

          <!-- 3-Tier -->
          <div class="portion-card">
            <div class="portion-illustration">💍</div>
            <h3 class="portion-title">3-Tier Luxury Wedding</h3>
            <div class="portion-servings">70 – 80 Servings</div>
            <p class="portion-desc">
              Grand banquet centerpiece (6" + 8" + 10") with custom dowels, wedding flower styling, and direct reception delivery.
            </p>
          </div>
        </div>

        <!-- Baker Pro-Tip Card -->
        <div style="margin-top: 40px; background: #FFFFFF; border: 1.5px dashed var(--color-gold); border-radius: var(--radius-md); padding: 26px 32px; display: flex; align-items: center; gap: 24px;">
          <div style="font-size: 2.2rem;">💡</div>
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-text-main); margin-bottom: 4px;">
              Baker's Pro-Tip for Cutting Tall Cakes
            </h4>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6;">
              Rather than traditional wedge triangles, cut tall 4-layer cakes by slicing straight across in 1-inch thick horizontal slabs, then dividing each slab into rectangular finger portions. This yields up to 40% more clean, pristine slices for your guests!
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
