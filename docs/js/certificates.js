import { $, createEl } from './utils.js';

let certData = null;
let currentTab = 'experience';
let lang = 'en';

export function renderCertTabs(data, language = 'en') {
  certData = data;
  lang = language;
  const tabs = $$('.cert-tab');
  if (!tabs.length) return;
  
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      tabs.forEach(t => {
        t.classList.remove('active', 'border-b-primary', 'text-white');
        t.classList.add('border-b-transparent', 'text-[#959dc6]');
      });
      btn.classList.add('active', 'border-b-primary', 'text-white');
      btn.classList.remove('border-b-transparent', 'text-[#959dc6]');
      renderCertGrid(data, currentTab, lang);
    });
  });
}

export function renderCertGrid(data, tabId = currentTab, language = 'en') {
  const grid = $('#certificatesGrid');
  if (!grid) return;
  const list = data[tabId] || [];
  grid.innerHTML = '';
  
  list.forEach(item => {
    const title = item.title[language] || item.title.en;
    const card = createEl('div', 'flex flex-col gap-3');
    
    card.innerHTML = `
      <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg bg-[#1E2234] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onclick="openLightbox('${item.image}')">
        <img src="${item.image}" alt="${title}" class="h-16 w-16 object-contain" loading="lazy">
      </div>
      <div>
        <p class="text-white text-base font-medium leading-normal">${title}</p>
        <p class="text-[#959dc6] text-sm font-normal leading-normal">${item.issuer}</p>
        ${item.duration || item.date ? `<p class="text-[#959dc6] text-sm font-normal leading-normal">${item.duration || item.date}</p>` : ''}
      </div>
    `;
    
    grid.appendChild(card);
  });
}
