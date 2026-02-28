/* Typography Portfolio — theme.js
   Wow Factor 1: スクロールと逆方向に動くParallaxアウトラインテキスト
   Wow Factor 2: フォント見本シートはCSSで完結
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
    }
    function closeMenu() {
        mobileMenu.hidden = true;
    }

    if (navToggle) navToggle.addEventListener('click', () => mobileMenu.hidden ? openMenu() : closeMenu());
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
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
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: 64 }, ease: 'power3.inOut' }), 50);
            }
        });
    });

    // ============================================================
    // 2. WOW FACTOR 1: Parallax — 背景アウトライン文字の逆スクロール
    //    ページスクロール量 × 係数分だけ X軸をずらす
    //    Word1（左ずれ基準）はスクロールで右に、
    //    Word2（右ずれ基準）はスクロールで左に動く
    // ============================================================
    const hero = document.getElementById('hero');
    const word1 = document.getElementById('bgWord1');
    const word2 = document.getElementById('bgWord2');
    const word3 = document.getElementById('bgWord3');

    function updateParallax() {
        if (!hero) return;
        const heroRect = hero.getBoundingClientRect();
        // ヒーローが画面内にいる間だけ動かす
        if (heroRect.bottom < 0) return;

        const scrollY = window.scrollY;
        const speed1 = 0.18;   // word1 の速度係数
        const speed2 = -0.22;  // word2 は逆方向（負）
        const speed3 = 0.10;

        const offset1 = -8 + scrollY * speed1;  // % + px混在を避けてpx換算
        const offset2 = 8 + scrollY * speed2;
        const offset3 = -4 + scrollY * speed3;

        if (word1) word1.style.transform = `translateX(${offset1}vw)`;
        if (word2) word2.style.transform = `translateX(${offset2}vw) `;
        if (word3) word3.style.transform = `translateX(${offset3}vw)`;
    }

    // rAFでスムーズに更新
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 初回描画
    updateParallax();

    // ============================================================
    // 3. Scroll Reveal
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
    // 4. Works: data-revealの遅延付きReveal（順番にフェード）
    // ============================================================
    const workItems = document.querySelectorAll('.t-work-item');
    const workObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                workObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    workItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        item.style.transform = 'translateY(12px)';
        item.classList.add('t-work-hidden');
        workObs.observe(item);
    });

    workItems.forEach(item => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        }, { threshold: 0.1 });
        obs.observe(item);
    });

    // ============================================================
    // 5. Header: スクロールで slim（縮小モード）
    // ============================================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    }, { passive: true });

});
