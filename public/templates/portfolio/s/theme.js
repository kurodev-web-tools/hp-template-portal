/* Space Portfolio — theme.js
   Wow Factor: CSS orbit公転アニメーション（惑星クリックPopover）
              + ミッションブリーフAccordionリスト
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Navigation
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    function openMenu() {
        mobileMenu.hidden = false;
        navToggle.textContent = '✕';
    }
    function closeMenu() {
        mobileMenu.hidden = true;
        navToggle.textContent = '☰';
    }

    if (navToggle) navToggle.addEventListener('click', () => mobileMenu.hidden ? openMenu() : closeMenu());
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Smooth scroll（ナビリンク）
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 2. Scroll Reveal
    // ============================================================
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

    // ============================================================
    // 3. 惑星Popover（クリックで情報表示）
    //    マウス引力効果はCSS hoverで代用
    // ============================================================
    const popover = document.getElementById('planetPopover');
    const popoverTitle = document.getElementById('popoverTitle');
    const popoverInfo = document.getElementById('popoverInfo');

    document.querySelectorAll('.s-planet').forEach(planet => {
        planet.addEventListener('click', e => {
            e.stopPropagation();
            const name = planet.dataset.planet;
            const info = planet.dataset.info;

            popoverTitle.textContent = name;
            popoverInfo.textContent = info;
            popover.hidden = false;

            // 3秒後に自動で閉じる
            clearTimeout(popover._timer);
            popover._timer = setTimeout(() => { popover.hidden = true; }, 3000);
        });
    });

    // クリックで閉じる
    document.addEventListener('click', () => { popover.hidden = true; });

    // ============================================================
    // 4. WOW FACTOR 2: ミッションブリーフ Accordion
    // ============================================================
    const accTriggers = document.querySelectorAll('.s-acc-trigger');

    accTriggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.s-acc-item');
            const body = document.getElementById(`acc-body-${trigger.dataset.index ?? idx}`);
            const isOpen = item.classList.contains('is-open');

            // 他を閉じる
            document.querySelectorAll('.s-acc-item.is-open').forEach(openItem => {
                openItem.classList.remove('is-open');
                openItem.querySelector('.s-acc-trigger').setAttribute('aria-expanded', 'false');
                const openBody = openItem.querySelector('.s-acc-body');
                openBody.classList.remove('open');
            });

            // 自分を開く/閉じる
            if (!isOpen) {
                item.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
                body.classList.add('open');
            }
        });
    });

    // ============================================================
    // 5. スターフィールド（JSでランダムな星を追加）
    // ============================================================
    const starfield = document.getElementById('starfield');
    if (starfield) {
        const frag = document.createDocumentFragment();
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() < 0.2 ? 2 : 1}px;
                height: ${Math.random() < 0.2 ? 2 : 1}px;
                border-radius: 50%;
                background: rgba(255,255,255,${0.3 + Math.random() * 0.7});
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: starTwinkle ${2 + Math.random() * 4}s ${Math.random() * 4}s ease-in-out infinite;
            `;
            frag.appendChild(star);
        }
        starfield.appendChild(frag);
    }

    // ============================================================
    // 6. Contact Form
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            submitBtn.textContent = '↗ TRANSMITTING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>✔ TRANSMISSION COMPLETE</span>';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Initiate Transmission</span><span class="s-send-icon">↗</span>';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1800);
        });
    }

});

/* CSS アニメーション追加（JSから動的インジェクト） */
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starTwinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);
})();
