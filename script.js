const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));
