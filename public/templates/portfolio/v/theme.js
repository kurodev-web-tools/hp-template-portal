/* Vintage Portfolio — theme.js
   - Navigation (mobile menu, smooth scroll)
   - Scroll Reveal
   - Contact Form (demo)
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Navigation
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    function openMenu() { mobileMenu.hidden = false; if (navToggle) navToggle.textContent = '✕'; }
    function closeMenu() { mobileMenu.hidden = true; if (navToggle) navToggle.textContent = '☰'; }

    navToggle && navToggle.addEventListener('click', () => mobileMenu.hidden ? openMenu() : closeMenu());
    mobileClose && mobileClose.addEventListener('click', closeMenu);
    mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Smooth scroll (GSAP)
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const targetId = a.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power3.inOut' }), 50);
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: 80 }, ease: 'power3.inOut' }), 50);
            }
        });
    });

    // ============================================================
    // 2. Scroll Reveal
    // ============================================================
    const obs = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // スタガー: 各要素を少しずつ遅延表示
                const delay = (entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('revealed'), delay * 100);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        el.dataset.delay = i % 3; // グループごとに 0/100/200ms 遅延
        obs.observe(el);
    });

    // ============================================================
    // 3. Contact Form (demo)
    // ============================================================
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '✔ Letter Sent!';
                form.reset();
                setTimeout(() => {
                    submitBtn.textContent = 'Send Post ✉';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1800);
        });
    }

});
