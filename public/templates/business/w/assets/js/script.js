const wMenuButton = document.querySelector("[data-menu-toggle]");
const wMobileMenu = document.querySelector("[data-mobile-menu]");

if (wMenuButton && wMobileMenu) {
  wMenuButton.addEventListener("click", () => {
    const isOpen = wMenuButton.getAttribute("aria-expanded") === "true";
    wMenuButton.setAttribute("aria-expanded", String(!isOpen));
    wMobileMenu.hidden = isOpen;
  });
}

const wObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((element) => wObserver.observe(element));
