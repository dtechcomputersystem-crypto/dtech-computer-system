// Nexora IT Solutions - Toast Notification Service
export const toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'success', duration = 3500) {
    if (!this.container) this.init();

    const icons = {
      success: `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
      info: `<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      warning: `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
      error: `<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
    };

    const borderColors = {
      success: 'border-emerald-500/50 shadow-emerald-900/20',
      info: 'border-blue-500/50 shadow-blue-900/20',
      warning: 'border-amber-500/50 shadow-amber-900/20',
      error: 'border-rose-500/50 shadow-rose-900/20'
    };

    const toastEl = document.createElement('div');
    toastEl.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-xl bg-slate-900/95 border ${borderColors[type]} text-white shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-3 opacity-0 text-sm`;
    toastEl.innerHTML = `
      <div class="flex-shrink-0">${icons[type] || icons.info}</div>
      <div class="flex-1 font-medium leading-snug">${message}</div>
      <button class="text-slate-400 hover:text-white p-1" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    `;

    this.container.appendChild(toastEl);

    // Animate in
    requestAnimationFrame(() => {
      toastEl.classList.remove('translate-y-3', 'opacity-0');
      toastEl.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss
    setTimeout(() => {
      toastEl.classList.add('opacity-0', 'translate-x-4');
      setTimeout(() => toastEl.remove(), 300);
    }, duration);
  }
};
