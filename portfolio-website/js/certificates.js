import { $, createEl } from './utils.js';
import { setupLazyImages } from './projects.js';

let certData = null;
let currentTab = 'experience';
let lang = 'en';

function renderCertTabs(data, language = 'en') {
  certData = data;
  lang = language;
  const tabsWrap = $('#certTabs');
  if (!tabsWrap) return;
  tabsWrap.innerHTML = '';
  data.tabs.forEach(tab => {
    const btn = createEl('button', 'tab', tab.label[lang] || tab.label.en);
    btn.dataset.id = tab.id;
    if (tab.id === currentTab) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentTab = tab.id;
      renderCertTabs(data, lang);
      renderCertGrid(data, tab.id, lang);
    });
    tabsWrap.appendChild(btn);
  });
}

function renderCertGrid(data, tabId = currentTab, language = 'en') {
  const grid = $('#certGrid');
  if (!grid) return;
  const list = data[tabId] || [];
  grid.innerHTML = '';
  list.forEach(item => {
    const title = item.title[language] || item.title.en;
    cardHTML(grid, item, title, language);
  });
  // Setup lazy loading for certificate images
  setTimeout(() => setupLazyImages(), 100);
}

function cardHTML(grid, item, title, language) {
  const card = createEl('div', 'card cert-card animate-in');
  const subtitle = item.title.ar && language === 'ar' ? item.title.ar : item.title.ar || '';
  card.innerHTML = `
    <div class="cert-image-container">
      <img data-src="${item.image}" alt="${title}" class="lazy-img cert-image" loading="lazy">
    </div>
    <div class="cert-content">
      <h4 class="cert-title">${title}</h4>
      ${subtitle ? `<div class="cert-subtitle">${subtitle}</div>` : ''}
      <div class="cert-issuer">${item.issuer}</div>
      ${item.duration || item.date ? `<div class="cert-date">${item.duration || item.date}</div>` : ''}
    </div>
  `;
  card.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightbox && lightboxImg) {
      lightboxImg.src = item.image;
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
  grid.appendChild(card);
}

export {
  renderCertTabs,
  renderCertGrid
};

