const savedLanguage = localStorage.getItem('asha-language') || 'en';
let currentLanguage = savedLanguage;

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-tr]').forEach((element) => {
    const content = element.dataset[language];
    if (content) element.innerHTML = content;
  });
  document.querySelectorAll('[data-language-toggle]').forEach((button) => {
    button.innerHTML = language === 'en' ? 'TR <span>/</span> EN' : 'EN <span>/</span> TR';
    button.setAttribute('aria-label', language === 'en' ? 'Türkçeye geç' : 'Switch to English');
  });
  localStorage.setItem('asha-language', language);
}

document.querySelectorAll('[data-language-toggle]').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(currentLanguage === 'en' ? 'tr' : 'en'));
});

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', open);
  });
}

applyLanguage(currentLanguage);

document.querySelectorAll('a[href="https://instagram.com"]').forEach((link) => {
  link.href = 'https://www.instagram.com/project.asha.turkiye/';
});

document.querySelectorAll('a.full-button, a[href="https://forms.google.com"]').forEach((applicationLink) => {
  applicationLink.href = 'https://forms.gle/9d2ZtqjqCcDtALWJA';
});

document.querySelectorAll('link[rel="preconnect"][href^="https://forms.gle/"]').forEach((link) => {
  link.remove();
});

document.querySelectorAll('.footer-right').forEach((footer) => {
  if (!footer.querySelector('a[href*="linkedin.com/company/project-asha-turkiye"]')) {
    const linkedIn = document.createElement('a');
    linkedIn.href = 'https://www.linkedin.com/company/project-asha-turkiye/?viewAsMember=true';
    linkedIn.target = '_blank';
    linkedIn.rel = 'noreferrer';
    linkedIn.textContent = 'LinkedIn ↗';
    footer.insertBefore(linkedIn, footer.querySelector('span'));
  }
});

const revealItems = document.querySelectorAll('.reveal, .work-list article, .team-card, .apply-grid > div');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));