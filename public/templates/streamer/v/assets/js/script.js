document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = menu ? Array.from(menu.querySelectorAll("a")) : [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    body.classList.add("is-loaded");

    if (toggle && menu) {
        const setMenuState = (isOpen) => {
            toggle.setAttribute("aria-expanded", String(isOpen));
            menu.hidden = !isOpen;
            body.classList.toggle("is-menu-open", isOpen);
        };

        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            setMenuState(!isOpen);
        });

        menuLinks.forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
            }
        });
    }

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const panels = document.querySelectorAll(".clip-card, .section-panel");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        panels.forEach((panel) => observer.observe(panel));
    }
});
