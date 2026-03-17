document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const button = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
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
  setMenu(false);
});
