document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggles = document.querySelectorAll('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu-panel]');
    const backdrop = document.querySelector('[data-menu-backdrop]');
    const links = document.querySelectorAll('[data-menu-panel] a[href]');
    const setOpen = (open) => {
        if (!menu || !backdrop) return;
        menu.classList.toggle('is-open', open);
        backdrop.classList.toggle('is-open', open);
        toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
        body.style.overflow = open ? 'hidden' : '';
    };
    toggles.forEach((toggle) => toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true')));
    backdrop?.addEventListener('click', () => setOpen(false));
    links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 768) setOpen(false); });
    document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
        Array.from(group.querySelectorAll('[data-reveal]')).forEach((node, index) => {
            if (!node.style.getPropertyValue('--reveal-delay')) {
                node.style.setProperty('--reveal-delay', `${index * 80}ms`);
            }
        });
    });

    if (prefersReducedMotion) {
        revealNodes.forEach((node) => node.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -8% 0px',
        });

        revealNodes.forEach((node) => observer.observe(node));
    }

    document.querySelectorAll('[data-demo-form]').forEach((form) => {
        const status = form.querySelector('[data-form-status]');
        const fields = Array.from(form.querySelectorAll('input[required], textarea[required], select[required]'));
        const submitButton = form.querySelector('button[type="submit"]');

        const setStatus = (kind, message) => {
            if (!status) return;
            status.classList.remove('is-success', 'is-error');
            if (kind) status.classList.add(kind);
            status.textContent = message;
        };

        const clearInvalid = (field) => {
            field.removeAttribute('aria-invalid');
        };

        fields.forEach((field) => {
            field.addEventListener('input', () => {
                clearInvalid(field);
            });
            field.addEventListener('change', () => {
                clearInvalid(field);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let firstInvalid = null;
            fields.forEach((field) => {
                const value = field.value.trim();
                const isInvalid = value.length === 0;
                field.setAttribute('aria-invalid', String(isInvalid));
                if (isInvalid && !firstInvalid) {
                    firstInvalid = field;
                }
            });

            if (firstInvalid) {
                setStatus('is-error', '入力が不足している項目があります。必須欄を確認してください。');
                firstInvalid.focus();
                return;
            }

            setStatus('is-success', '送信を受け付けました。2 営業日以内を目安に確認します。');
            form.reset();
            fields.forEach(clearInvalid);

            if (submitButton) {
                submitButton.blur();
            }
        });
    });
});
