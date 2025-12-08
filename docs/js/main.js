import { loadData } from './utils.js';
import { renderProjects, setupFilters, openProjectModal, bindModalClose } from './projects.js';
import { renderCertTabs, renderCertGrid } from './certificates.js';
import { setupTheme, setupLanguage, setupSmoothScroll, setupMobileMenu } from './ui.js';

let currentLang = localStorage.getItem('lang') || 'en';
let personalData = null;
let projectsData = [];
let certsData = null;

async function init() {
  // Load data
  const data = await loadData();
  personalData = data.personal;
  projectsData = data.projects;
  certsData = data.certs;

  // Setup UI
  setupTheme();
  setupLanguage();
  setupSmoothScroll();
  setupMobileMenu();
  bindModalClose();

  // Render content
  renderProjects(projectsData, currentLang);
  setupFilters();
  renderCertTabs(certsData, currentLang);
  renderCertGrid(certsData, 'experience', currentLang);
  renderContact(personalData, currentLang);
  updateI18n(currentLang);

  // Set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Handle hash for deep linking
  handleHashDeepLink();
  window.addEventListener('hashchange', handleHashDeepLink);
}

function renderContact(personal, lang) {
  const container = document.getElementById('contactLinks');
  if (!container || !personal) return;

  const contacts = personal.contacts || [];
  const icons = {
    email: 'mail',
    phone: 'call',
    whatsapp: 'chat',
    linkedin: 'business',
    github: 'code'
  };

  container.innerHTML = contacts.map(contact => {
    const icon = icons[contact.type] || 'contact_support';
    const isWhatsApp = contact.type === 'whatsapp';
    const isLinkedIn = contact.type === 'linkedin';
    const isGitHub = contact.type === 'github';
    
    return `
      <div class="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800/40 p-3 rounded-xl min-h-[72px]">
        <div class="flex items-center gap-4 flex-1">
          <div class="text-zinc-900 dark:text-white flex items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-700/60 shrink-0 size-12">
            ${isWhatsApp ? `
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.049 4.938A9.543 9.543 0 0 0 12.002 2C6.479 2 2 6.479 2 12c0 1.742.465 3.373 1.255 4.773L2 22l5.255-1.226a9.522 9.522 0 0 0 4.747 1.226h.002c5.523 0 10-4.477 10-10a9.53 9.53 0 0 0-2.953-7.062zM12.002 20.134a7.925 7.925 0 0 1-4.04-1.12l-.287-.17-3 0.7.713-2.943-.183-.3A7.927 7.927 0 0 1 4.002 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8.002zM17.169 14.43c-.27-.135-1.597-.787-1.845-.877s-.427-.135-.607.135-.698.877-.857 1.057-.318.203-.588.068a7.38 7.38 0 0 1-2.17-1.335 8.042 8.042 0 0 1-1.5-1.853c-.165-.27-.015-.414.12-.55.121-.121.27-.315.405-.473.135-.15.18-.27.27-.45.09-.18.045-.345-.023-.48L9.13 8.356c-.255-.615-.51-.624-.705-.634s-.39-.015-.607-.015a1.14 1.14 0 0 0-.825.39c-.27.27-.99.975-.99 2.378s1.012 2.76 1.148 2.94.99 1.597 2.415 2.265a12.23 12.23 0 0 0 1.575.585c.66.255 1.05.202 1.44.12 1.155-.24 1.597-.99 1.822-1.35.225-.36.225-.675.15-.81z"></path>
              </svg>
            ` : isLinkedIn ? `
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
              </svg>
            ` : isGitHub ? `
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            ` : `
              <span class="material-symbols-outlined">${icon}</span>
            `}
          </div>
          <div class="flex flex-col justify-center">
            <p class="text-zinc-900 dark:text-white text-base font-medium leading-normal line-clamp-1">${contact.label}</p>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal line-clamp-2">${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
          </div>
        </div>
        <div class="shrink-0">
          ${contact.type === 'email' || contact.type === 'phone' ? `
            <button onclick="copyToClipboard('${contact.label}')" class="text-zinc-900 dark:text-white flex size-8 items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700/60 transition-colors">
              <span class="material-symbols-outlined">content_copy</span>
            </button>
          ` : `
            <a href="${contact.href}" target="_blank" class="text-zinc-900 dark:text-white flex size-7 items-center justify-center">
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </a>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function updateI18n(lang) {
  const translations = {
    en: {
      'hero.name': 'Ashrf Atia',
      'hero.tagline': 'MOBILE ENGINEER • FLUTTER • SAAS',
      'hero.description': 'Experienced Flutter Mobile Engineer specializing in creating high-performance, scalable enterprise applications. Passionate about building intuitive and efficient mobile solutions for the SaaS industry.',
      'hero.viewProjects': 'View Projects',
      'hero.downloadCV': 'Download CV',
      'hero.contact': 'Contact',
      'projects.title': 'Projects',
      'projects.all': 'All',
      'certificates.title': 'Certificates',
      'certificates.experience': 'Experience',
      'certificates.softSkills': 'Soft Skills',
      'certificates.technical': 'Technical',
      'contact.title': 'Contact Information',
      'contact.downloadCV': 'Download CV'
    },
    ar: {
      'hero.name': 'أشرف عطية',
      'hero.tagline': 'مهندس موبايل • فلاتر • SaaS',
      'hero.description': 'مهندس تطبيقات موبايل متخصص في فلاتر، يبني تطبيقات مؤسسية عالية الأداء وقابلة للتوسع. شغوف ببناء حلول موبايل بديهية وفعالة لصناعة SaaS.',
      'hero.viewProjects': 'عرض المشاريع',
      'hero.downloadCV': 'تحميل السيرة الذاتية',
      'hero.contact': 'اتصل',
      'projects.title': 'المشاريع',
      'projects.all': 'الكل',
      'certificates.title': 'الشهادات',
      'certificates.experience': 'الخبرة',
      'certificates.softSkills': 'المهارات الناعمة',
      'certificates.technical': 'التقنية',
      'contact.title': 'معلومات الاتصال',
      'contact.downloadCV': 'تحميل السيرة الذاتية'
    }
  };

  const t = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update HTML dir and lang
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  if (lang === 'ar') {
    document.body.classList.add('font-arabic');
  } else {
    document.body.classList.remove('font-arabic');
  }
}

function handleHashDeepLink() {
  const hash = window.location.hash;
  if (hash.startsWith('#project=')) {
    const id = hash.replace('#project=', '');
    const project = projectsData.find(p => p.id === id);
    if (project) {
      openProjectModal(project);
    }
  }
}

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = 'Copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  });
};

window.closeProjectModal = function() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.add('hidden');
  }
  if (window.location.hash.startsWith('#project=')) {
    history.replaceState(null, '', window.location.pathname);
  }
};

window.closeLightbox = function() {
  document.getElementById('lightbox').classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', init);
