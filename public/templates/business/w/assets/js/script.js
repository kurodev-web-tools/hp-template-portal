// Template W — Wide Horizon Panorama
// === NAV SCROLL HANDLER ===
const nav = document.querySelector('.site-nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// === MOBILE MENU ===
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.mobile-menu-close');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (menuClose) menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

// === REVEAL ANIMATIONS ===
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
}

// === SNAP GALLERY BUTTONS ===
const gallery = document.querySelector('.snap-gallery');
const btnPrev = document.querySelector('[data-gallery-prev]');
const btnNext = document.querySelector('[data-gallery-next]');
if (gallery && btnNext) {
  const scrollAmount = () => gallery.querySelector('.snap-card')?.offsetWidth + 24 || 400;
  btnNext.addEventListener('click', () => gallery.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  if (btnPrev) btnPrev.addEventListener('click', () => gallery.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
}
