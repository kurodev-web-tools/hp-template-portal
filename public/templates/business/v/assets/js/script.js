document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuButton = document.querySelector("[data-menu-button]");
    const menu = document.querySelector("[data-mobile-menu]");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const closeButton = document.querySelector("[data-menu-close]");
    const links = document.querySelectorAll("[data-page-link]");
    const currentPage = body.dataset.page;
    const form = document.querySelector("[data-contact-form]");
    const success = document.querySelector("[data-contact-success]");

    const setMenuState = (isOpen) => {
        body.classList.toggle("menu-open", isOpen);
        menuButton?.setAttribute("aria-expanded", String(isOpen));
        menu?.setAttribute("aria-hidden", String(!isOpen));
    };

    menuButton?.addEventListener("click", () => setMenuState(!(menuButton.getAttribute("aria-expanded") === "true")));
    closeButton?.addEventListener("click", () => setMenuState(false));
    backdrop?.addEventListener("click", () => setMenuState(false));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            setMenuState(false);
        }
    });

    links.forEach((link) => {
        if (link.dataset.pageLink === currentPage) {
            link.setAttribute("aria-current", "page");
        }
        link.addEventListener("click", () => setMenuState(false));
    });

    if (form && success) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            success.classList.remove("hidden");
            success.scrollIntoView({ behavior: "smooth", block: "nearest" });
            form.reset();
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".v-poster, .v-stackline, .v-page-title, .v-section-title, .v-manifesto-line, .v-sample-card, .v-detail-card");
    revealElements.forEach((element) => revealObserver.observe(element));

    setMenuState(false);
});
