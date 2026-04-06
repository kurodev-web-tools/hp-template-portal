document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector("[data-header]");
    const menu = document.querySelector("[data-mobile-menu]");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const menuButtons = document.querySelectorAll("[data-menu-button]");
    const menuCloseButtons = document.querySelectorAll("[data-menu-close]");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const mobileLinks = document.querySelectorAll("[data-mobile-link]");
    const menuLinks = document.querySelectorAll("[data-mobile-menu] a[href]");
    const counters = document.querySelectorAll("[data-counter]");
    const revealItems = document.querySelectorAll(".q-reveal");
    const currentPage = body.dataset.page;
    const form = document.querySelector("[data-contact-form]");
    const formMessage = document.querySelector("[data-form-message]");
    const yearTargets = document.querySelectorAll("[data-current-year]");
    const contactJumpLinks = document.querySelectorAll('a[href="#contact-form"]');

    const setMenuState = (isOpen) => {
        if (!menu || !backdrop) {
            return;
        }

        menu.classList.toggle("is-open", isOpen);
        backdrop.classList.toggle("is-open", isOpen);
        body.classList.toggle("menu-open", isOpen);
        menu.setAttribute("aria-hidden", String(!isOpen));
    };

    menuButtons.forEach((button) => {
        button.addEventListener("click", () => setMenuState(true));
    });

    menuCloseButtons.forEach((button) => {
        button.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });

    const updateHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    [...navLinks, ...mobileLinks].forEach((link) => {
        if (link.dataset.page === currentPage) {
            link.setAttribute("aria-current", "page");
        }

        link.addEventListener("click", () => setMenuState(false));
    });

    menuLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));

    if (currentPage === "contact") {
        contactJumpLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                setMenuState(false);

                const target = document.querySelector("#contact-form .q-form-shell .q-section-label") || document.querySelector("[data-contact-form]");
                if (!target) {
                    return;
                }

                window.requestAnimationFrame(() => {
                    const headerOffset = header ? header.getBoundingClientRect().height : 88;
                    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset - 24);
                    window.scrollTo({ top, behavior: "auto" });
                });
            });
        });
    }

    yearTargets.forEach((target) => {
        target.textContent = String(new Date().getFullYear());
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            entry.target.setAttribute("data-visible", "true");
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => revealObserver.observe(item));

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;
            const end = Number(element.dataset.counter || "0");
            const decimals = Number(element.dataset.decimals || "0");
            const suffix = element.dataset.suffix || "";
            const duration = 1200;
            const startTime = performance.now();

            const tick = (timestamp) => {
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = end * eased;
                element.textContent = `${value.toFixed(decimals)}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(element);
        });
    }, { threshold: 0.4 });

    counters.forEach((counter) => counterObserver.observe(counter));

    if (form && formMessage) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const requiredFields = form.querySelectorAll("[required]");
            const invalidField = [...requiredFields].find((field) => !field.value.trim());

            if (invalidField) {
                formMessage.textContent = "未入力の必須項目があります。内容をご確認ください。";
                formMessage.classList.add("is-error");
                formMessage.classList.remove("is-success");
                invalidField.focus();
                return;
            }

            formMessage.textContent = "相談内容を受け付けました。担当窓口で確認後、必要事項を整理してご案内します。";
            formMessage.classList.add("is-success");
            formMessage.classList.remove("is-error");
            form.reset();
        });
    }
});

