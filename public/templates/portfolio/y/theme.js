/**
 * Yarn Portfolio Theme — theme.js
 * - Mobile Nav Toggle
 * - Smooth Scroll
 * - ScrollReveal
 * - Envelope Click Open
 * - Liked Button Toggle
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       Mobile Nav
    ============================================================ */
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.y-mobile-link');

    function openMenu() { mobileMenu.hidden = false; document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.hidden = true; document.body.style.overflow = ''; }

    navToggle?.addEventListener('click', openMenu);
    mobileClose?.addEventListener('click', closeMenu);
    mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

    /* ============================================================
       Smooth Scroll
    ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            closeMenu();
            const offset = document.getElementById('header')?.offsetHeight || 0;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });

    /* ============================================================
       ScrollReveal
    ============================================================ */
    const reveals = document.querySelectorAll('[data-reveal]');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => revealObs.observe(el));

    /* ============================================================
       Envelope — クリックでフラップ開閉 (touch対応)
    ============================================================ */
    const envelope = document.getElementById('envelope');
    if (envelope) {
        // タッチデバイスでは hover が効かないのでクリックで toggle
        let opened = false;
        envelope.addEventListener('click', e => {
            // フォームの入力・ボタン操作時は除外
            if (['INPUT', 'TEXTAREA', 'BUTTON', 'LABEL'].includes(e.target.tagName)) return;
            opened = !opened;
            envelope.classList.toggle('envelope-open', opened);
        });
    }

    /* ============================================================
       Liked Button Toggle
    ============================================================ */
    document.querySelectorAll('.y-liked-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const liked = btn.dataset.liked === 'true';
            btn.dataset.liked = !liked;
            btn.textContent = liked ? '❤' : '❤️';
            btn.style.color = liked ? '' : '#d2691e';
        });
    });

    /* ============================================================
       Send Button Demo
    ============================================================ */
    const sendBtn = document.getElementById('sendBtn');
    sendBtn?.addEventListener('click', () => {
        const name = document.getElementById('contactName')?.value?.trim();
        const email = document.getElementById('contactEmail')?.value?.trim();
        const msg = document.getElementById('contactMsg')?.value?.trim();

        if (!name || !email || !msg) {
            sendBtn.textContent = '⚠ Please fill in all fields';
            setTimeout(() => { sendBtn.textContent = '🕊 Send Message'; }, 2000);
            return;
        }

        sendBtn.textContent = '✓ Message Sent!';
        sendBtn.style.background = '#4ade80';
        sendBtn.style.color = '#166534';
        setTimeout(() => {
            sendBtn.textContent = '🕊 Send Message';
            sendBtn.style.background = '';
            sendBtn.style.color = '';
        }, 3000);
    });

    /* ============================================================
       Envelope CSS class (touch open)
    ============================================================ */
    const style = document.createElement('style');
    style.textContent = `
        .envelope-open .y-envelope-flap {
            transform: rotateX(180deg);
            z-index: 0;
        }
        .envelope-open .y-envelope-body {
            transform: translateY(4rem);
        }
    `;
    document.head.appendChild(style);

});
