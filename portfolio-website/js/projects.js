import { $, $$, createEl } from './utils.js';

let projectsData = [];
let currentLang = 'en';
let observer;
let lightboxEl;
let lightboxImg;

function renderProjects(data, lang = 'en') {
  projectsData = data;
  currentLang = lang;
  const grid = $('#projectGrid');
  if (!grid) return;
  grid.innerHTML = '';
  data.forEach(project => grid.appendChild(buildProjectCard(project, lang)));
  setupLazyImages();
}

function buildProjectCard(project, lang) {
  const card = createEl('div', 'card project-card animate-in');
  const title = project.name[lang] || project.name.en;
  const desc = project.summary[lang] || project.summary.en;
  const cover = project.cover;

  card.innerHTML = `
    ${cover ? `
      <div class="project-card-cover">
        <img data-src="${cover}" alt="${title}" class="lazy-img project-cover-img">
        <div class="project-cover-overlay"></div>
        <div class="project-logo-overlay">
          <img src="${project.logo}" alt="${title}" class="project-logo-large">
        </div>
      </div>
    ` : `
      <div class="project-logo-container">
        <img src="${project.logo}" alt="${title}" class="project-logo-large">
      </div>
    `}
    <div class="project-card-content">
      <div class="project-card-header">
        <h3 class="project-title">${title}</h3>
        <div class="project-badges">
          <span class="badge">${project.year}</span>
          <span class="badge badge-status">${project.status}</span>
          ${project.flags.length ? `<span class="badge badge-flags">${project.flags.join(' ')}</span>` : ''}
        </div>
      </div>
      <p class="project-description">${desc}</p>
      <div class="project-market">
        <span class="market-label">${lang === 'ar' ? 'السوق:' : 'Market:'}</span>
        <span class="market-value">${project.market.join(', ')}</span>
      </div>
      <div class="project-tags">
        ${project.stack.slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="project-actions">
        <button class="btn secondary" data-action="open-project" data-id="${project.id}">${lang === 'ar' ? 'التفاصيل' : 'View Details'}</button>
        ${project.links.demo ? `<a class="btn ghost" href="${project.links.demo}" target="_blank" onclick="event.stopPropagation()">${lang === 'ar' ? 'عرض الديمو' : 'Demo'}</a>` : ''}
      </div>
    </div>
  `;

  const btn = card.querySelector('[data-action="open-project"]');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectModal(project);
    });
  }
  
  card.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a') || e.target.dataset.action === 'open-project') return;
    openProjectModal(project);
  });
  
  return card;
}

function filterProjects(year) {
  if (year === 'all') return projectsData;
  return projectsData.filter(p => String(p.year) === String(year));
}

function setupFilters() {
  const filterButtons = $$('.filter-btn');
  if (!filterButtons.length) return;
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const year = btn.dataset.filter || 'all';
      const filtered = filterProjects(year);
      
      // Add smooth transition
      const grid = $('#projectGrid');
      if (grid) {
        grid.style.opacity = '0.5';
        grid.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          renderProjects(filtered, currentLang);
          grid.style.opacity = '1';
        }, 150);
      } else {
        renderProjects(filtered, currentLang);
      }
    });
  });
}

function buildMediaSection(project) {
  const gallery = project.gallery || [];
  const gifs = project.gifs || [];
  if (!gallery.length && !gifs.length) return '';
  const mediaItems = [...gallery, ...gifs];
  return `
    <div class="gallery">
      ${mediaItems.map(src => `<img data-src="${src}" alt="${project.name[currentLang] || project.name.en}" class="lazy-img gallery-img">`).join('')}
    </div>
  `;
}

function buildLinks(project, lang) {
  const buttons = [];
  if (project.links.demo) buttons.push(`<a class="btn" href="${project.links.demo}" target="_blank">${lang === 'ar' ? 'ديمو' : 'Demo'}</a>`);
  if (project.links.website) buttons.push(`<a class="btn secondary" href="${project.links.website}" target="_blank">${lang === 'ar' ? 'الموقع' : 'Website'}</a>`);
  if (project.links.play) buttons.push(`<a class="btn ghost" href="${project.links.play}" target="_blank">${lang === 'ar' ? 'Google Play' : 'Google Play'}</a>`);
  if (project.links.appStore) buttons.push(`<a class="btn ghost" href="${project.links.appStore}" target="_blank">${lang === 'ar' ? 'App Store' : 'App Store'}</a>`);
  if (project.links.details) buttons.push(`<a class="btn ghost" href="${project.links.details}" target="_blank">README</a>`);
  return buttons.join('');
}

function openProjectModal(project) {
  const modal = $('#projectModal');
  const content = $('#modalContent');
  if (!modal || !content) return;
  const title = project.name[currentLang] || project.name.en;
  const desc = project.description?.[currentLang] || project.description?.en || project.summary[currentLang] || project.summary.en;
  const highlights = project.highlights || [];

  content.innerHTML = `
    <div class="modal-hero" ${project.cover ? `style="background-image:url('${project.cover}');"` : ''}>
      <div class="modal-hero-overlay"></div>
      <div class="modal-hero-content">
        <div style="display:flex;gap:12px;align-items:center;">
          <img src="${project.logo}" alt="${title}" width="56" height="56" style="border-radius:14px;border:1px solid var(--card-border);object-fit:cover;">
          <div>
            <h3 style="margin:0;">${title}</h3>
            <div class="meta"><span class="badge">${project.year}</span> <span class="badge">${project.status}</span> <span class="badge">${project.flags.join(' ')}</span></div>
          </div>
        </div>
        <p class="text-secondary" style="margin:10px 0 0;">${project.market.join(', ')}</p>
        <div class="meta" style="margin-top:8px;">${project.stack.join(' • ')}</div>
      </div>
    </div>
    <div class="modal-body">
      <p>${desc}</p>
      ${highlights.length ? `<ul class="modal-highlights">${highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
      <div class="tags">${project.stack.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
      <div class="cta-row">${buildLinks(project, currentLang)}</div>
      ${buildMediaSection(project)}
    </div>
  `;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  if (project.id) {
    history.replaceState(null, '', `#project=${project.id}`);
  }
  setupLazyImages();
  setupGalleryClicks();
}

function closeModal() {
  const modal = $('#projectModal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  if (location.hash.startsWith('#project=')) {
    history.replaceState(null, '', '#');
  }
}

function bindModalClose() {
  const modal = $('#projectModal');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function setupLazyImages() {
  const imgs = $$('.lazy-img');
  if (!imgs.length) return;
  observer?.disconnect();
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });
  imgs.forEach(img => observer.observe(img));
}

function setupGalleryClicks() {
  const imgs = $$('.gallery-img');
  if (!imgs.length) return;
  ensureLightbox();
  imgs.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.dataset.src || img.src));
  });
}

function ensureLightbox() {
  lightboxEl = lightboxEl || $('#lightbox');
  lightboxImg = lightboxImg || $('#lightboxImg');
  if (!lightboxEl || !lightboxImg) return;
  lightboxEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox-backdrop') || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxEl.classList.contains('show')) closeLightbox();
  });
}

function openLightbox(src) {
  if (!lightboxEl || !lightboxImg) ensureLightbox();
  if (!lightboxEl || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxEl.classList.add('show');
  lightboxEl.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove('show');
  lightboxEl.setAttribute('aria-hidden', 'true');
}

function handleHashDeepLink() {
  const hash = window.location.hash;
  if (!hash.startsWith('#project=')) return;
  const id = hash.replace('#project=', '');
  const found = projectsData.find(p => p.id === id);
  if (found) openProjectModal(found);
}

function setupHashListener() {
  window.addEventListener('hashchange', () => {
    if (location.hash.startsWith('#project=')) {
      handleHashDeepLink();
    } else {
      closeModal();
    }
  });
}

export {
  renderProjects,
  setupFilters,
  openProjectModal,
  bindModalClose,
  handleHashDeepLink,
  setupHashListener,
  setupLazyImages
};

