document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const button = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const revealTargets = document.querySelectorAll(".z-chapter, .z-flow-item, .z-detail-card, .z-divider");

  const setMenu = (open) => {
    if (!menu) return;
    menu.hidden = !open;
    if (backdrop) backdrop.hidden = !open;
    body.style.overflow = open ? "hidden" : "";
    button?.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  };

  button?.addEventListener("click", () => setMenu(button.getAttribute("aria-expanded") !== "true"));
  backdrop?.addEventListener("click", () => setMenu(false));
  menu?.querySelectorAll("a[href]").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth >= 1024) setMenu(false); });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    });

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  setMenu(false);
});
