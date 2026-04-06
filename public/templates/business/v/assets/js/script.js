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
    const accordionButtons = document.querySelectorAll("[data-accordion-button]");

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

    const syncAccordionState = () => {
        const isMobile = window.innerWidth < 768;
        accordionButtons.forEach((button, index) => {
            const panelId = button.getAttribute("aria-controls");
            const panel = panelId ? document.getElementById(panelId) : null;
            if (!panel) {
                return;
            }

            if (!isMobile) {
                button.setAttribute("aria-expanded", "true");
                panel.classList.remove("v-hidden");
                return;
            }

            const shouldOpen = index === 0;
            button.setAttribute("aria-expanded", String(shouldOpen));
            panel.classList.toggle("v-hidden", !shouldOpen);
        });
    };

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            setMenuState(false);
        }

        syncAccordionState();
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

            success.classList.remove("v-hidden");
            success.scrollIntoView({ behavior: "smooth", block: "nearest" });
            form.reset();
        });
    }

    accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (window.innerWidth >= 768) {
                return;
            }

            const panelId = button.getAttribute("aria-controls");
            const panel = panelId ? document.getElementById(panelId) : null;
            if (!panel) {
                return;
            }

            const isExpanded = button.getAttribute("aria-expanded") === "true";
            accordionButtons.forEach((otherButton) => {
                const otherPanelId = otherButton.getAttribute("aria-controls");
                const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
                if (!otherPanel) {
                    return;
                }

                const shouldOpen = otherButton === button ? !isExpanded : false;
                otherButton.setAttribute("aria-expanded", String(shouldOpen));
                otherPanel.classList.toggle("v-hidden", !shouldOpen);
            });
        });
    });

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

    const revealElements = document.querySelectorAll(
        "main > section:not(:first-of-type) .v-poster, " +
        "main > section:not(:first-of-type) .v-stackline, " +
        "main > section:not(:first-of-type) .v-page-title, " +
        "main > section:not(:first-of-type) .v-section-title, " +
        "main > section:not(:first-of-type) .v-manifesto-line, " +
        "main > section:not(:first-of-type) .v-sample-card, " +
        "main > section:not(:first-of-type) .v-detail-card"
    );
    revealElements.forEach((element) => revealObserver.observe(element));

    syncAccordionState();
    setMenuState(false);
});
