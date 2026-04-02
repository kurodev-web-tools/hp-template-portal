document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuButton = document.querySelector("[data-menu-button]");
    const menu = document.querySelector("[data-mobile-menu]");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const closeButton = document.querySelector("[data-menu-close]");
    const links = document.querySelectorAll("[data-page-link]");
    const currentPage = body.dataset.page;
    const form = document.querySelector("[data-demo-form]");
    const message = document.querySelector("[data-form-message]");

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

    if (form && message) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const required = form.querySelectorAll("[required]");
            const invalid = [...required].find((field) => !field.value.trim());
            if (invalid) {
                message.textContent = "必須項目を入力してください。";
                message.classList.add("is-error");
                message.classList.remove("is-success");
                invalid.focus();
                return;
            }
            message.textContent = "お問い合わせを受け付けました。担当デスクより 2 営業日以内にご連絡します。";
            message.classList.add("is-success");
            message.classList.remove("is-error");
            form.reset();
        });
    }

    // Scroll Stamp Animation Observer
    const stampElements = document.querySelectorAll('.u-paper-card, .u-poster, .u-list-card');
    const stampObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-stamped');
                stampObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    stampElements.forEach(el => {
        // Only observe elements not already in viewport on load to prevent jarring load flash
        if (el.getBoundingClientRect().top > window.innerHeight) {
            stampObserver.observe(el);
        } else {
            el.classList.add('is-stamped');
        }
    });

    setMenuState(false);
});
