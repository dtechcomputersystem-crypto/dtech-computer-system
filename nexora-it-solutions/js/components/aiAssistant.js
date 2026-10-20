// Nexora IT Solutions - Interactive IT Support & Diagnostic Assistant
import { store } from '../store.js';

let isAssistantOpen = false;
let assistantMessages = [
  {
    sender: 'bot',
    text: 'Hello! I am your Nexora IT Solutions Advisor. I can help recommend hardware, configure cloud SLAs, or explain warranty and Net-30 purchase terms. How can I assist you today?'
  }
];

export function renderAiAssistant() {
  const mount = document.getElementById('ai-assistant-mount');
  if (!mount) return;

  mount.innerHTML = `
    <!-- Floating Trigger Button -->
    <div class="fixed bottom-5 right-5 z-40">
      ${!isAssistantOpen ? `
        <button onclick="window.toggleAiAssistant()" class="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all group">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 live-indicator"></span>
          <span class="font-semibold">IT Solutions Advisor</span>
          <svg class="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </button>
      ` : `
        <!-- Open Chat Window -->
        <div class="w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5">
          <!-- Header -->
          <div class="p-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm">
                🤖
              </div>
              <div>
                <h4 class="text-xs font-bold leading-tight">Nexora IT Diagnostic AI</h4>
                <span class="text-[10px] text-blue-200 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online • Enterprise Knowledgebase
                </span>
              </div>
            </div>
            <button onclick="window.toggleAiAssistant()" class="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-white/10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Messages Container -->
          <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            ${assistantMessages.map(msg => `
              <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[85%] rounded-xl p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-200'} leading-relaxed shadow">
                  ${msg.text}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Quick Suggestion Buttons -->
          <div class="p-2 bg-slate-950/70 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button onclick="window.sendAiQuickPrompt('Recommend a rack server for virtualization')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
              🖥️ Best Server?
            </button>
            <button onclick="window.sendAiQuickPrompt('What are your 24/7 SLA guarantees?')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
              ⏱️ SLA Matrix?
            </button>
            <button onclick="window.sendAiQuickPrompt('How does corporate PO Net-30 work?')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
              📑 Net-30 PO?
            </button>
          </div>

          <!-- Chat Input -->
          <form onsubmit="window.handleAiSubmit(event)" class="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              id="ai-chat-input" 
              placeholder="Ask about servers, licensing, SLAs..." 
              class="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            />
            <button type="submit" class="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      `}
    </div>
  `;

  // Auto scroll chat
  const chatBox = document.getElementById('ai-chat-messages');
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
}

window.toggleAiAssistant = function() {
  isAssistantOpen = !isAssistantOpen;
  renderAiAssistant();
};

window.sendAiQuickPrompt = function(promptText) {
  assistantMessages.push({ sender: 'user', text: promptText });
  renderAiAssistant();
  respondToQuery(promptText);
};

window.handleAiSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('ai-chat-input');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  assistantMessages.push({ sender: 'user', text: query });
  input.value = '';
  renderAiAssistant();
  respondToQuery(query);
};

function respondToQuery(query) {
  const q = query.toLowerCase();
  let botReply = "";

  if (q.includes('server') || q.includes('dell') || q.includes('hpe') || q.includes('virtualization')) {
    botReply = `For enterprise virtualization and multi-tenant databases, we recommend the <strong>Dell PowerEdge R760</strong> ($4,899) with Dual Xeon Gen 4 & 128GB DDR5 ECC, or the <strong>HPE ProLiant DL380 Gen11</strong> ($5,250). Both come with 5-Year ProSupport 4-Hour Onsite warranties. You can view them now under the "IT Products Store" tab.`;
  } else if (q.includes('firewall') || q.includes('fortinet') || q.includes('cisco') || q.includes('security') || q.includes('threat')) {
    botReply = `For high-throughput network security, the <strong>Fortinet FortiGate 100F</strong> provides 1Gbps threat protection and automated SD-WAN. For edge switching, the <strong>Cisco Catalyst 9300 48-Port PoE+</strong> is our top recommendation.`;
  } else if (q.includes('sla') || q.includes('support') || q.includes('noc') || q.includes('time') || q.includes('response')) {
    botReply = `Nexora operates a 24/7/365 Network Operations Center (NOC). Our SLA guarantees: <strong>Severity 1 (Critical Outage): &lt; 15 minutes</strong> with dedicated SRE escalation; Severity 2: &lt; 30 minutes. You can check the complete matrix on the "IT Services & SLAs" page!`;
  } else if (q.includes('po') || q.includes('net-30') || q.includes('purchase order') || q.includes('payment') || q.includes('terms')) {
    botReply = `Yes! We accept <strong>Net-30 Corporate Purchase Orders</strong> for registered enterprise clients with instant checkout authorization and formal PDF tax invoice generation. We also support Bank Wire (ACH/Fedwire) and Corporate Credit Cards.`;
  } else if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('calculator') || q.includes('rfp')) {
    botReply = `You can get an instant scoped estimate using our <strong>Interactive Cost Estimator</strong>! It calculates monthly SLA retainers, seat licensing, and infrastructure setup based on your exact company size.`;
  } else {
    botReply = `Nexora specializes in enterprise IT hardware procurement, 24/7 Managed NOC services, AWS/Azure cloud engineering, and SOC 2 cybersecurity compliance. Would you like to explore our Products Catalog, or schedule a discovery meeting with a Solutions Architect?`;
  }

  setTimeout(() => {
    assistantMessages.push({ sender: 'bot', text: botReply });
    renderAiAssistant();
  }, 400);
}
