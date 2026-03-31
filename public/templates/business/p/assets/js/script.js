(function () {
    const menu = document.getElementById('pop-mobile-menu');
    const backdrop = document.getElementById('pop-menu-backdrop');
    const toggles = document.querySelectorAll('[data-pop-menu-toggle]');
    const header = document.querySelector('.pop-header');
    const contactForm = document.querySelector('[data-contact-form]');
    const formNote = document.getElementById('pop-form-note');
    const reveals = document.querySelectorAll('.pop-reveal');
    const weCarousel = document.querySelector('.p-we-carousel');
    const weCards = weCarousel ? Array.from(weCarousel.querySelectorAll('.p-we-card')) : [];
    let weCarouselRaf = 0;

    function syncWeCarouselState() {
        if (!weCarousel || !weCards.length || window.innerWidth > 767) return;
        const carouselCenter = weCarousel.scrollLeft + (weCarousel.clientWidth / 2);
        let activeCard = weCards[0];
        let closestDistance = Infinity;

        weCards.forEach(function (card) {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(cardCenter - carouselCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                activeCard = card;
            }
        });

        weCards.forEach(function (card) {
            card.classList.toggle('is-active', card === activeCard);
        });
    }

    function scheduleWeCarouselSync() {
        if (weCarouselRaf) return;
        weCarouselRaf = window.requestAnimationFrame(function () {
            weCarouselRaf = 0;
            syncWeCarouselState();
        });
    }
    let lastTrigger = null;

    function syncHeader() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 10);
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
            toggles.forEach(function (toggle) { toggle.setAttribute('aria-expanded', 'true'); });
            document.body.classList.add('overflow-hidden');
            getFocusableItems()[0]?.focus();
            return;
        }
        menu.classList.remove('active');
        backdrop.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
        menu.setAttribute('inert', '');
        toggles.forEach(function (toggle) { toggle.setAttribute('aria-expanded', 'false'); });
        document.body.classList.remove('overflow-hidden');
        window.setTimeout(finishClose, 300);
        if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    }

    function watchReveal(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }

    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            setMenuState(!menu.classList.contains('active'), event.currentTarget);
        });
    });

    document.querySelectorAll('#pop-mobile-menu a').forEach(function (link) {
        link.addEventListener('click', function () { setMenuState(false); });
    });

    backdrop?.addEventListener('click', function () { setMenuState(false); });

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

    if (contactForm && formNote) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            formNote.textContent = 'お問い合わせありがとうございます。内容を確認し、2 営業日以内を目安にご連絡します。';
        });
    }

    if (weCarousel && weCards.length) {
        syncWeCarouselState();
        weCarousel.addEventListener('scroll', scheduleWeCarouselSync, { passive: true });
        window.addEventListener('resize', scheduleWeCarouselSync, { passive: true });
        window.addEventListener('orientationchange', scheduleWeCarouselSync, { passive: true });
    }

    if ('IntersectionObserver' in window && reveals.length) {
        const observer = new IntersectionObserver(watchReveal, { threshold: 0.15, rootMargin: '0px 0px -32px 0px' });
        reveals.forEach(function (element) { observer.observe(element); });
    } else {
        reveals.forEach(function (element) { element.classList.add('is-visible'); });
    }

    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
    setMenuState(false);
}());
