// Nexora IT Solutions - Interactive IT Cost Estimator & Quote Generator
import { store } from '../store.js';
import { toast } from './toast.js';

let estimatorState = {
  teamSize: 50,
  infraType: 'hybrid', // 'hybrid', 'cloud', 'onprem'
  securityLevel: 'advanced', // 'standard', 'advanced', 'compliance'
  slaLevel: '24x7', // 'business', '24x7', 'dedicated'
  backupTier: '10tb', // '1tb', '10tb', 'enterprise'
  hardwareAddon: true,
  customServiceSelected: ''
};

export function renderQuoteCalculatorView() {
  if (store.currentViewParams && store.currentViewParams.prefillService) {
    estimatorState.customServiceSelected = store.currentViewParams.prefillService;
  }

  // Calculate pricing
  const calculation = calculateEstimatorPrice(estimatorState);

  return `
    <div class="py-8 md:py-12 bg-slate-950 min-h-screen">
      <div class="app-container">
        <!-- Header -->
        <div class="mb-10 text-center max-w-3xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Real-Time Infrastructure Calculator
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-3">Interactive IT Cost & SLA Estimator</h1>
          <p class="text-slate-300 text-sm mt-2">
            Configure your enterprise scope below. Get instant itemized cost breakdowns and submit an official Request for Proposal (RFP) in seconds.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left Controls Column (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            <!-- 1. Team Size / Endpoints Slider -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-bold text-white flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">1</span>
                  Company Size (Active Users & Endpoints)
                </label>
                <span class="text-xl font-black text-blue-400 font-mono">${estimatorState.teamSize} Seats</span>
              </div>
              <p class="text-xs text-slate-400 mb-4">Includes desktop workstations, laptops, mobile device management (MDM), and corporate user accounts.</p>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="5" 
                value="${estimatorState.teamSize}" 
                id="estimator-team-slider"
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div class="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>10 Seats (Startup)</span>
                <span>100 Seats (Mid-Market)</span>
                <span>500+ Seats (Enterprise)</span>
              </div>
            </div>

            <!-- 2. Infrastructure Architecture -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <label class="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">2</span>
                Core Infrastructure Model
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.infraType === 'cloud' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="infraType" value="cloud" class="hidden" ${estimatorState.infraType === 'cloud' ? 'checked' : ''} onchange="window.updateEstimator('infraType', 'cloud')" />
                  <div class="font-bold text-white text-sm">Cloud-Native</div>
                  <div class="text-[11px] text-slate-400 mt-1">AWS / Azure EKS, serverless, automated scaling</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.infraType === 'hybrid' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="infraType" value="hybrid" class="hidden" ${estimatorState.infraType === 'hybrid' ? 'checked' : ''} onchange="window.updateEstimator('infraType', 'hybrid')" />
                  <div class="font-bold text-white text-sm">Hybrid Cloud</div>
                  <div class="text-[11px] text-slate-400 mt-1">On-premise servers + AWS/Azure direct cloud sync</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.infraType === 'onprem' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="infraType" value="onprem" class="hidden" ${estimatorState.infraType === 'onprem' ? 'checked' : ''} onchange="window.updateEstimator('infraType', 'onprem')" />
                  <div class="font-bold text-white text-sm">On-Premises Data Center</div>
                  <div class="text-[11px] text-slate-400 mt-1">High-density local servers, SAN storage & firewalls</div>
                </label>
              </div>
            </div>

            <!-- 3. Cybersecurity & Compliance Tier -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <label class="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">3</span>
                Cybersecurity & Compliance Package
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.securityLevel === 'standard' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="securityLevel" value="standard" class="hidden" ${estimatorState.securityLevel === 'standard' ? 'checked' : ''} onchange="window.updateEstimator('securityLevel', 'standard')" />
                  <div class="font-bold text-white text-sm">Standard EDR</div>
                  <div class="text-[11px] text-slate-400 mt-1">Antivirus, web filtering, patch automation</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.securityLevel === 'advanced' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="securityLevel" value="advanced" class="hidden" ${estimatorState.securityLevel === 'advanced' ? 'checked' : ''} onchange="window.updateEstimator('securityLevel', 'advanced')" />
                  <div class="font-bold text-white text-sm">24/7 SOC + MDR</div>
                  <div class="text-[11px] text-slate-400 mt-1">CrowdStrike Falcon XDR + live threat monitoring</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.securityLevel === 'compliance' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="securityLevel" value="compliance" class="hidden" ${estimatorState.securityLevel === 'compliance' ? 'checked' : ''} onchange="window.updateEstimator('securityLevel', 'compliance')" />
                  <div class="font-bold text-white text-sm">SOC 2 / HIPAA / ISO</div>
                  <div class="text-[11px] text-slate-400 mt-1">Annual pen-testing, audit readiness & zero trust</div>
                </label>
              </div>
            </div>

            <!-- 4. SLA & Support Coverage -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <label class="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">4</span>
                SLA Response Guarantee Level
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.slaLevel === 'business' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="slaLevel" value="business" class="hidden" ${estimatorState.slaLevel === 'business' ? 'checked' : ''} onchange="window.updateEstimator('slaLevel', 'business')" />
                  <div class="font-bold text-white text-sm">Business Hours (8x5)</div>
                  <div class="text-[11px] text-slate-400 mt-1">1-Hour SLA response during business days</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.slaLevel === '24x7' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="slaLevel" value="24x7" class="hidden" ${estimatorState.slaLevel === '24x7' ? 'checked' : ''} onchange="window.updateEstimator('slaLevel', '24x7')" />
                  <div class="font-bold text-white text-sm">24/7 Priority SLA</div>
                  <div class="text-[11px] text-slate-400 mt-1">30-Minute SLA guarantee, nights & weekends</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.slaLevel === 'dedicated' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="slaLevel" value="dedicated" class="hidden" ${estimatorState.slaLevel === 'dedicated' ? 'checked' : ''} onchange="window.updateEstimator('slaLevel', 'dedicated')" />
                  <div class="font-bold text-white text-sm">Dedicated NOC Pod</div>
                  <div class="text-[11px] text-slate-400 mt-1">15-Min SLA, named vCIO & priority onsite engineers</div>
                </label>
              </div>
            </div>

            <!-- 5. Backup & Disaster Recovery Pool -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <label class="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-mono flex items-center justify-center">5</span>
                Disaster Recovery & Immutable Cloud Backup
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.backupTier === '1tb' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="backupTier" value="1tb" class="hidden" ${estimatorState.backupTier === '1tb' ? 'checked' : ''} onchange="window.updateEstimator('backupTier', '1tb')" />
                  <div class="font-bold text-white text-sm">Up to 2TB Vault</div>
                  <div class="text-[11px] text-slate-400 mt-1">Daily backups, 24-hr RPO, encrypted storage</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.backupTier === '10tb' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="backupTier" value="10tb" class="hidden" ${estimatorState.backupTier === '10tb' ? 'checked' : ''} onchange="window.updateEstimator('backupTier', '10tb')" />
                  <div class="font-bold text-white text-sm">10TB Rapid DR</div>
                  <div class="text-[11px] text-slate-400 mt-1">Hourly snapshots, 1-hr RTO cloud VM standby</div>
                </label>
                <label class="p-4 rounded-xl border cursor-pointer transition-all ${estimatorState.backupTier === 'enterprise' ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}">
                  <input type="radio" name="backupTier" value="enterprise" class="hidden" ${estimatorState.backupTier === 'enterprise' ? 'checked' : ''} onchange="window.updateEstimator('backupTier', 'enterprise')" />
                  <div class="font-bold text-white text-sm">Multi-Region 50TB+</div>
                  <div class="text-[11px] text-slate-400 mt-1">Air-gapped immutable ransomware protection</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Right Summary & RFP Submission Column (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            <!-- Price Summary Card -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl sticky top-24">
              <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                <span class="text-xs font-bold uppercase tracking-wider text-blue-400">Live Estimated Budget</span>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Immediate Estimate</span>
              </div>

              <!-- Price Breakdown -->
              <div class="py-5 space-y-3">
                <div class="flex items-baseline justify-between">
                  <span class="text-sm text-slate-300 font-medium">Estimated Monthly Retainer</span>
                  <div class="text-right">
                    <span class="text-3xl font-black text-white">$${calculation.monthlyTotal.toLocaleString()}</span>
                    <span class="text-xs text-slate-500 block">/ month</span>
                  </div>
                </div>

                <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Initial Setup, Audit & Hardware Provisioning</span>
                  <span class="font-mono text-slate-200 font-semibold">$${calculation.setupFee.toLocaleString()} (One-Time)</span>
                </div>
              </div>

              <!-- Itemized List -->
              <div class="bg-slate-950 rounded-xl p-4 border border-slate-800 text-xs space-y-2 mb-6">
                <div class="flex justify-between text-slate-400">
                  <span>Managed Support (${estimatorState.teamSize} seats):</span>
                  <span class="text-slate-200 font-mono">$${calculation.seatCost.toLocaleString()}/mo</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Security & SOC (${estimatorState.securityLevel}):</span>
                  <span class="text-slate-200 font-mono">$${calculation.securityCost.toLocaleString()}/mo</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>SLA Guarantee Tier (${estimatorState.slaLevel}):</span>
                  <span class="text-slate-200 font-mono">$${calculation.slaCost.toLocaleString()}/mo</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Disaster Recovery & Cloud Storage:</span>
                  <span class="text-slate-200 font-mono">$${calculation.backupCost.toLocaleString()}/mo</span>
                </div>
              </div>

              <!-- Official RFP / Quote Submission Form -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Submit Official RFP / Quote Request
                </h4>

                <form id="rfp-quote-form" onsubmit="window.submitEstimatorRfp(event)" class="space-y-3 text-xs">
                  <div>
                    <label class="text-slate-400 block mb-1">Company Name *</label>
                    <input type="text" id="rfp-company" required placeholder="e.g. Apex Global Corp" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="text-slate-400 block mb-1">Contact Name *</label>
                      <input type="text" id="rfp-name" required placeholder="Full Name" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label class="text-slate-400 block mb-1">Work Email *</label>
                      <input type="email" id="rfp-email" required placeholder="name@company.com" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label class="text-slate-400 block mb-1">Phone Number</label>
                    <input type="tel" id="rfp-phone" placeholder="+1 (555) 000-0000" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="text-slate-400 block mb-1">Additional Project Specifications / Notes</label>
                    <textarea id="rfp-notes" rows="2" placeholder="Describe any specialized software or migration timeline..." class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"></textarea>
                  </div>

                  <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Send Official RFP Proposal Request
                  </button>
                  <p class="text-[10px] text-center text-slate-500">Guaranteed 2-hour turnaround on formal PDF proposals from our solutions engineering desk.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function calculateEstimatorPrice(state) {
  // Seat price: $75 base per seat
  const seatCost = state.teamSize * 75;

  // Security
  const securityCosts = {
    standard: 450,
    advanced: 1400,
    compliance: 2900
  };
  const securityCost = securityCosts[state.securityLevel] || 1400;

  // SLA
  const slaCosts = {
    business: 0,
    '24x7': 650,
    dedicated: 1800
  };
  const slaCost = slaCosts[state.slaLevel] || 650;

  // Backup
  const backupCosts = {
    '1tb': 350,
    '10tb': 950,
    enterprise: 2200
  };
  const backupCost = backupCosts[state.backupTier] || 950;

  // Infrastructure multiplier
  let infraMultiplier = 1.0;
  if (state.infraType === 'hybrid') infraMultiplier = 1.15;
  if (state.infraType === 'onprem') infraMultiplier = 1.3;

  const monthlyTotal = Math.round((seatCost + securityCost + slaCost + backupCost) * infraMultiplier);
  const setupFee = Math.round(monthlyTotal * 0.85);

  return {
    seatCost,
    securityCost,
    slaCost,
    backupCost,
    monthlyTotal,
    setupFee
  };
}

window.updateEstimator = function(key, val) {
  estimatorState[key] = val;
  window.reRenderCurrentView();
};

export function attachEstimatorListeners() {
  const slider = document.getElementById('estimator-team-slider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      estimatorState.teamSize = parseInt(e.target.value);
      window.reRenderCurrentView();
    });
  }
}

window.submitEstimatorRfp = function(e) {
  e.preventDefault();

  const company = document.getElementById('rfp-company').value;
  const fullName = document.getElementById('rfp-name').value;
  const email = document.getElementById('rfp-email').value;
  const phone = document.getElementById('rfp-phone').value;
  const notes = document.getElementById('rfp-notes').value;

  const calculation = calculateEstimatorPrice(estimatorState);

  const quoteData = {
    company,
    fullName,
    email,
    phone,
    serviceType: `Managed IT & Cloud (${estimatorState.infraType.toUpperCase()})`,
    teamSize: `${estimatorState.teamSize} Seats`,
    infrastructure: estimatorState.infraType,
    estimatedBudget: `$${calculation.monthlyTotal.toLocaleString()} / mo ($${calculation.setupFee.toLocaleString()} Setup)`,
    complianceNeeded: estimatorState.securityLevel,
    priority: "High",
    notes: notes ? `Notes: ${notes} | SLA: ${estimatorState.slaLevel}` : `Configured via interactive estimator. SLA: ${estimatorState.slaLevel}`
  };

  const newQuote = store.submitQuoteRequest(quoteData);
  toast.show(`RFP Request ${newQuote.id} Submitted Successfully!`, 'success');

  // Open confirmation modal
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div class="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 text-center animate-in zoom-in-95">
          <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">RFP Quote Generated</span>
          <h3 class="text-xl font-bold text-white mt-1">Proposal ${newQuote.id} Dispatched</h3>
          <p class="text-xs text-slate-300 mt-2">
            Thank you, <strong>${fullName}</strong>. Our senior solutions engineering architect will prepare your formal scoped SOW and reach out to <strong>${email}</strong> within 2 business hours.
          </p>
          <div class="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
            Estimated Retainer: <strong class="text-white">${newQuote.estimatedBudget}</strong>
          </div>
          <div class="mt-6 flex items-center gap-3">
            <button onclick="document.getElementById('modal-container').innerHTML = ''; store.setView('portal');" class="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">
              View in Client Portal
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML = ''; store.setView('home');" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold">
              Return Home
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
