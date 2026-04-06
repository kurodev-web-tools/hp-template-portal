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

// === REVEAL ANIMATIONS ===
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));
}

// === SNAP GALLERY BUTTONS ===
const gallery = document.querySelector('.snap-gallery');
const btnPrev  = document.querySelector('[data-gallery-prev]');
const btnNext  = document.querySelector('[data-gallery-next]');
if (gallery && btnNext) {
  const scrollAmount = () => (gallery.querySelector('.snap-card')?.offsetWidth ?? 400) + 24;
  btnNext.addEventListener('click', () => gallery.scrollBy({ left:  scrollAmount(), behavior: 'smooth' }));
  if (btnPrev) btnPrev.addEventListener('click', () => gallery.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
}

// === COUNT-UP ANIMATION ===
// Usage: <span class="stat-number" data-count="80" data-suffix="+">80+</span>
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const DURATION = 1800; // ms
  const easeOut  = (t) => 1 - Math.pow(1 - t, 3);

  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix ?? '';
    const start  = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      el.textContent = Math.round(easeOut(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { runCounter(e.target); countObserver.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  counters.forEach(el => countObserver.observe(el));
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
