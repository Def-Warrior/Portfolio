// Shared across every page: mobile nav, scroll-reveal, skill-bar fill-in.
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  // exposed for the inline onclick="closeMenu()" handlers on mobile-menu links
  window.closeMenu = closeMenu;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu || e.target.classList.contains('m-close')) closeMenu();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Subtle fade-up reveal for anything marked .reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const revealIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el) => revealIO.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('visible'));
    }
  }

  // Animate skill bars from 0 to their stated percentage once scrolled into view
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length) {
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const skillIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('filled');
            skillIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      skillBars.forEach((bar) => skillIO.observe(bar));
    } else {
      skillBars.forEach((bar) => bar.classList.add('filled'));
    }
  }
})();
