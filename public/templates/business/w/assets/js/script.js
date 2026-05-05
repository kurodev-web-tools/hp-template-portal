// Wide Horizon Panorama interactions

// === NAV SCROLL HANDLER ===
const nav = document.querySelector('.site-nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// === MOBILE MENU ===
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose  = document.querySelector('.mobile-menu-close');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (menuClose) menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

// === SNAP GALLERY BUTTONS ===
const gallery = document.querySelector('.snap-gallery');
const btnPrev  = document.querySelector('[data-gallery-prev]');
const btnNext  = document.querySelector('[data-gallery-next]');
if (gallery && btnNext) {
  const scrollAmount = () => (gallery.querySelector('.snap-card')?.offsetWidth ?? 400) + 24;
  btnNext.addEventListener('click', () => gallery.scrollBy({ left:  scrollAmount(), behavior: 'auto' }));
  if (btnPrev) btnPrev.addEventListener('click', () => gallery.scrollBy({ left: -scrollAmount(), behavior: 'auto' }));
}

// === STATIC CONTACT COMPLETION ===
const contactForm = document.querySelector('[data-contact-form]');
const contactSuccess = document.querySelector('[data-contact-success]');
if (contactForm && contactSuccess) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.classList.add('is-hidden');
    contactSuccess.classList.remove('is-hidden');
    contactForm.reset();
  });
}
