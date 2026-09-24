document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id], .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = 'top';
    const scrollPos = window.scrollY + 120;

    document.querySelectorAll('main [id]').forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', targetId === currentId);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question').forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.closest('.faq-item').querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : null;
    });
  });

  // Contact form (demo only — no real submission)
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      success.hidden = false;
      form.reset();
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
