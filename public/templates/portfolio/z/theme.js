/**
 * Zen Portfolio Theme — theme.js
 * - Mobile Nav Toggle
 * - Smooth Scroll
 * - ScrollReveal
 * - Header scroll behavior (opacity/border change)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       Mobile Nav
    ============================================================ */
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.z-mobile-link');

    function openMenu() { mobileMenu.hidden = false; document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.hidden = true; document.body.style.overflow = ''; }

    navToggle?.addEventListener('click', openMenu);
    mobileClose?.addEventListener('click', closeMenu);
    mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

    /* ============================================================
       Smooth Scroll (GSAP)
    ============================================================ */
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const targetId = a.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                closeMenu();
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power3.inOut' }), 50);
                return;
            }
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            closeMenu();
            const offset = document.getElementById('header')?.offsetHeight || 0;
            setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: offset }, ease: 'power3.inOut' }), 50);
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
    }, { threshold: 0.08 });

    reveals.forEach(el => revealObs.observe(el));

    /* ============================================================
       Header: スクロールで薄くなる演出（禅らしく控えめに）
    ============================================================ */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 60;
        header?.classList.toggle('z-header-scrolled', scrolled);
    }, { passive: true });

    /* ============================================================
       Works: 波紋エフェクトはCSSで制御済み
       Emailリンク: コピーフィードバック
    ============================================================ */
    const emailLink = document.getElementById('emailLink');
    emailLink?.addEventListener('click', e => {
        // mailto: を優先しつつ、クリップボードコピーも提供
        // デフォルトのmailto:動作を維持
    });

});
