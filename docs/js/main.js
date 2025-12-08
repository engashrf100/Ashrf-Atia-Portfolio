import { $, $$, prefersDark, setTheme, toggleTheme, setLang, translateText, createEl } from './utils.js';
import { renderProjects, setupFilters, bindModalClose, handleHashDeepLink, setupHashListener } from './projects.js';
import { renderCertTabs, renderCertGrid } from './certificates.js';
import { setupScrollAnimations } from './animations.js';

const translations = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.certificates": { en: "Certificates", ar: "الشهادات" },
  "nav.contact": { en: "Contact", ar: "تواصل" },
  "hero.eyebrow": { en: "Mobile Engineer • Flutter • SaaS", ar: "مهندس موبايل • فلاتر • منصات ساس" },
  "overview.title": { en: "What I Do", ar: "ماذا أفعل" },
  "overview.subtitle": { en: "Focus areas and strengths", ar: "مجالات التركيز ونقاط القوة" },
  "projects.title": { en: "Projects", ar: "المشاريع" },
  "projects.subtitle": { en: "Highlighted Flutter and mobile projects", ar: "أبرز مشاريع فلاتر والموبايل" },
  "projects.filters.all": { en: "All", ar: "الكل" },
  "certs.title": { en: "Certificates", ar: "الشهادات" },
  "certs.subtitle": { en: "Experience, soft skills, and technical achievements", ar: "الخبرة والمهارات والشهادات التقنية" },
  "certs.download": { en: "Download CV", ar: "تحميل السيرة الذاتية" },
  "contact.title": { en: "Contact", ar: "التواصل" },
  "contact.subtitle": { en: "Email or WhatsApp", ar: "بريد إلكتروني أو واتساب" }
};

let lang = localStorage.getItem('lang') || 'en';
let personal = null;
let projectsRaw = [];
let certsRaw = null;
let gridSkeletonRendered = false;

async function loadData() {
  const [personalRes, projectsRes, certsRes] = await Promise.all([
    fetch('./data/personal.json'),
    fetch('./data/projects.json'),
    fetch('./data/certificates.json')
  ]);
  personal = await personalRes.json();
  const projects = await projectsRes.json();
  const certs = await certsRes.json();
  projectsRaw = projects;
  certsRaw = certs;
  return { personal, projects, certs };
}

function renderHero() {
  if (!personal) return;
  $('#heroTitle').textContent = personal.title[lang] || personal.title.en;
  $('#heroTagline').textContent = personal.tagline[lang] || personal.tagline.en;

  const actionsWrap = $('#heroActions');
  actionsWrap.innerHTML = '';
  personal.heroActions.forEach(action => {
    const btn = createEl('a', `btn ${action.type === 'secondary' ? 'secondary' : action.type === 'ghost' ? 'ghost' : ''}`);
    btn.href = action.href;
    btn.target = action.href.startsWith('http') || action.href.startsWith('../') ? '_blank' : '_self';
    btn.textContent = action.label[lang] || action.label.en;
    actionsWrap.appendChild(btn);
  });

  const contactsWrap = $('#heroContacts');
  contactsWrap.innerHTML = '';
  personal.contacts.forEach(c => {
    const link = createEl('a');
    link.href = c.href;
    link.textContent = `${c.type}: ${c.label}`;
    contactsWrap.appendChild(link);
  });
}

function renderFocusAreas() {
  const wrap = $('#focusCards');
  if (!wrap || !personal) return;
  wrap.innerHTML = '';
  personal.focusAreas.forEach(area => {
    const card = createEl('div', 'card focus-card animate-in');
    card.innerHTML = `
      <h3>${area.title[lang] || area.title.en}</h3>
      <p style="color:var(--text-secondary);">${area.desc[lang] || area.desc.en}</p>
    `;
    wrap.appendChild(card);
  });
}

function renderContactsSection() {
  const wrap = $('#contactLinks');
  if (!wrap || !personal) return;
  wrap.innerHTML = '';
  personal.contacts.forEach(c => {
    const link = createEl('a');
    link.href = c.href;
    link.textContent = c.label;
    wrap.appendChild(link);
  });
}

function setupNav() {
  const toggle = $('.nav-toggle');
  const links = $('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
}

function setupLangToggle() {
  const btn = $('#langToggle');
  if (!btn) return;
  btn.textContent = lang === 'en' ? 'AR' : 'EN';
  btn.addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';
    btn.textContent = lang === 'en' ? 'AR' : 'EN';
    setLang(lang);
    translateText(lang, translations);
    renderHero();
    renderFocusAreas();
    renderProjects(projectsRaw, lang);
    renderCertTabs(certsRaw, lang);
    renderCertGrid(certsRaw, undefined, lang);
  });
  setLang(lang);
  translateText(lang, translations);
}

function setupThemeToggle() {
  const stored = localStorage.getItem('theme');
  const initial = stored || (prefersDark() ? 'dark' : 'light');
  setTheme(initial);
  const btn = $('#themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
}

async function setupVisitorCounter() {
  const el = $('#visitorCount');
  if (!el || !personal?.analytics) return;
  try {
    const { counterNamespace, counterKey } = personal.analytics;
    const res = await fetch(`https://api.countapi.xyz/hit/${counterNamespace}/${counterKey}`);
    const data = await res.json();
    el.textContent = `Visitors: ${data.value || 1}`;
  } catch (e) {
    el.textContent = '';
  }
}

function initAnalytics() {
  // Lightweight placeholder; user can replace with Plausible/GA by setting data-domain.
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.dataset.domain = 'your-domain.com';
  script.onload = () => {};
  document.head.appendChild(script);
}

async function init() {
  setupThemeToggle();
  setupNav();
  setupLangToggle();
  bindModalClose();

  if (!gridSkeletonRendered) {
    renderProjectSkeletons();
    gridSkeletonRendered = true;
  }

  const { projects, certs } = await loadData();
  renderHero();
  renderFocusAreas();
  renderProjects(projects, lang);
  setupFilters();
  renderCertTabs(certs, lang);
  renderCertGrid(certs, undefined, lang);
  renderContactsSection();
  setupScrollAnimations();
  setupVisitorCounter();
  initAnalytics();
  handleHashDeepLink();
  setupHashListener();

  $('#year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);

function renderProjectSkeletons() {
  const grid = $('#projectGrid');
  if (!grid) return;
  const placeholders = Array.from({ length: 6 }).map(() => {
    const card = createEl('div', 'card project-card');
    card.innerHTML = `
      <div class="skeleton" style="height:18px;width:40%;margin-bottom:8px;"></div>
      <div class="skeleton" style="height:12px;width:70%;margin-bottom:10px;"></div>
      <div class="skeleton" style="height:140px;width:100%;"></div>
    `;
    return card;
  });
  grid.innerHTML = '';
  placeholders.forEach(c => grid.appendChild(c));
}

