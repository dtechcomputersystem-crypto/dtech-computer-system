// Nexora IT Solutions - Consultation & IT Discovery Scheduler Modal
import { store } from '../store.js';
import { toast } from './toast.js';

export function openConsultationModal(prefillService = "Enterprise Discovery & Infrastructure Audit") {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const today = new Date().toISOString().split('T')[0];

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
        <!-- Close Button -->
        <button onclick="document.getElementById('modal-container').innerHTML = ''" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Schedule IT Engineering Consultation</h3>
            <p class="text-xs text-slate-400">Direct technical deep-dive with a Principal Solutions Architect.</p>
          </div>
        </div>

        <form onsubmit="window.handleConsultationSubmit(event)" class="space-y-4 text-xs">
          <div>
            <label class="text-slate-400 block mb-1">Target Service / Focus Area *</label>
            <input type="text" id="cns-service" required value="${prefillService}" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-slate-400 block mb-1">Preferred Date *</label>
              <input type="date" id="cns-date" required min="${today}" value="${today}" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label class="text-slate-400 block mb-1">Time Slot (EST) *</label>
              <select id="cns-time" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none">
                <option value="10:00 AM EST">10:00 AM EST</option>
                <option value="01:30 PM EST" selected>01:30 PM EST</option>
                <option value="03:00 PM EST">03:00 PM EST</option>
                <option value="04:30 PM EST">04:30 PM EST</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-slate-400 block mb-1">Company / Organization *</label>
              <input type="text" id="cns-company" required placeholder="e.g. Acme Corp" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label class="text-slate-400 block mb-1">Full Name *</label>
              <input type="text" id="cns-name" required placeholder="Jane Doe" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-slate-400 block mb-1">Corporate Email *</label>
              <input type="email" id="cns-email" required placeholder="jane@acme.com" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label class="text-slate-400 block mb-1">Phone Number</label>
              <input type="tel" id="cns-phone" placeholder="+1 (555) 123-4567" class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label class="text-slate-400 block mb-1">Architecture Overview / Key Challenges</label>
            <textarea id="cns-notes" rows="2" placeholder="Tell us about your existing server count, cloud provider, or migration objectives..." class="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"></textarea>
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Confirm 45-Minute Discovery Session
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

window.openConsultationModal = openConsultationModal;

window.handleConsultationSubmit = function(e) {
  e.preventDefault();

  const service = document.getElementById('cns-service').value;
  const date = document.getElementById('cns-date').value;
  const time = document.getElementById('cns-time').value;
  const company = document.getElementById('cns-company').value;
  const fullName = document.getElementById('cns-name').value;
  const email = document.getElementById('cns-email').value;
  const phone = document.getElementById('cns-phone').value;
  const notes = document.getElementById('cns-notes').value;

  const newBooking = store.bookConsultation({
    service,
    date,
    time,
    company,
    fullName,
    email,
    phone,
    notes,
    leadEngineer: "David Ross, Lead Enterprise Architect"
  });

  toast.show(`Consultation confirmed for ${date} at ${time}!`, 'success');
  document.getElementById('modal-container').innerHTML = '';
};
