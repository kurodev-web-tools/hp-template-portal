/* Watercolor Portfolio — theme.js
   - Navigation
   - Scroll Reveal
   - Contact Form (demo)
   ===================================== */

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

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 2. Scroll Reveal (スタガー付き)
    // ============================================================
    const obs = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => entry.target.classList.add('revealed'), Number(delay));
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
        el.dataset.revealDelay = (i % 4) * 80;
        obs.observe(el);
    });

    // ============================================================
    // 3. Gallery card: hover時グループに「active」クラス付与
    //    (CSS transitionで十分なのでJSは不要だが念のため)
    // ============================================================

    // ============================================================
    // 4. Contact Form (demo)
    // ============================================================
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '✔ Message Sent!';
                form.reset();
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message ✉';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1800);
        });
    }

});
