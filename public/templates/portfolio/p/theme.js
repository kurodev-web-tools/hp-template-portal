/* Paper Portfolio — theme.js
   ゴールデンマスター標準 JS
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Navigation — Scroll Scrolled Class + Mobile Toggle
    // ============================================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('is-open');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================================
    // 2. Smooth Scroll
    // ============================================================
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                setTimeout(() => {
                    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power3.inOut' });
                }, 50);
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                setTimeout(() => {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: { y: target, offsetY: 70 },
                        ease: 'power3.inOut'
                    });
                }, 50);
            }
        });
    });

    // ============================================================
    // 3. Intersection Observer — [data-reveal] 要素をフェードイン
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================================
    // 4. Hero Name Reveal (ページロード後すぐに発火)
    // ============================================================
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        // 即時または100ms後にrevealを付与（フォントロード待ちなし）
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                heroName.classList.add('revealed');
            });
        });
    }

    // ============================================================
    // 5. About セクション Stationery Heading Reveal
    // ============================================================
    const stationeryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                stationeryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stationery-heading').forEach(el => {
        stationeryObserver.observe(el);
    });

    // ============================================================
    // 6. Pin Cards — スクロールしながら順番に現れる
    // ============================================================
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // 少しずつ遅延させてカードが順番に出現
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = entry.target.dataset.rot || 'rotate(0deg)';
                }, i * 80);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // 各カードの初期傾き値を data 属性に保存して、フェードイン後も傾きを維持
    document.querySelectorAll('.pin-card').forEach((card, i) => {
        // 現在のインライン transform を退避
        const computedStyle = window.getComputedStyle(card);
        const matrix = computedStyle.transform;

        // 初期状態を不可視に
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.5s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease';

        // 元の CSS 回転を data に保存
        const classes = [...card.classList];
        const rotClass = classes.find(c => c.startsWith('pin-card--r'));
        if (rotClass) {
            const rotMap = {
                'pin-card--r1': 'rotate(-2.5deg)',
                'pin-card--r2': 'rotate(1.8deg)',
                'pin-card--r3': 'rotate(-1deg)',
                'pin-card--r4': 'rotate(2.2deg)',
            };
            card.dataset.rot = rotMap[rotClass] || 'rotate(0deg)';
        }

        cardObserver.observe(card);
    });

    // ============================================================
    // 7. Contact Form — 送信ハンドラ (デモ)
    // ============================================================
    const contactForm = document.querySelector('.contact-form');
    const sendBtn = document.querySelector('.send-btn');

    if (contactForm && sendBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sendBtn.innerHTML = '<span>✓</span> Sent!';
            sendBtn.style.background = '#2E7A3A';
            sendBtn.style.boxShadow = '3px 3px 0 #1A5A24';
            setTimeout(() => {
                sendBtn.innerHTML = '<span class="envelope-icon">✉</span> Send Postcard';
                sendBtn.style.background = '';
                sendBtn.style.boxShadow = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ============================================================
    // 8. Section Label + Heading Stagger Reveal
    // ============================================================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-label, .works-heading, .contact-heading').forEach(el => {
        sectionObserver.observe(el);
    });

});
