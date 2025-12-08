import { $, $$, createEl } from './utils.js';

let projectsData = [];
let currentLang = 'en';
let observer;

export function renderProjects(data, lang = 'en') {
  projectsData = data;
  currentLang = lang;
  const grid = $('#projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  data.forEach(project => {
    grid.appendChild(buildProjectCard(project, lang));
  });
  setupLazyImages();
}

function buildProjectCard(project, lang) {
  const card = createEl('div', 'flex flex-col items-stretch justify-start rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-[#1b1f32] dark:bg-[#1b1f32]');
  const title = project.name[lang] || project.name.en;
  const desc = project.summary?.[lang] || project.summary?.en || project.description?.[lang] || project.description?.en;
  const cover = project.cover || project.logo;
  
  // Get platform icons
  const hasPlayStore = project.links?.play;
  const hasAppStore = project.links?.appStore;
  const isEnterprise = !hasPlayStore && !hasAppStore;

  card.innerHTML = `
    ${cover ? `
      <div class="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover rounded-t-xl" style="background-image: url('${cover}'); background-color: #252b46;"></div>
    ` : `
      <div class="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover rounded-t-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
        <img src="${project.logo}" alt="${title}" class="w-24 h-24 object-contain rounded-xl">
      </div>
    `}
    <div class="flex w-full grow flex-col items-stretch justify-center gap-4 p-4">
      <div class="flex flex-col gap-2">
        <p class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">${title}</p>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-medium text-[#c2c9f0] bg-primary/20 px-2 py-1 rounded-full">${project.year}</span>
          <span class="text-xs font-medium text-[#c2c9f0] bg-primary/20 px-2 py-1 rounded-full">${project.status}</span>
          ${project.flags && project.flags.length ? `
            <div class="flex items-center gap-1">
              ${project.flags.map(flag => `<span class="text-sm">${flag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      <p class="text-[#959dc6] text-sm font-normal leading-relaxed line-clamp-3">
        ${desc}
      </p>
      <div class="flex gap-2 flex-wrap">
        ${project.stack.slice(0, 4).map(tag => `
          <div class="flex h-7 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#252b46] px-3">
            <p class="text-white text-xs font-medium">${tag}</p>
          </div>
        `).join('')}
      </div>
      <div class="flex items-center gap-2 text-xs text-[#959dc6]">
        <span class="material-symbols-outlined text-base">${isEnterprise ? 'domain' : 'storefront'}</span>
        <span>${isEnterprise ? 'Enterprise Distribution' : 'Available on the App Store & Google Play'}</span>
      </div>
      <div class="flex items-center gap-3 pt-2">
        <button onclick="openProjectModalById('${project.id}')" class="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary h-10 px-4 text-sm font-medium leading-normal text-white hover:bg-primary/90 transition-colors">
          <span class="truncate">${lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
        </button>
        ${project.links?.demo ? `
          <a href="${project.links.demo}" target="_blank" onclick="event.stopPropagation()" class="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 h-10 px-4 text-sm font-medium leading-normal text-white hover:bg-primary/30 transition-colors">
            <span class="truncate">${lang === 'ar' ? 'عرض الديمو' : 'Demo'}</span>
          </a>
        ` : ''}
      </div>
    </div>
  `;

  return card;
}

export function setupFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white');
        b.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-white');
      });
      
      btn.classList.add('active', 'bg-primary', 'text-white');
      btn.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-white');
      
      const year = btn.dataset.filter;
      const filtered = filterProjects(year);
      renderProjects(filtered, currentLang);
    });
  });
}

function filterProjects(year) {
  if (year === 'all') return projectsData;
  return projectsData.filter(p => String(p.year) === String(year));
}

export function openProjectModal(project) {
  const modal = $('#projectModal');
  const content = $('#modalContent');
  if (!modal || !content) return;
  
  const title = project.name[currentLang] || project.name.en;
  const overview = project.overview?.[currentLang] || project.overview?.en || project.description?.[currentLang] || project.description?.en || project.summary[currentLang] || project.summary.en;
  const technologies = project.technologies || [];
  const screensFeatures = project.screensFeatures || {};
  const highlights = project.highlights || [];
  const gallery = project.gallery || [];
  const gifs = project.gifs || [];
  const architecture = project.architecture || '';

  content.innerHTML = `
    <div class="sticky top-0 z-10 flex items-center justify-between bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
      <div class="flex size-12 shrink-0 items-center text-white cursor-pointer" onclick="closeProjectModal()">
        <span class="material-symbols-outlined text-2xl">arrow_back_ios</span>
      </div>
      <h2 class="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">${title}</h2>
      <div class="flex w-12 items-center justify-end"></div>
    </div>

    <div class="flex p-4">
      <div class="flex w-full flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-4">
          <div class="aspect-square w-32 min-h-32 rounded-xl bg-cover bg-center bg-no-repeat" style="background-image: url('${project.logo}'); background-color: #252b46;"></div>
          <div class="flex flex-col items-center justify-center">
            <p class="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">${title}</p>
            <p class="text-center text-base font-normal leading-normal text-[#959dc6]">${project.market.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center px-4">
      <div class="flex gap-3 overflow-x-auto p-1">
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#252b46] pl-3 pr-4">
          <span class="material-symbols-outlined text-lg text-white">calendar_today</span>
          <p class="text-sm font-medium leading-normal text-white">${project.year}</p>
        </div>
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#252b46] pl-3 pr-4">
          <span class="material-symbols-outlined text-lg text-white">check_circle</span>
          <p class="text-sm font-medium leading-normal text-white">${project.status}</p>
        </div>
        ${project.flags && project.flags.length ? `
          <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#252b46] pl-3 pr-4">
            <span class="material-symbols-outlined text-lg text-white">flag</span>
            <p class="text-sm font-medium leading-normal text-white">${project.flags.join(' ')}</p>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex w-full max-w-lg flex-wrap gap-3 px-4 py-6">
        ${project.links?.play ? `
          <a href="${project.links.play}" target="_blank" class="flex min-w-[84px] grow cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary h-12 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-primary/90 transition-colors">
            <span class="truncate">Google Play</span>
          </a>
        ` : ''}
        ${project.links?.appStore ? `
          <a href="${project.links.appStore}" target="_blank" class="flex min-w-[84px] grow cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary h-12 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-primary/90 transition-colors">
            <span class="truncate">App Store</span>
          </a>
        ` : ''}
        ${project.links?.website ? `
          <a href="${project.links.website}" target="_blank" class="flex min-w-[84px] grow cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#252b46] h-12 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-[#2d3452] transition-colors">
            <span class="truncate">Visit Website</span>
          </a>
        ` : ''}
        ${project.links?.demo ? `
          <a href="${project.links.demo}" target="_blank" class="flex min-w-[84px] grow cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#252b46] h-12 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-[#2d3452] transition-colors">
            <span class="truncate">Watch Demo</span>
          </a>
        ` : ''}
      </div>
    </div>

    <div class="flex flex-col gap-6 p-4">
      ${buildOverviewSection(overview, project.statusDetails, currentLang)}
      ${technologies.length ? buildTechnologiesSection(technologies, currentLang) : ''}
      ${Object.keys(screensFeatures).length ? buildScreensFeaturesSection(screensFeatures, currentLang) : ''}
      ${highlights.length ? buildHighlightsSection(highlights, currentLang) : ''}
      ${gallery.length ? buildScreenshotsSection(gallery, title, currentLang) : ''}
      ${gifs.length ? buildGifsSection(gifs, currentLang) : ''}
      ${architecture ? buildArchitectureSection(architecture, currentLang) : ''}
    </div>
    <div class="pb-12"></div>
  `;

  modal.classList.remove('hidden');
  if (project.id) {
    history.replaceState(null, '', `#project=${project.id}`);
  }
  setupLazyImages();
  setupGalleryClicks();
  setupAccordions();
}

function buildOverviewSection(overview, statusDetails, lang) {
  const hasStatus = statusDetails && (statusDetails.completed || statusDetails.inProgress || statusDetails.planned);
  return `
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'نظرة عامة' : 'Overview'}</h3>
      <p class="text-sm leading-relaxed text-[#959dc6]">${overview}</p>
      ${hasStatus ? `
        <div class="mt-4 space-y-3">
          ${statusDetails.completed && statusDetails.completed.length ? `
            <div class="rounded-lg bg-[#1a1e34] p-3">
              <h4 class="text-sm font-semibold text-green-400 mb-2">✅ ${lang === 'ar' ? 'مكتمل' : 'Completed'}</h4>
              <ul class="text-xs text-[#959dc6] space-y-1 list-disc list-inside">
                ${statusDetails.completed.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${statusDetails.inProgress && statusDetails.inProgress.length ? `
            <div class="rounded-lg bg-[#1a1e34] p-3">
              <h4 class="text-sm font-semibold text-yellow-400 mb-2">🚧 ${lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</h4>
              <ul class="text-xs text-[#959dc6] space-y-1 list-disc list-inside">
                ${statusDetails.inProgress.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${statusDetails.planned && statusDetails.planned.length ? `
            <div class="rounded-lg bg-[#1a1e34] p-3">
              <h4 class="text-sm font-semibold text-primary mb-2">🔜 ${lang === 'ar' ? 'مخطط' : 'Planned'}</h4>
              <ul class="text-xs text-[#959dc6] space-y-1 list-disc list-inside">
                ${statusDetails.planned.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `;
}

function buildTechnologiesSection(technologies, lang) {
  return `
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'التقنيات' : 'Technologies Used'}</h3>
      <div class="rounded-lg bg-[#1a1e34] p-4">
        <div class="grid grid-cols-[30%_1fr] gap-x-4">
          ${technologies.map((tech, idx) => `
            <div class="col-span-2 grid grid-cols-subgrid ${idx < technologies.length - 1 ? 'border-b border-b-[#363d63]' : ''} py-3">
              <p class="text-sm font-normal leading-normal text-[#959dc6]">${tech.layer}</p>
              <p class="text-sm font-normal leading-normal text-white">${tech.stack}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function buildScreensFeaturesSection(screensFeatures, lang) {
  const modules = Object.keys(screensFeatures);
  if (!modules.length) return '';
  return `
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'الشاشات والميزات' : 'Screens & Features'}</h3>
      <div class="flex flex-col gap-2">
        ${modules.map(module => `
          <details class="group rounded-lg bg-[#1a1e34]">
            <summary class="flex cursor-pointer list-none items-center justify-between p-4 text-sm font-medium text-white">
              ${module}
              <span class="transition-transform duration-200 group-open:rotate-180">
                <span class="material-symbols-outlined">expand_more</span>
              </span>
            </summary>
            <div class="border-t border-t-[#363d63] p-4 text-sm text-[#959dc6]">
              <ul class="list-disc list-inside space-y-2">
                ${screensFeatures[module].map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          </details>
        `).join('')}
      </div>
    </div>
  `;
}

function buildHighlightsSection(highlights, lang) {
  return `
    <div class="flex flex-col gap-3">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'أبرز الميزات' : 'Key Highlights'}</h3>
      <div class="grid grid-cols-2 gap-3">
        ${highlights.slice(0, 4).map(highlight => `
          <div class="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#1a1e34] p-4 text-center">
            <p class="text-xl font-bold text-primary">${highlight.split(':')[0]}</p>
            <p class="text-xs text-[#959dc6] line-clamp-2">${highlight.split(':').slice(1).join(':').trim() || highlight}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildScreenshotsSection(gallery, title, lang) {
  return `
    <div class="flex flex-col gap-3">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'لقطات الشاشة' : 'Screenshots'}</h3>
      <div class="flex gap-3 overflow-x-auto pb-2">
        ${gallery.map(src => `
          <img onclick="openLightbox('${src}')" class="aspect-[9/19] h-80 w-auto flex-shrink-0 rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform" data-src="${src}" alt="${title}" loading="lazy">
        `).join('')}
      </div>
    </div>
  `;
}

function buildGifsSection(gifs, lang) {
  if (!gifs.length) return '';
  const gifItems = gifs.map(g => typeof g === 'string' ? { src: g, title: { en: 'Demo', ar: 'عرض' } } : g);
  return `
    <div class="flex flex-col gap-3">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'عروض توضيحية' : 'Demos'}</h3>
      <div class="flex gap-3 overflow-x-auto pb-2">
        ${gifItems.map(gif => {
          const title = gif.title?.[currentLang] || gif.title?.en || 'Demo';
          return `
            <div class="flex-shrink-0">
              <div class="text-xs text-[#959dc6] mb-2 text-center">${title}</div>
              <img onclick="openLightbox('${gif.src}')" class="aspect-[9/19] h-80 w-auto rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform" data-src="${gif.src}" alt="${title}" loading="lazy">
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function buildArchitectureSection(architecture, lang) {
  return `
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-white">${lang === 'ar' ? 'الهندسة المعمارية' : 'Architecture'}</h3>
      <div class="rounded-lg bg-[#1a1e34] p-4">
        <pre class="text-xs text-[#959dc6] whitespace-pre-wrap font-mono">${architecture}</pre>
      </div>
    </div>
  `;
}

function setupAccordions() {
  // Details elements handle their own accordion behavior
}

function setupLazyImages() {
  const imgs = $$('img[data-src]');
  if (!imgs.length) return;
  
  observer?.disconnect();
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });
  
  imgs.forEach(img => observer.observe(img));
}

function setupGalleryClicks() {
  // Handled by onclick handlers in HTML
}

export function bindModalClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = $('#projectModal');
      if (modal && !modal.classList.contains('hidden')) {
        closeProjectModal();
      }
    }
  });
}

window.openProjectModalById = function(id) {
  const project = projectsData.find(p => p.id === id);
  if (project) {
    openProjectModal(project);
  }
};

window.openLightbox = function(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
  }
};

window.closeLightbox = function() {
  document.getElementById('lightbox')?.classList.add('hidden');
};
