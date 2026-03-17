const xMenuButton = document.querySelector("[data-menu-toggle]");
const xMobileMenu = document.querySelector("[data-mobile-menu]");

if (xMenuButton && xMobileMenu) {
  xMenuButton.addEventListener("click", () => {
    const isOpen = xMenuButton.getAttribute("aria-expanded") === "true";
    xMenuButton.setAttribute("aria-expanded", String(!isOpen));
    xMobileMenu.hidden = isOpen;
  });
}

const xObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => xObserver.observe(element));
