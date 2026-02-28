/* Xenon Portfolio — theme.js
   - キセノン光の筋（動的生成）
   - SVGアークダイヤルアニメーション
   - Navigation
   - Scroll Reveal
   - Engineボタン
   ===================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Xenon Light Streaks（キセノン光の筋を動的生成）
    // ============================================================
    const linesContainer = document.getElementById('xenonLines');
    const STREAK_COUNT = 6;

    if (linesContainer) {
        for (let i = 0; i < STREAK_COUNT; i++) {
            const line = document.createElement('div');
            line.className = 'x-xenon-line';
            const top = 5 + Math.random() * 90;      // 5%-95% 縦位置
            const width = 200 + Math.random() * 500;  // 200-700px
            const dur = 2.5 + Math.random() * 4;      // 2.5-6.5s
            const delay = -(Math.random() * dur);      // ランダム初期位置
            line.style.cssText = `top:${top}%;width:${width}px;--dur:${dur}s;--delay:${delay}s;`;
            linesContainer.appendChild(line);
        }
    }

    // ============================================================
    // 2. Navigation
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    const openMenu = () => { mobileMenu.hidden = false; };
    const closeMenu = () => { mobileMenu.hidden = true; };

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
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' }), 50);
            }
        });
    });

    // ============================================================
    // 3. Scroll Reveal
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
    // 4. SVGアークダイヤルアニメーション（Intersection起動）
    // ============================================================
    const dialObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const arcs = entry.target.querySelectorAll('.x-dial-arc');
                arcs.forEach(arc => {
                    const pct = parseFloat(arc.dataset.pct || 0) / 100;
                    const circumference = 2 * Math.PI * 42; // r=42
                    const target = circumference - circumference * pct;
                    // 初期値は全オフセット（=非表示）→アニメで目標値へ
                    arc.style.strokeDashoffset = circumference;
                    requestAnimationFrame(() => {
                        arc.style.transition = 'stroke-dashoffset 1.2s ease';
                        arc.style.strokeDashoffset = target;
                    });
                });
                dialObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const panelGrid = document.querySelector('.x-panel-grid');
    panelGrid && dialObs.observe(panelGrid);

    // ============================================================
    // 5. Engine Button
    // ============================================================
    const engineBtn = document.getElementById('engineBtn');
    if (engineBtn) {
        const label = engineBtn.querySelector('.x-engine-label');
        engineBtn.addEventListener('click', () => {
            label.textContent = 'IGNITING...';
            engineBtn.style.boxShadow = '0 0 40px rgba(0,170,255,0.5)';
            setTimeout(() => {
                label.textContent = '✔ CONNECTED';
                setTimeout(() => {
                    label.textContent = 'START ENGINE';
                    engineBtn.style.boxShadow = '';
                }, 4000);
            }, 1800);
        });
    }

});
