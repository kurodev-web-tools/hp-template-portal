document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuButton = document.querySelector("[data-menu-button]");
    const menu = document.querySelector("[data-mobile-menu]");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const menuLinks = document.querySelectorAll("[data-mobile-menu] a[href]");

    const closeMenu = () => {
        body.classList.remove("menu-open");
        menuButton?.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        body.classList.add("menu-open");
        menuButton?.setAttribute("aria-expanded", "true");
    };

    menuButton?.addEventListener("click", () => {
        if (body.classList.contains("menu-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    backdrop?.addEventListener("click", closeMenu);
    menu?.querySelector("[data-menu-close]")?.addEventListener("click", closeMenu);
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth >= 1024) closeMenu(); });
});
