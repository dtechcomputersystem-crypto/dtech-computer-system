// Nexora IT Solutions - Enterprise IT Services & SLAs Component
import { store } from '../store.js';

let serviceCategoryFilter = 'all';

export function renderServiceCatalogView() {
  const allServices = store.services;

  const filteredServices = allServices.filter(s => {
    if (serviceCategoryFilter === 'all') return true;
    return s.category === serviceCategoryFilter;
  });

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'support', label: 'Managed Support & Helpdesk' },
    { id: 'security', label: 'Cybersecurity & Compliance' },
    { id: 'cloud', label: 'Cloud Architecture & DevOps' },
    { id: 'software', label: 'Custom Software & APIs' },
    { id: 'networking', label: 'Infrastructure & Cabling' }
  ];

  return `
    <div class="py-8 md:py-12 bg-slate-950 min-h-screen">
      <div class="app-container">
        <!-- Header -->
        <div class="mb-10 text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Enterprise SLAs & Certified Engineers
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Mission-Critical IT Services</h1>
          <p class="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            From 15-minute SLA incident resolution to multi-region cloud migrations and SOC 2 security compliance audits.
          </p>

          <!-- Category Filter Tabs -->
          <div class="mt-8 flex items-center justify-center gap-2 flex-wrap text-xs">
            ${categories.map(cat => `
              <button 
                onclick="window.setServiceCategoryFilter('${cat.id}')"
                class="px-4 py-2 rounded-full font-medium transition-all ${serviceCategoryFilter === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}"
              >
                ${cat.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Services Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          ${filteredServices.map(service => `
            <div class="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl">
              <div class="p-6 sm:p-8">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <span class="text-[10px] font-bold uppercase px-2.5 py-1 rounded ${service.badgeColor} text-white">
                      ${service.badge}
                    </span>
                    <h2 class="text-2xl font-bold text-white mt-3">${service.title}</h2>
                    <p class="text-indigo-400 text-xs font-medium mt-1">${service.tagline}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-2xl font-black text-white">$${service.basePrice.toLocaleString()}</div>
                    <div class="text-[10px] text-slate-400">${service.pricingModel}</div>
                  </div>
                </div>

                <p class="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed">
                  ${service.summary}
                </p>

                <!-- Deliverables List -->
                <div class="mt-6">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Deliverables & Included Scope</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    ${service.deliverables.map(del => `
                      <div class="flex items-start gap-2 text-slate-200">
                        <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>${del}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Tier Comparison Box -->
                <div class="mt-6 pt-6 border-t border-slate-800">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Service Tiers</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    ${service.tiers.map(tier => `
                      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div class="font-bold text-white">${tier.name}</div>
                          <div class="text-indigo-400 font-bold mt-0.5">${tier.price}</div>
                        </div>
                        <div class="mt-2 text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                          <div><strong>SLA:</strong> ${tier.response}</div>
                          <div><strong>Scope:</strong> ${tier.coverage}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Case Study Snippet -->
                <div class="mt-4 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
                  <span class="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Case Result</span>
                  <span>${service.caseStudySnippet}</span>
                </div>
              </div>

              <!-- Card Action Footer -->
              <div class="p-6 bg-slate-950/70 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button onclick="window.launchCustomQuoteForService('${service.title}')" class="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1">
                  <span>Calculate Custom Project Budget</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                <button onclick="window.openConsultationModal('${service.title}')" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Book Discovery Meeting
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- SLA Commitment Guarantee Table -->
        <div class="mt-16 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
          <div class="max-w-2xl mb-6">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Enterprise Guarantee</span>
            <h3 class="text-2xl font-bold text-white mt-1">Our Master Service Level Agreement (SLA) Matrix</h3>
            <p class="text-slate-400 text-xs sm:text-sm mt-1">
              Every managed retainer includes contractually guaranteed response times backed by financial service credits.
            </p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th class="p-3">Severity Level</th>
                  <th class="p-3">Incident Definition</th>
                  <th class="p-3">Response SLA</th>
                  <th class="p-3">Engineering Escalation</th>
                  <th class="p-3">Resolution Target</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 text-slate-200">
                <tr class="hover:bg-slate-800/40">
                  <td class="p-3 font-bold text-rose-400 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-rose-500"></span> Severity 1 (Critical)
                  </td>
                  <td class="p-3 text-slate-300">Entire company or revenue pipeline offline; core data center outage</td>
                  <td class="p-3 font-mono font-bold text-emerald-400">&lt; 15 Minutes</td>
                  <td class="p-3">Senior SRE / Principal Architect On-Call</td>
                  <td class="p-3 font-mono">&lt; 2 Hours</td>
                </tr>
                <tr class="hover:bg-slate-800/40">
                  <td class="p-3 font-bold text-amber-400 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span> Severity 2 (Major)
                  </td>
                  <td class="p-3 text-slate-300">Key department affected, degraded network throughput, redundancy loss</td>
                  <td class="p-3 font-mono font-bold text-emerald-400">&lt; 30 Minutes</td>
                  <td class="p-3">Tier 3 Network / Systems Specialist</td>
                  <td class="p-3 font-mono">&lt; 4 Hours</td>
                </tr>
                <tr class="hover:bg-slate-800/40">
                  <td class="p-3 font-bold text-blue-400 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span> Severity 3 (Standard)
                  </td>
                  <td class="p-3 text-slate-300">Individual workstation, software licensing, printer, or user onboarding</td>
                  <td class="p-3 font-mono font-bold text-emerald-400">&lt; 2 Hours</td>
                  <td class="p-3">Tier 1 & 2 Helpdesk Team</td>
                  <td class="p-3 font-mono">&lt; 8 Hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.setServiceCategoryFilter = function(catId) {
  serviceCategoryFilter = catId;
  window.reRenderCurrentView();
};

window.launchCustomQuoteForService = function(serviceTitle) {
  store.setView('estimator', { prefillService: serviceTitle });
};
