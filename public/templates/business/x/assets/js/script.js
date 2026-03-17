document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const buttons = document.querySelectorAll("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const links = document.querySelectorAll("[data-mobile-menu] a[href]");

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
});
