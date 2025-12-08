export function setupTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.classList.toggle('dark', savedTheme === 'dark');
  updateThemeIcon(savedTheme === 'dark');

  themeToggle?.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    html.classList.toggle('dark');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(!isDark);
  });
}

function updateThemeIcon(isDark) {
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
  }
}

export function setupLanguage() {
  const langToggle = document.getElementById('langToggle');
  const langEn = document.getElementById('langEn');
  const langAr = document.getElementById('langAr');
  
  let currentLang = localStorage.getItem('lang') || 'en';
  updateLangUI(currentLang);

  langToggle?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLangUI(currentLang);
    window.location.reload(); // Reload to update all content
  });
}

function updateLangUI(lang) {
  const langEn = document.getElementById('langEn');
  const langAr = document.getElementById('langAr');
  
  if (lang === 'en') {
    langEn?.classList.remove('text-white/50');
    langEn?.classList.add('text-primary');
    langAr?.classList.remove('text-primary');
    langAr?.classList.add('text-white/50', 'dark:text-white/50');
  } else {
    langAr?.classList.remove('text-white/50', 'dark:text-white/50');
    langAr?.classList.add('text-primary');
    langEn?.classList.remove('text-primary');
    langEn?.classList.add('text-white/50');
  }
}

export function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        document.getElementById('mobileMenu')?.classList.add('hidden');
      }
    });
  });
}

export function setupMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !menuBtn?.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });
}

