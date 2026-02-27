/* Underwater Portfolio — theme.js
   Wow Factor 1: SVG feTurbulence水中揺らぎ（CSSで適用済み）
   Wow Factor 2: ポートホール（CSSで実装済み）
   Additional: 泡パーティクル生成・酸素タンク充填アニメーション
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

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 2. 泡（Bubble）パーティクル生成
    //    ランダムサイズ・位置・速度で下から上に浮かぶ
    // ============================================================
    function createBubble() {
        const container = document.getElementById('bubblesContainer');
        if (!container) return;

        const bubble = document.createElement('div');
        bubble.className = 'u-bubble';

        const size = 4 + Math.random() * 14;       // 4〜18px
        const left = Math.random() * 100;           // 0〜100vw
        const duration = 8 + Math.random() * 14;   // 8〜22s
        const delay = Math.random() * 4;

        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}vw;
            bottom: -${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${0.3 + Math.random() * 0.5};
        `;

        container.appendChild(bubble);

        // 終了後に削除
        setTimeout(() => bubble.remove(), (duration + delay) * 1000);
    }

    // 初期に20個生成、その後定期的に追加
    for (let i = 0; i < 20; i++) {
        setTimeout(createBubble, Math.random() * 5000);
    }
    setInterval(createBubble, 800);

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
    // 4. 酸素タンクゲージ充填アニメーション
    //    画面内に入ったタイミングでheightをdata-levelに変更
    // ============================================================
    const tankFills = document.querySelectorAll('.u-tank-fill');

    const tankObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const level = fill.dataset.level || '50';
                // 少し遅延を入れてから充填開始（視覚的に分かりやすく）
                setTimeout(() => {
                    fill.style.height = `${level}%`;
                }, 300);
                tankObs.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    tankFills.forEach(fill => tankObs.observe(fill));

    // ============================================================
    // 5. SVGフィルター: feTurbulence seed を動的に変化（より有機的な揺らぎ）
    //    baseFrequencyはSVG内のanimateで制御しているが、
    //    追加でscaleを呼吸するようにゆっくり変化させる
    // ============================================================
    const dispMap = document.querySelector('feDisplacementMap');
    if (dispMap) {
        let t = 0;
        function animateWater() {
            t += 0.003;
            // 4〜8px の間で呼吸するように変化
            const scale = 6 + Math.sin(t) * 2;
            dispMap.setAttribute('scale', scale.toFixed(2));
            requestAnimationFrame(animateWater);
        }
        animateWater();
    }

    // ============================================================
    // 6. Contact Form
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            submitBtn.innerHTML = '<span>Transmitting...</span><span>📡</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>✔ Signal Received!</span>';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Signal</span><span>📡</span>';
                    submitBtn.disabled = false;
                }, 4000);
            }, 2000);
        });
    }

});
