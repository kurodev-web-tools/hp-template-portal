const zMenuButton = document.querySelector("[data-menu-toggle]");
const zMobileMenu = document.querySelector("[data-mobile-menu]");

if (zMenuButton && zMobileMenu) {
  zMenuButton.addEventListener("click", () => {
    const isOpen = zMenuButton.getAttribute("aria-expanded") === "true";
    zMenuButton.setAttribute("aria-expanded", String(!isOpen));
    zMobileMenu.hidden = isOpen;
  });
}

const zObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((element) => zObserver.observe(element));
