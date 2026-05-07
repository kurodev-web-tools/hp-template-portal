document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-loaded");

    const toggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

    if (toggle && mobileMenu) {
        toggle.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("menu-open", isOpen);
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });
    }

    const sideLinks = Array.from(document.querySelectorAll(".side-nav a"));
    const sections = sideLinks
        .map((link) => {
            const id = link.getAttribute("href");
            return id && id.startsWith("#") ? document.querySelector(id) : null;
        })
        .filter(Boolean);

    if ("IntersectionObserver" in window && sideLinks.length > 0 && sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                sideLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0.01,
        });

        sections.forEach((section) => observer.observe(section));
    }
});
