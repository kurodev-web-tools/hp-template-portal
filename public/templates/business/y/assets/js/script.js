const yMenuButton = document.querySelector("[data-menu-toggle]");
const yMobileMenu = document.querySelector("[data-mobile-menu]");

if (yMenuButton && yMobileMenu) {
  yMenuButton.addEventListener("click", () => {
    const isOpen = yMenuButton.getAttribute("aria-expanded") === "true";
    yMenuButton.setAttribute("aria-expanded", String(!isOpen));
    yMobileMenu.hidden = isOpen;
  });
}

const yObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => yObserver.observe(element));
