document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuButton = document.querySelector("[data-menu-button]");
    const menu = document.querySelector("[data-mobile-menu]");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const closeButton = document.querySelector("[data-menu-close]");
    const menuLinks = document.querySelectorAll("[data-mobile-menu] a[href]");

    const setMenuState = (isOpen) => {
        body.classList.toggle("menu-open", isOpen);
        if (isOpen) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
        menuButton?.setAttribute("aria-expanded", String(isOpen));
        closeButton?.setAttribute("aria-expanded", String(isOpen));
        menu?.setAttribute("aria-hidden", String(!isOpen));
        if (backdrop) {
            backdrop.hidden = !isOpen;
        }
    };

    menuButton?.addEventListener("click", () => setMenuState(!(menuButton.getAttribute("aria-expanded") === "true")));
    closeButton?.addEventListener("click", () => setMenuState(false));
    backdrop?.addEventListener("click", () => setMenuState(false));
    menuLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuState(false); });
    window.addEventListener("resize", () => { if (window.innerWidth >= 1024) setMenuState(false); });

    setMenuState(false);
});
