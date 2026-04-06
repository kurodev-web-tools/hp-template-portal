document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const buttons = document.querySelectorAll("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const links = document.querySelectorAll("[data-mobile-menu] a[href]");

  // === MOBILE MENU ===
  const setMenuState = (isOpen) => {
    if (!menu) return;
    menu.hidden = !isOpen;
    if (backdrop) backdrop.hidden = !isOpen;
    body.style.overflow = isOpen ? "hidden" : "";
    menu.setAttribute("aria-hidden", String(!isOpen));
    buttons.forEach((button) => button.setAttribute("aria-expanded", String(isOpen)));
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setMenuState(button.getAttribute("aria-expanded") !== "true"));
  });

  backdrop?.addEventListener("click", () => setMenuState(false));
  links.forEach((link) => link.addEventListener("click", () => setMenuState(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenuState(false);
  });

  setMenuState(false);

  // === REVEAL ANIMATIONS ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  // === GLITCH EFFECT (Hero Title) ===
  const glitchTitle = document.querySelector('.xr-hero h1 span');
  if (glitchTitle) {
    glitchTitle.classList.add('glitch-active');
    glitchTitle.setAttribute('data-text', glitchTitle.textContent);
    
    // Stop persistent glitch after 3 seconds for readability
    setTimeout(() => {
      glitchTitle.classList.remove('glitch-active');
    }, 4000);
  }
  
  // === HEADER SCROLL ===
  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }
});
