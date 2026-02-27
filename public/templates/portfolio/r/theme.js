/* Retro Portfolio — theme.js
   Wow Factor: VHSブート画面ローディング演出
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. WOW FACTOR: VHSブートローディング演出
    //    ローディングバーが100%になるとブート画面が消え
    //    メインコンテンツが表示される
    // ============================================================
    const bootScreen = document.getElementById('bootScreen');
    const mainContent = document.getElementById('mainContent');
    const loadingBar = document.getElementById('loadingBar');
    const loadingPct = document.getElementById('loadingPct');

    let pct = 0;
    const totalDuration = 2800; // ms
    const interval = 40;        // ms per tick
    const increment = (100 / (totalDuration / interval));

    const loadingTimer = setInterval(() => {
        // ランダムな「引っかかり」でリアル感を演出
        const rand = Math.random();
        if (rand > 0.85) return; // 15%の確率で一時停止

        pct = Math.min(pct + increment + (rand * increment * 0.5), 100);
        loadingBar.style.width = pct + '%';
        loadingPct.textContent = Math.floor(pct) + '%';

        if (pct >= 100) {
            clearInterval(loadingTimer);
            loadingPct.textContent = '100%';

            setTimeout(() => {
                bootScreen.classList.add('hidden');
                mainContent.hidden = false;
                // メインコンテンツを表示後にfade-in
                requestAnimationFrame(() => {
                    mainContent.style.opacity = '0';
                    mainContent.style.transition = 'opacity 0.5s ease';
                    requestAnimationFrame(() => {
                        mainContent.style.opacity = '1';
                    });
                });
            }, 400);
        }
    }, interval);

    // ============================================================
    // 2. Navigation
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    function openMenu() {
        mobileMenu.hidden = false;
        navToggle.textContent = '✕';
        navToggle.setAttribute('aria-label', 'メニューを閉じる');
    }

    function closeMenu() {
        mobileMenu.hidden = true;
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-label', 'メニューを開く');
    }

    if (navToggle) navToggle.addEventListener('click', () => mobileMenu.hidden ? openMenu() : closeMenu());
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    // オーバーレイ内リンクでメニューを閉じる
    mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 3. タープカウンター（VHSテープ時計）
    // ============================================================
    const tapeCounter = document.getElementById('tapeCounter');
    if (tapeCounter) {
        let secs = 0;
        setInterval(() => {
            secs++;
            const h = String(Math.floor(secs / 3600)).padStart(2, '0');
            const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
            const s = String(secs % 60).padStart(2, '0');
            tapeCounter.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    // ============================================================
    // 4. ヒーローメニュー: キーボード/ホバーで選択変更 + Enter でジャンプ
    //    <a>タグ化したので text-decoration を消す設定もCSSで対応済み
    // ============================================================
    const menuItems = document.querySelectorAll('.r-menu-item');
    let activeIndex = 0;

    function setActive(index) {
        menuItems.forEach((item, i) => {
            const cursor = item.querySelector('.r-cursor');
            if (i === index) {
                item.classList.add('r-active');
                cursor.textContent = '\u25b6';
            } else {
                item.classList.remove('r-active');
                cursor.textContent = '\u3000';
            }
        });
        activeIndex = index;
    }

    menuItems.forEach((item, i) => {
        item.addEventListener('mouseover', () => setActive(i));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((activeIndex + 1) % menuItems.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((activeIndex - 1 + menuItems.length) % menuItems.length);
        } else if (e.key === 'Enter') {
            // アクティブなメニューアイテム（<a>）をクリック
            const active = menuItems[activeIndex];
            if (active && active.href) active.click();
        }
    });

    // ============================================================
    // 5. Intersection Observer — スクロールReveal
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
    // 6. バーアニメーション（EXPバー + スキルバー）
    // ============================================================
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const w = el.dataset.width || 50;
                setTimeout(() => { el.style.width = w + '%'; }, 200);
                barObs.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.r-rpg-bar, .r-exp-bar').forEach(el => barObs.observe(el));

    // ============================================================
    // 7. Contact Form（コイン投入デモ）
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const coinBtn = document.getElementById('coinBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // コイン音ビジュアル
            coinBtn.textContent = '🪙 INSERTING...';
            coinBtn.disabled = true;

            setTimeout(() => {
                coinBtn.innerHTML = '✔ MESSAGE SENT!';
                contactForm.reset();

                setTimeout(() => {
                    coinBtn.innerHTML = '<span class="r-coin-icon">🪙</span><span>INSERT COIN TO SEND</span>';
                    coinBtn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }

});
