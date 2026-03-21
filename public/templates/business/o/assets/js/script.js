document.addEventListener('DOMContentLoaded', () => {
    // Force light theme
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('template-o-theme');

    const mobileToggle = document.querySelector('.organic-mobile-toggle');
    const mobileMenu = document.querySelector('.organic-mobile-menu');
    const menuBackdrop = document.querySelector('.organic-menu-backdrop');

    if (mobileToggle && mobileMenu && menuBackdrop) {
        const toggleMenu = (show) => {
            const isExpanding = show !== undefined ? show : mobileToggle.getAttribute('aria-expanded') === 'false';
            mobileToggle.setAttribute('aria-expanded', isExpanding);
            mobileMenu.classList.toggle('active', isExpanding);
            menuBackdrop.classList.toggle('active', isExpanding);
            document.body.style.overflow = isExpanding ? 'hidden' : '';
        };

        mobileToggle.addEventListener('click', () => toggleMenu());
        menuBackdrop.addEventListener('click', () => toggleMenu(false));

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    const oMobileToggle = document.querySelector('.o-mobile-toggle');
    const oMobileMenu = document.querySelector('.o-mobile-menu');
    const oMenuBackdrop = document.querySelector('.o-menu-backdrop');

    if (oMobileToggle && oMobileMenu && oMenuBackdrop && typeof window.toggleOMenu !== 'function') {
        const resetBars = (bars) => {
            bars.forEach((bar) => {
                bar.style.position = '';
                bar.style.left = '';
                bar.style.top = '';
                bar.style.width = '';
                bar.style.marginTop = '';
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        };

        const setActiveBars = (bars) => {
            bars.forEach((bar) => {
                bar.style.position = 'absolute';
                bar.style.left = '50%';
                bar.style.top = '50%';
                bar.style.width = '1.15rem';
                bar.style.marginTop = '0';
            });
            bars[0].style.transform = 'translate(-50%, -50%) rotate(45deg)';
            bars[1].style.transform = 'translate(-50%, -50%) scaleX(0)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translate(-50%, -50%) rotate(-45deg)';
        };

        const setMenuState = (show) => {
            const bars = oMobileToggle.querySelectorAll('.bar');
            oMobileToggle.classList.toggle('active', show);
            oMobileMenu.classList.toggle('active', show);
            oMenuBackdrop.classList.toggle('active', show);
            oMobileToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
            document.body.style.overflow = show ? 'hidden' : '';

            resetBars(bars);

            if (bars.length === 3 && show) {
                setActiveBars(bars);
            }

            oMobileMenu.querySelectorAll('li').forEach((item, index) => {
                if (show) {
                    setTimeout(() => {
                        item.classList.remove('opacity-0', 'translate-y-5');
                    }, index * 50);
                } else {
                    item.classList.add('opacity-0', 'translate-y-5');
                }
            });
        };

        window.toggleOMenu = () => {
            setMenuState(!oMobileMenu.classList.contains('active'));
        };

        oMenuBackdrop.addEventListener('click', () => setMenuState(false));
        oMobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });
    }

    // Reset horizontal card rails on load so the first card is always shown on mobile.
    const resetRail = (rail) => {
        rail.scrollLeft = 0;
        rail.scrollTo({ left: 0, top: 0, behavior: 'auto' });
    };

    document.querySelectorAll('.o-feature-grid, .o-service-cards').forEach((rail) => {
        resetRail(rail);
        requestAnimationFrame(() => resetRail(rail));
        window.setTimeout(() => resetRail(rail), 120);
    });

    window.addEventListener('load', () => {
        document.querySelectorAll('.o-feature-grid, .o-service-cards').forEach(resetRail);
    });

    window.addEventListener('pageshow', () => {
        document.querySelectorAll('.o-feature-grid, .o-service-cards').forEach(resetRail);
    });

    // Scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.organic-panel, .reveal-up').forEach(el => {
        observer.observe(el);
    });
});
