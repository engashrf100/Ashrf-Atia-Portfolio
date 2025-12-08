const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  const body = document.body;
  if (theme === 'light') {
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
}

function toggleTheme() {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  setTheme(next);
}

function setLang(lang) {
  document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);
}

function translateText(lang, translations) {
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const copy = translations[key];
    if (copy) {
      el.textContent = copy[lang] || copy.en || '';
    }
  });
}

function createEl(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  return el;
}

function debounce(fn, delay = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

export {
  $,
  $$,
  prefersDark,
  setTheme,
  toggleTheme,
  setLang,
  translateText,
  createEl,
  debounce
};

