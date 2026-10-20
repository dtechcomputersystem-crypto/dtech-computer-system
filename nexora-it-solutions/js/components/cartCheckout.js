// Nexora IT Solutions - Cart Drawer, Multi-Step Checkout & Invoice Generator
import { store } from '../store.js';
import { toast } from './toast.js';

let activePaymentMethod = 'po'; // 'po', 'card', 'wire'

// Slide-out Cart Drawer
export function renderCartDrawer() {
  const drawerMount = document.getElementById('cart-drawer-mount');
  if (!drawerMount) return;

  const cart = store.cart;
  const totals = store.getCartTotals();

  drawerMount.innerHTML = `
    <div id="cart-drawer-overlay" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity" onclick="window.closeCartDrawer()"></div>
    <div id="cart-drawer-panel" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 translate-x-full">
      <!-- Header -->
      <div class="p-5 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <h3 class="text-base font-bold text-white">Your IT Procurement Cart</h3>
          <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold">${totals.itemCount} items</span>
        </div>
        <button onclick="window.closeCartDrawer()" class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Items List -->
      <div class="p-5 flex-1 overflow-y-auto divide-y divide-slate-800">
        ${cart.length === 0 ? `
          <div class="text-center py-16">
            <svg class="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <h4 class="text-sm font-bold text-white">Your cart is currently empty</h4>
            <p class="text-xs text-slate-400 mt-1">Browse our servers, switches, or software licenses to get started.</p>
            <button onclick="window.closeCartDrawer(); store.setView('products');" class="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">
              Explore Hardware & Software
            </button>
          </div>
        ` : `
          ${cart.map(item => `
            <div class="py-4 flex gap-3 items-center">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 flex-shrink-0">
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-bold text-white truncate" title="${item.product.name}">${item.product.name}</h4>
                  <button onclick="store.removeFromCart('${item.product.id}')" class="text-slate-500 hover:text-rose-400 text-xs ml-2 p-1" title="Remove item">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
                <div class="text-[10px] text-blue-400 font-mono">${item.product.sku}</div>
                <div class="mt-2 flex items-center justify-between">
                  <div class="flex items-center rounded-lg bg-slate-950 border border-slate-800">
                    <button onclick="store.updateCartQty('${item.product.id}', ${item.quantity - 1})" class="px-2 py-0.5 text-xs text-slate-400 hover:text-white">-</button>
                    <span class="px-2 text-xs font-bold text-white">${item.quantity}</span>
                    <button onclick="store.updateCartQty('${item.product.id}', ${item.quantity + 1})" class="px-2 py-0.5 text-xs text-slate-400 hover:text-white">+</button>
                  </div>
                  <div class="text-xs font-bold text-white font-mono">
                    $${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        `}
      </div>

      <!-- Footer & Totals -->
      ${cart.length > 0 ? `
        <div class="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
          <!-- Coupon input -->
          <div class="flex gap-2">
            <input 
              type="text" 
              id="cart-coupon-input" 
              placeholder="Discount Code (e.g. ENTERPRISE10)" 
              value="${store.appliedCoupon ? store.appliedCoupon.code : ''}"
              class="flex-1 bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs uppercase focus:outline-none focus:border-blue-500"
            />
            <button onclick="window.handleCouponSubmit()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">
              ${store.appliedCoupon ? 'Applied' : 'Apply'}
            </button>
          </div>

          <!-- Price Summary -->
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span class="font-mono text-slate-200">$${totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            ${totals.discount > 0 ? `
              <div class="flex justify-between text-emerald-400">
                <span>Discount (${store.appliedCoupon?.label}):</span>
                <span class="font-mono">-$${totals.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-slate-400">
              <span>Estimated Tax (8%):</span>
              <span class="font-mono text-slate-200">$${totals.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="flex justify-between text-slate-400">
              <span>Freight / Enterprise Courier:</span>
              <span class="font-mono ${totals.shipping === 0 ? 'text-emerald-400' : 'text-slate-200'}">
                ${totals.shipping === 0 ? 'FREE Enterprise Logistics' : `$${totals.shipping.toFixed(2)}`}
              </span>
            </div>
            <div class="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
              <span>Total:</span>
              <span class="font-mono text-blue-400">$${totals.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <!-- Checkout CTA -->
          <button onclick="window.closeCartDrawer(); store.setView('checkout');" class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
            <span>Proceed to Enterprise Checkout</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      ` : ''}
    </div>
  `;

  // Animate slide-in
  requestAnimationFrame(() => {
    const panel = document.getElementById('cart-drawer-panel');
    if (panel) panel.classList.remove('translate-x-full');
  });
}

window.openCartDrawer = function() {
  renderCartDrawer();
};

window.closeCartDrawer = function() {
  const panel = document.getElementById('cart-drawer-panel');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (panel) panel.classList.add('translate-x-full');
  if (overlay) overlay.classList.add('opacity-0');
  setTimeout(() => {
    const drawerMount = document.getElementById('cart-drawer-mount');
    if (drawerMount) drawerMount.innerHTML = '';
  }, 250);
};

window.handleCouponSubmit = function() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;
  const res = store.applyCoupon(input.value);
  if (res.success) {
    toast.show(res.message, 'success');
  } else {
    toast.show(res.message, 'error');
  }
  renderCartDrawer();
};

// Full Multi-Step Checkout View
export function renderCheckoutView() {
  const cart = store.cart;
  const totals = store.getCartTotals();

  if (cart.length === 0) {
    return `
      <div class="py-16 bg-slate-950 min-h-screen">
      <div class="app-container text-center max-w-md mx-auto">
          <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-white">Your Cart is Empty</h2>
          <p class="text-xs text-slate-400 mt-2">You need to add items to your cart before proceeding to checkout.</p>
          <button onclick="store.setView('products')" class="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs">
            Browse Enterprise Hardware & Licenses
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="py-8 md:py-12 bg-slate-950 min-h-screen">
      <div class="app-container">
        <!-- Breadcrumb & Title -->
        <div class="mb-8">
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <button onclick="store.setView('products')" class="hover:text-white">Store</button>
            <span>/</span>
            <span class="text-blue-400 font-medium">Enterprise Checkout & PO Billing</span>
          </div>
          <h1 class="text-3xl font-black text-white">Enterprise Order Checkout</h1>
          <p class="text-slate-400 text-xs mt-1">Official purchase order authorization, digital license provisioning, and dispatch scheduling.</p>
        </div>

        <form id="checkout-form" onsubmit="window.handleOrderSubmit(event)">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left Form Details (7 cols) -->
            <div class="lg:col-span-7 space-y-6">
              <!-- Contact Information -->
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">1</span>
                  Company & Procurement Contact
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label class="text-slate-400 block mb-1">Company / Organization *</label>
                    <input type="text" id="chk-company" required placeholder="e.g. Apex Global Technologies" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="text-slate-400 block mb-1">Tax ID / DUNS (Optional)</label>
                    <input type="text" id="chk-taxid" placeholder="e.g. US-8829103" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="text-slate-400 block mb-1">Contact Full Name *</label>
                    <input type="text" id="chk-name" required placeholder="Alexander Wright" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="text-slate-400 block mb-1">Corporate Email (for license delivery) *</label>
                    <input type="email" id="chk-email" required placeholder="alex@company.com" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="text-slate-400 block mb-1">Phone Number *</label>
                    <input type="tel" id="chk-phone" required placeholder="+1 (555) 019-2834" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <!-- Shipping / Delivery Address -->
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">2</span>
                  Data Center / Office Shipping Destination
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="sm:col-span-2">
                    <label class="text-slate-400 block mb-1">Street Address / Facility Dock *</label>
                    <input type="text" id="chk-address" required placeholder="100 Innovation Blvd, Colocation Cage 4B" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="text-slate-400 block mb-1">City *</label>
                    <input type="text" id="chk-city" required placeholder="Austin" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="text-slate-400 block mb-1">State *</label>
                      <input type="text" id="chk-state" required placeholder="TX" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label class="text-slate-400 block mb-1">ZIP / Postal *</label>
                      <input type="text" id="chk-zip" required placeholder="78701" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <label class="text-slate-400 block mb-1">Fulfillment Notes / Dock Delivery Instructions</label>
                    <input type="text" id="chk-notes" placeholder="Liftgate required, notify receiving manager upon dispatch" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <!-- Payment Method Selection -->
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">3</span>
                  Payment & Procurement Terms
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
                  <label class="p-3.5 rounded-xl border cursor-pointer transition-all ${activePaymentMethod === 'po' ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-slate-800'}">
                    <input type="radio" name="paymentMethod" value="po" class="hidden" ${activePaymentMethod === 'po' ? 'checked' : ''} onchange="window.setCheckoutPayment('po')" />
                    <div class="font-bold text-white">Net-30 Corporate PO</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Approved corporate invoicing</div>
                  </label>

                  <label class="p-3.5 rounded-xl border cursor-pointer transition-all ${activePaymentMethod === 'card' ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-slate-800'}">
                    <input type="radio" name="paymentMethod" value="card" class="hidden" ${activePaymentMethod === 'card' ? 'checked' : ''} onchange="window.setCheckoutPayment('card')" />
                    <div class="font-bold text-white">Corporate Credit Card</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">Instant Visa / MC / Amex</div>
                  </label>

                  <label class="p-3.5 rounded-xl border cursor-pointer transition-all ${activePaymentMethod === 'wire' ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-slate-800'}">
                    <input type="radio" name="paymentMethod" value="wire" class="hidden" ${activePaymentMethod === 'wire' ? 'checked' : ''} onchange="window.setCheckoutPayment('wire')" />
                    <div class="font-bold text-white">Bank Wire Transfer</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">ACH / Fedwire Direct</div>
                  </label>
                </div>

                <!-- Conditional payment details -->
                ${activePaymentMethod === 'po' ? `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center gap-2 text-emerald-400 font-semibold">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>Pre-Approved Net-30 Invoicing Terms</span>
                    </div>
                    <div>
                      <label class="text-slate-400 block mb-1">Corporate Purchase Order Number *</label>
                      <input type="text" id="chk-po-number" required placeholder="e.g. PO-2026-NX-8842" class="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none font-mono" />
                    </div>
                    <p class="text-[11px] text-slate-500">An official PDF tax invoice will be generated upon checkout with 30-day payment remittance details.</p>
                  </div>
                ` : activePaymentMethod === 'card' ? `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                    <div>
                      <label class="text-slate-400 block mb-1">Cardholder Full Name</label>
                      <input type="text" placeholder="Alexander Wright" class="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label class="text-slate-400 block mb-1">Card Number (Simulated Stripe Gateway)</label>
                      <input type="text" placeholder="4000 1234 5678 9010" maxlength="19" class="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none font-mono" />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label class="text-slate-400 block mb-1">Exp Date (MM/YY)</label>
                        <input type="text" placeholder="12/28" maxlength="5" class="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none font-mono" />
                      </div>
                      <div>
                        <label class="text-slate-400 block mb-1">CVC Security Code</label>
                        <input type="password" placeholder="•••" maxlength="4" class="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none font-mono" />
                      </div>
                    </div>
                  </div>
                ` : `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono text-slate-300">
                    <div class="text-blue-400 font-sans font-bold">Nexora IT Treasury Account (Fedwire & ACH)</div>
                    <div>Bank: Silicon Valley Commercial Bank, N.A.</div>
                    <div>Routing (ABA): 121000358</div>
                    <div>Account Number: 8840-9921-5021</div>
                    <div class="text-slate-500 font-sans text-[11px] mt-1">Wire instructions and pro-forma invoice will be immediately accessible on completion.</div>
                  </div>
                `}
              </div>
            </div>

            <!-- Right Order Summary Column (5 cols) -->
            <div class="lg:col-span-5 space-y-6">
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl sticky top-24">
                <h3 class="text-base font-bold text-white pb-3 border-b border-slate-800">Order Summary (${totals.itemCount} items)</h3>
                
                <!-- Items list -->
                <div class="py-4 divide-y divide-slate-800 max-h-60 overflow-y-auto">
                  ${cart.map(item => `
                    <div class="py-2.5 flex justify-between items-center text-xs">
                      <div>
                        <div class="font-bold text-white">${item.product.name}</div>
                        <div class="text-[10px] text-slate-400">Qty: ${item.quantity} × $${item.product.price.toLocaleString()}</div>
                      </div>
                      <div class="font-mono font-bold text-slate-200">
                        $${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Totals -->
                <div class="pt-4 border-t border-slate-800 space-y-2 text-xs">
                  <div class="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span class="font-mono text-slate-200">$${totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  ${totals.discount > 0 ? `
                    <div class="flex justify-between text-emerald-400">
                      <span>Discount</span>
                      <span class="font-mono">-$${totals.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  ` : ''}
                  <div class="flex justify-between text-slate-400">
                    <span>Tax (8% Enterprise Sales & Svc)</span>
                    <span class="font-mono text-slate-200">$${totals.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div class="flex justify-between text-slate-400">
                    <span>Freight Logistics</span>
                    <span class="font-mono text-emerald-400">FREE</span>
                  </div>
                  <div class="flex justify-between text-lg font-black text-white pt-2 border-t border-slate-800">
                    <span>Grand Total:</span>
                    <span class="font-mono text-blue-400">$${totals.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  Confirm & Place Enterprise Order
                </button>

                <div class="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-500">
                  <span class="flex items-center gap-1"><svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 256-Bit SSL Encrypted</span>
                  <span class="flex items-center gap-1"><svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> SOC 2 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.setCheckoutPayment = function(method) {
  activePaymentMethod = method;
  window.reRenderCurrentView();
};

window.handleOrderSubmit = function(e) {
  e.preventDefault();

  const company = document.getElementById('chk-company').value;
  const fullName = document.getElementById('chk-name').value;
  const email = document.getElementById('chk-email').value;
  const phone = document.getElementById('chk-phone').value;
  const address = document.getElementById('chk-address').value;
  const city = document.getElementById('chk-city').value;
  const state = document.getElementById('chk-state').value;
  const zip = document.getElementById('chk-zip').value;
  const notes = document.getElementById('chk-notes')?.value || "";

  let poNumber = null;
  const poInput = document.getElementById('chk-po-number');
  if (poInput) poNumber = poInput.value;

  const paymentLabels = {
    po: "Corporate Purchase Order (Net-30)",
    card: "Corporate Credit Card (Visa/Mastercard)",
    wire: "Direct Bank Wire Transfer (ACH)"
  };

  const orderForm = {
    company,
    fullName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    notes,
    paymentMethod: paymentLabels[activePaymentMethod] || "Enterprise Procurement",
    poNumber
  };

  const newOrder = store.placeOrder(orderForm);
  toast.show(`Order ${newOrder.id} successfully created!`, 'success');
  window.showInvoiceModal(newOrder);
};

// Printable Formal Corporate Invoice Modal
window.showInvoiceModal = function(order) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        <!-- Top Toolbar -->
        <div class="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between no-print">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span class="text-xs font-bold text-white uppercase tracking-wider">Official Enterprise Tax Invoice</span>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.printInvoice()" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Print / Save PDF
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML = ''; store.setView('portal');" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold">
              View in Client Portal
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML = ''; store.setView('home');" class="p-1.5 rounded-lg text-slate-400 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Printable Document Body -->
        <div id="printable-invoice" class="p-8 bg-slate-900 text-white font-sans max-h-[80vh] overflow-y-auto">
          <!-- Corporate Header -->
          <div class="flex justify-between items-start border-b border-slate-800 pb-6">
            <div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-lg">N</div>
                <span class="text-2xl font-black tracking-wider text-white">NEXORA IT CORP</span>
              </div>
              <p class="text-xs text-slate-400 mt-1">Enterprise Systems & Managed Infrastructure Services</p>
              <p class="text-[11px] text-slate-400">100 Tech Enterprise Blvd, Silicon Valley, CA 94025</p>
              <p class="text-[11px] text-slate-400">Tax ID: US-94-8291048 | Support: +1 (800) 555-NXIT</p>
            </div>
            <div class="text-right">
              <h2 class="text-2xl font-black text-blue-400 font-mono">${order.id}</h2>
              <p class="text-xs text-slate-400 mt-1">Date: ${new Date(order.date).toLocaleDateString()} ${new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <div class="inline-block mt-2 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/30">
                ${order.status}
              </div>
            </div>
          </div>

          <!-- Billed To / Shipped To -->
          <div class="grid grid-cols-2 gap-6 my-6 text-xs">
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div class="text-slate-400 uppercase font-bold text-[10px] tracking-wider mb-1">Billed & Procured For:</div>
              <div class="font-bold text-white text-sm">${order.customer.company}</div>
              <div class="text-slate-300">${order.customer.fullName}</div>
              <div class="text-slate-400">${order.customer.email} | ${order.customer.phone}</div>
              <div class="text-slate-400 mt-2">Payment Method: <strong class="text-white">${order.paymentMethod}</strong></div>
              ${order.poNumber ? `<div class="text-blue-400 font-mono">PO Ref: ${order.poNumber}</div>` : ''}
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div class="text-slate-400 uppercase font-bold text-[10px] tracking-wider mb-1">Destination & Logistics:</div>
              <div class="text-slate-300 font-medium">${order.customer.address}</div>
              <div class="text-slate-300">${order.customer.city}, ${order.customer.state} ${order.customer.zip}</div>
              <div class="text-slate-400">${order.customer.country}</div>
              <div class="text-slate-400 mt-2 font-mono">Tracking: <strong class="text-emerald-400">${order.trackingNumber}</strong></div>
            </div>
          </div>

          <!-- Line Items Table -->
          <table class="w-full text-left text-xs mb-6">
            <thead class="bg-slate-950 text-slate-400 uppercase border-y border-slate-800">
              <tr>
                <th class="p-3">SKU / Item Description</th>
                <th class="p-3 text-center">Category</th>
                <th class="p-3 text-center">Qty</th>
                <th class="p-3 text-right">Unit Price</th>
                <th class="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${order.items.map(item => `
                <tr>
                  <td class="p-3">
                    <div class="font-bold text-white">${item.name}</div>
                    <div class="text-[10px] text-slate-500 font-mono">${item.sku}</div>
                    ${item.licenseKeys ? `
                      <div class="mt-2 p-2 bg-slate-950 rounded border border-blue-500/30 text-[10px] font-mono text-emerald-400">
                        <span class="text-slate-400 uppercase text-[9px] block">Provisioned Digital License Keys:</span>
                        ${item.licenseKeys.map(k => `<div>🔑 ${k}</div>`).join('')}
                      </div>
                    ` : ''}
                  </td>
                  <td class="p-3 text-center uppercase text-[10px] text-slate-400">${item.category}</td>
                  <td class="p-3 text-center font-bold text-white">${item.quantity}</td>
                  <td class="p-3 text-right font-mono text-slate-300">$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td class="p-3 text-right font-mono font-bold text-white">$${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Financial Breakdown -->
          <div class="flex justify-end text-xs">
            <div class="w-64 space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div class="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span class="font-mono text-slate-200">$${order.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              ${order.discount > 0 ? `
                <div class="flex justify-between text-emerald-400">
                  <span>Discount:</span>
                  <span class="font-mono">-$${order.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-slate-400">
                <span>Sales Tax (8%):</span>
                <span class="font-mono text-slate-200">$${order.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Enterprise Shipping:</span>
                <span class="font-mono text-emerald-400">FREE</span>
              </div>
              <div class="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Remittance:</span>
                <span class="font-mono text-blue-400">$${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

window.printInvoice = function() {
  window.print();
};
