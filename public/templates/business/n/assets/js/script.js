(function () {
    const menu = document.getElementById('metro-mobile-menu');
    const backdrop = document.getElementById('metro-menu-backdrop');
    const toggles = document.querySelectorAll('[data-metro-menu-toggle]');
    const header = document.querySelector('.metro-header');
    const demoForm = document.querySelector('[data-demo-form]');
    const formNote = document.getElementById('metro-form-note');
    const reveals = document.querySelectorAll('.metro-reveal');
    let lastTrigger = null;

    function syncHeader() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 16);
    }

    function getFocusableItems() {
        if (!menu) return [];
        return Array.from(menu.querySelectorAll('a, button')).filter((el) => !el.hasAttribute('disabled'));
    }

    function finishClose() {
        menu.classList.add('hidden');
        backdrop.classList.add('hidden');
    }

    function setMenuState(open, trigger) {
        if (!menu || !backdrop) return;
        if (open) {
            lastTrigger = trigger || document.activeElement;
            menu.classList.remove('hidden');
            backdrop.classList.remove('hidden');
            requestAnimationFrame(function () {
                menu.classList.add('active');
                backdrop.classList.add('active');
            });
            menu.removeAttribute('inert');
            menu.setAttribute('aria-hidden', 'false');
            toggles.forEach(function (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            });
            document.body.classList.add('overflow-hidden');
            getFocusableItems()[0]?.focus();
            return;
        }

        menu.classList.remove('active');
        backdrop.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
        menu.setAttribute('inert', '');
        toggles.forEach(function (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        });
        document.body.classList.remove('overflow-hidden');
        window.setTimeout(finishClose, 300);
        if (lastTrigger && typeof lastTrigger.focus === 'function') {
            lastTrigger.focus();
        }
    }

    function watchReveal(entryList) {
        entryList.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }

    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const open = !menu.classList.contains('active');
            setMenuState(open, event.currentTarget);
        });
    });

    document.querySelectorAll('#metro-mobile-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenuState(false);
        });
    });

    backdrop?.addEventListener('click', function () {
        setMenuState(false);
    });

    document.addEventListener('keydown', function (event) {
        if (!menu || !menu.classList.contains('active')) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            setMenuState(false);
            return;
        }
        if (event.key !== 'Tab') return;
        const focusable = getFocusableItems();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    if (demoForm && formNote) {
        demoForm.addEventListener('submit', function (event) {
            event.preventDefault();
            formNote.textContent = 'Demo inquiry captured locally. Replace action, method, and handler before production use.';
        });
    }

    if ('IntersectionObserver' in window && reveals.length) {
        const observer = new IntersectionObserver(watchReveal, {
            threshold: 0.18,
            rootMargin: '0px 0px -40px 0px'
        });
        reveals.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        reveals.forEach(function (element) {
            element.classList.add('is-visible');
        });
    }

    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
    setMenuState(false);
}());

