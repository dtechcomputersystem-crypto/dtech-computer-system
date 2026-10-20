// Nexora IT Solutions - Enterprise Client Self-Service Portal
import { store } from '../store.js';
import { toast } from './toast.js';

let activePortalTab = 'orders'; // 'orders', 'licenses', 'sla', 'tickets'

export function renderClientPortalView() {
  const orders = store.orders;
  const quotes = store.quotes;
  const tickets = store.tickets;
  const consultations = store.consultations;

  // Extract all digital license keys from orders
  const licenseVault = [];
  orders.forEach(order => {
    order.items.forEach(item => {
      if (item.licenseKeys && item.licenseKeys.length) {
        item.licenseKeys.forEach((key, idx) => {
          licenseVault.push({
            orderId: order.id,
            date: order.date,
            softwareName: item.name,
            sku: item.sku,
            key: key,
            seatNumber: idx + 1,
            status: "Active & Activated"
          });
        });
      }
    });
  });

  return `
    <div class="py-8 md:py-12 bg-slate-950 min-h-screen">
      <div class="app-container">
        <!-- Portal Header -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-black text-2xl">
              🏢
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold text-white">Enterprise Client Portal</h1>
                <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Tier-1 SLA Client</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Apex Global Logistics | Account #NX-CL-88291 | Managed Contract: Active</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.openNewTicketModal()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Open SLA Support Ticket
            </button>
          </div>
        </div>

        <!-- Portal Tabs Navigation -->
        <div class="flex items-center gap-2 border-b border-slate-800 pb-3 mb-8 overflow-x-auto text-xs">
          <button 
            onclick="window.setPortalTab('orders')"
            class="px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${activePortalTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            <span>Orders & Hardware Shipments (${orders.length})</span>
          </button>

          <button 
            onclick="window.setPortalTab('licenses')"
            class="px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${activePortalTab === 'licenses' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            <span>Digital Software License Vault (${licenseVault.length})</span>
          </button>

          <button 
            onclick="window.setPortalTab('sla')"
            class="px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${activePortalTab === 'sla' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span>Active SLA & Support Contracts</span>
          </button>

          <button 
            onclick="window.setPortalTab('tickets')"
            class="px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${activePortalTab === 'tickets' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span>Support Tickets & Helpdesk (${tickets.length})</span>
          </button>
        </div>

        <!-- Tab 1: Orders & Hardware Tracking -->
        ${activePortalTab === 'orders' ? `
          <div class="space-y-6">
            ${orders.length === 0 ? `
              <div class="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
                <p class="text-slate-400 text-sm">No orders recorded yet.</p>
              </div>
            ` : `
              ${orders.map(order => `
                <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
                  <!-- Order Top Line -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-black text-white font-mono">${order.id}</span>
                        <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}">
                          ${order.status}
                        </span>
                      </div>
                      <div class="text-xs text-slate-400 mt-0.5">
                        Placed on ${new Date(order.date).toLocaleDateString()} • Payment: ${order.paymentMethod}
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <button onclick="window.showInvoiceModal(store.orders.find(o => o.id === '${order.id}'))" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        View Tax Invoice
                      </button>
                    </div>
                  </div>

                  <!-- Visual Shipping Timeline -->
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                      <span>Live Logistics Progress</span>
                      <span class="text-blue-400 font-mono text-[11px]">Tracking: ${order.trackingNumber}</span>
                    </div>
                    <div class="grid grid-cols-4 gap-2 text-center text-[11px]">
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mb-1">✓</div>
                        <span class="font-bold text-white">Order Authorized</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mb-1">✓</div>
                        <span class="font-bold text-white">QA & Burn-in Tested</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-full ${order.status === 'In Transit' || order.status === 'Delivered' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'} font-bold flex items-center justify-center mb-1">
                          ${order.status === 'In Transit' || order.status === 'Delivered' ? '✓' : '3'}
                        </div>
                        <span class="font-bold ${order.status === 'In Transit' || order.status === 'Delivered' ? 'text-white' : 'text-slate-500'}">Dispatched Freight</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'} font-bold flex items-center justify-center mb-1">
                          ${order.status === 'Delivered' ? '✓' : '4'}
                        </div>
                        <span class="font-bold ${order.status === 'Delivered' ? 'text-white' : 'text-slate-500'}">Dock Delivered</span>
                      </div>
                    </div>
                  </div>

                  <!-- Order Items -->
                  <div class="divide-y divide-slate-800 text-xs">
                    ${order.items.map(item => `
                      <div class="py-2.5 flex items-center justify-between">
                        <div>
                          <div class="font-bold text-white">${item.name}</div>
                          <div class="text-[10px] text-slate-400 font-mono">Qty: ${item.quantity} • SKU: ${item.sku}</div>
                        </div>
                        <div class="font-mono font-bold text-slate-200">
                          $${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Total line -->
                  <div class="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span class="text-slate-400">Total Remitted:</span>
                    <span class="text-base font-black text-blue-400 font-mono">$${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              `).join('')}
            `}
          </div>
        ` : ''}

        <!-- Tab 2: Digital Software License Vault -->
        ${activePortalTab === 'licenses' ? `
          <div class="space-y-6">
            <div class="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
              <div>
                <strong>Digital License Vault:</strong> Enterprise keys are provisioned immediately upon purchase and stored securely in this encrypted console.
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${licenseVault.map(lic => `
                <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xl">
                  <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="text-blue-400 font-mono text-[10px]">${lic.sku}</span>
                      <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">${lic.status}</span>
                    </div>
                    <h3 class="font-bold text-white text-base">${lic.softwareName}</h3>
                    <div class="text-xs text-slate-400 mt-1">Associated with Order: <strong>${lic.orderId}</strong></div>

                    <!-- Key Box -->
                    <div class="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                      <code class="font-mono text-xs text-emerald-400 font-bold select-all truncate">${lic.key}</code>
                      <button onclick="window.copyToClipboard('${lic.key}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold flex items-center gap-1 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        Copy
                      </button>
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Provisioned: ${new Date(lic.date).toLocaleDateString()}</span>
                    <span class="text-slate-300">Tenant Sync: <strong>Enabled</strong></span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Tab 3: Active SLA & Support Contracts -->
        ${activePortalTab === 'sla' ? `
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Managed SLA Contract</span>
                <h3 class="text-xl font-bold text-white mt-1">Enterprise Elite (24/7)</h3>
                <div class="mt-3 text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 live-indicator"></span>
                  <span>100% Contract Compliance (0 Breaches)</span>
                </div>
                <div class="mt-4 text-xs text-slate-300 space-y-1">
                  <div><strong>Critical SLA:</strong> &lt; 15 Min Response</div>
                  <div><strong>Emergency Onsite:</strong> 4-Hour Dispatch</div>
                  <div><strong>Contract Term:</strong> Annual Multi-Year</div>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Dedicated Virtual CIO</span>
                <h3 class="text-xl font-bold text-white mt-1">Marcus Vance, vCIO</h3>
                <div class="text-xs text-blue-400 mt-1">Lead Enterprise Solutions Director</div>
                <div class="mt-4 text-xs text-slate-300 space-y-1">
                  <div><strong>Direct Phone:</strong> +1 (555) 902-1844</div>
                  <div><strong>Quarterly Review:</strong> Oct 14, 2026</div>
                  <div><strong>Architecture Audits:</strong> Biannual</div>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Active RFPs & Proposals</span>
                <h3 class="text-xl font-bold text-white mt-1">${quotes.length} Quotes in Queue</h3>
                <div class="mt-4 text-xs text-slate-300 space-y-2">
                  ${quotes.slice(0, 2).map(q => `
                    <div class="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <div class="flex justify-between font-bold text-white">
                        <span>${q.serviceType}</span>
                        <span class="text-blue-400">${q.status}</span>
                      </div>
                      <div class="text-[10px] text-slate-400">${q.estimatedBudget}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Tab 4: Support Tickets & Helpdesk -->
        ${activePortalTab === 'tickets' ? `
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-bold text-white">Helpdesk Tickets & Emergency NOC Logs</h2>
                <p class="text-xs text-slate-400">All submitted tickets are handled under your 15-minute enterprise SLA guarantee.</p>
              </div>
              <button onclick="window.openNewTicketModal()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">
                + Create New Ticket
              </button>
            </div>

            <div class="space-y-4">
              ${tickets.map(ticket => `
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-black text-white font-mono">${ticket.id}</span>
                      <span class="text-xs font-bold text-white">${ticket.title}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${ticket.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-blue-500/20 text-blue-400'}">
                        ${ticket.priority} Priority
                      </span>
                      <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${ticket.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}">
                        ${ticket.status}
                      </span>
                    </div>
                  </div>

                  <!-- Messages Thread -->
                  <div class="space-y-3">
                    ${ticket.messages.map(msg => `
                      <div class="p-3 rounded-xl ${msg.sender.includes('NOC') || msg.sender.includes('Admin') ? 'bg-blue-950/30 border border-blue-500/20' : 'bg-slate-950 border border-slate-800'} text-xs">
                        <div class="flex justify-between font-bold mb-1 ${msg.sender.includes('NOC') ? 'text-blue-400' : 'text-slate-300'}">
                          <span>${msg.sender}</span>
                          <span class="text-[10px] text-slate-500">${msg.time}</span>
                        </div>
                        <div class="text-slate-200 leading-relaxed">${msg.text}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

window.setPortalTab = function(tab) {
  activePortalTab = tab;
  window.reRenderCurrentView();
};

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast.show("License key copied to clipboard!", "success");
  }).catch(() => {
    toast.show(`Key: ${text}`, "info");
  });
};

window.openNewTicketModal = function() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 animate-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 class="text-base font-bold text-white">Create Enterprise Support Ticket</h3>
          <button onclick="document.getElementById('modal-container').innerHTML = ''" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onsubmit="window.handleCreateTicketSubmit(event)" class="space-y-4 text-xs">
          <div>
            <label class="text-slate-400 block mb-1">Issue Subject *</label>
            <input type="text" id="tck-title" required placeholder="e.g. Cisco Switch Trunk Port Flapping" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="text-slate-400 block mb-1">Severity & Priority *</label>
            <select id="tck-priority" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none">
              <option value="High">Severity 1 / High (&lt; 15 Min SLA)</option>
              <option value="Medium" selected>Severity 2 / Medium (&lt; 30 Min SLA)</option>
              <option value="Low">Severity 3 / Standard (&lt; 2 Hours)</option>
            </select>
          </div>
          <div>
            <label class="text-slate-400 block mb-1">Detailed Technical Description *</label>
            <textarea id="tck-message" rows="3" required placeholder="Provide device IPs, error logs, or affected workstation names..." class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"></textarea>
          </div>
          <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25">
            Submit Incident to 24/7 NOC
          </button>
        </form>
      </div>
    </div>
  `;
};

window.handleCreateTicketSubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('tck-title').value;
  const priority = document.getElementById('tck-priority').value;
  const message = document.getElementById('tck-message').value;

  const newTicket = store.submitTicket({
    title,
    priority,
    message,
    customer: "Apex Global Logistics"
  });

  toast.show(`Ticket ${newTicket.id} created and dispatched to on-call NOC engineer!`, 'success');
  document.getElementById('modal-container').innerHTML = '';
  activePortalTab = 'tickets';
  window.reRenderCurrentView();
};
