import { $, createEl } from './utils.js';

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
}

function cardHTML(grid, item, title, language) {
  const card = createEl('div', 'card cert-card animate-in');
  const subtitle = item.title.ar && language === 'ar' ? item.title.ar : item.title.ar || '';
  card.innerHTML = `
    <img src="${item.image}" alt="${title}" loading="lazy">
    <h4 style="margin:10px 0 6px;">${title}</h4>
    <div style="color:var(--text-secondary);font-size:14px;">${subtitle}</div>
    <div style="color:var(--text-secondary);margin-top:6px;">${item.issuer}</div>
    <div style="color:var(--text-secondary);font-size:13px;">${item.duration || item.date || ''}</div>
  `;
  grid.appendChild(card);
}

export {
  renderCertTabs,
  renderCertGrid
};

