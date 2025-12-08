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
    <div class="card-header">
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${project.logo}" alt="${title}" width="44" height="44" style="border-radius:10px;border:1px solid var(--card-border);object-fit:cover;">
        <div>
          <h3 style="margin:0;">${title}</h3>
          <div class="meta"><span class="badge">${project.year}</span> <span class="badge">${project.status}</span> <span class="badge">${project.flags.join(' ')}</span></div>
        </div>
      </div>
    </div>
    <p class="text-secondary">${desc}</p>
    <div class="tags">
      ${project.stack.slice(0, 6).map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
    <div class="meta">${project.market.join(', ')}</div>
    ${cover ? `<img data-src="${cover}" alt="${title} preview" class="lazy-img">` : ''}
    <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
      <button class="btn secondary" data-action="open-project" data-id="${project.id}">${lang === 'ar' ? 'التفاصيل' : 'View Details'}</button>
      ${project.links.demo ? `<a class="btn ghost" href="${project.links.demo}" target="_blank">${lang === 'ar' ? 'عرض الديمو' : 'Demo'}</a>` : ''}
      ${project.links.details ? `<a class="btn ghost" href="${project.links.details}" target="_blank">README</a>` : ''}
    </div>
  `;

  card.querySelector('[data-action="open-project"]').addEventListener('click', () => openProjectModal(project));
  card.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a' || e.target.dataset.action === 'open-project') return;
    openProjectModal(project);
  });
  return card;
}

function filterProjects(year) {
  if (year === 'all') return projectsData;
  return projectsData.filter(p => String(p.year) === String(year));
}

function setupFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const year = btn.dataset.filter;
      const filtered = filterProjects(year);
      renderProjects(filtered, currentLang);
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
  setupHashListener
};

