import { $$ } from './utils.js';

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  $$('.section, .card, .project-card').forEach(el => observer.observe(el));
}

export { setupScrollAnimations };

