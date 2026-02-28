/* Quantum Portfolio — theme.js
   Wow Factor 1: Canvas粒子ネットワーク（マウス反発付き）
   Wow Factor 2: SVG/Canvas重み付きスキルグラフ
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Navigation
    // ============================================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    if (navToggle) {
        const qMobileMenu = document.getElementById('qMobileMenu');
        const qMobileClose = document.getElementById('qMobileClose');

        function openMenu() {
            qMobileMenu.classList.add('active');
            navToggle.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
        function closeMenu() {
            qMobileMenu.classList.remove('active');
            navToggle.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', openMenu);
        if (qMobileClose) qMobileClose.addEventListener('click', closeMenu);

        if (qMobileMenu) {
            qMobileMenu.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', closeMenu);
            });
        }
    }

    // Smooth scroll (GSAP)
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power3.inOut' }), 50);
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                setTimeout(() => gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: 70 }, ease: 'power3.inOut' }), 50);
            }
        });
    });

    // ============================================================
    // 2. WOW FACTOR 1: PARTICLE NETWORK CANVAS
    //    - 粒子が浮遊し、近接すると線（Edge）で繋がる
    //    - マウスに近い粒子は力場で反発する
    // ============================================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles, animId;
        const mouse = { x: -9999, y: -9999 };
        const CONFIG = {
            count: 80,
            speed: 0.5,
            maxDist: 140,        // エッジを引く最大距離
            repelRadius: 100,    // マウス反発半径
            repelForce: 3.5,     // 反発の強さ
            particleR: 2,
            colorBlue: '#0066CC',
            colorCyan: '#00CCFF',
            colorWhite: 'rgba(255,255,255,0.8)',
        };

        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }

        function createParticles() {
            particles = Array.from({ length: CONFIG.count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * CONFIG.speed,
                vy: (Math.random() - 0.5) * CONFIG.speed,
                r: Math.random() * 1.5 + 1,
                color: Math.random() > 0.7 ? CONFIG.colorCyan : CONFIG.colorWhite,
            }));
        }

        function drawFrame() {
            ctx.clearRect(0, 0, W, H);

            // 粒子を更新
            for (const p of particles) {
                // マウス反発
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.repelRadius && dist > 0) {
                    const force = (CONFIG.repelRadius - dist) / CONFIG.repelRadius;
                    p.vx += (dx / dist) * force * CONFIG.repelForce * 0.05;
                    p.vy += (dy / dist) * force * CONFIG.repelForce * 0.05;
                }

                // 速度制限
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > CONFIG.speed * 3) {
                    p.vx = (p.vx / speed) * CONFIG.speed * 3;
                    p.vy = (p.vy / speed) * CONFIG.speed * 3;
                }

                // 速度減衰 (摩擦)
                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;

                // 境界折り返し
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                if (p.x > W) { p.x = W; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                if (p.y > H) { p.y = H; p.vy *= -1; }
            }

            // エッジを描画 (近い粒子ペア間)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONFIG.maxDist) {
                        const alpha = (1 - d / CONFIG.maxDist) * 0.55;
                        // 距離で色を変える
                        const hue = d < 70 ? '0, 204, 255' : '0, 102, 204';
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${hue}, ${alpha})`;
                        ctx.lineWidth = alpha * 1.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // 粒子を描画
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animId = requestAnimationFrame(drawFrame);
        }

        // マウス追跡
        canvas.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = -9999;
            mouse.y = -9999;
        });

        // タッチ対応
        canvas.addEventListener('touchmove', e => {
            const rect = canvas.getBoundingClientRect();
            const t = e.touches[0];
            mouse.x = t.clientX - rect.left;
            mouse.y = t.clientY - rect.top;
        }, { passive: true });

        function init() {
            resize();
            createParticles();
            if (animId) cancelAnimationFrame(animId);
            drawFrame();
        }

        const ro = new ResizeObserver(() => {
            resize();
        });
        ro.observe(canvas.parentElement);

        init();
    }

    // ============================================================
    // 3. WOW FACTOR 2: SKILL GRAPH (Canvas重み付きグラフ)
    // ============================================================
    const skillCanvas = document.getElementById('skillGraph');
    if (skillCanvas) {
        const ctx2 = skillCanvas.getContext('2d');

        const SKILLS = [
            { label: 'PyTorch', level: 0.98, color: '#0066CC', angle: -90 },
            { label: 'Qiskit', level: 0.85, color: '#00CCFF', angle: -18 },
            { label: 'Algorithms', level: 0.92, color: '#CC0066', angle: 54 },
            { label: 'D3.js', level: 0.75, color: '#6600CC', angle: 126 },
            { label: 'SQL/DB', level: 0.80, color: '#00CC99', angle: 198 },
        ];

        const NODE_MIN = 28;
        const NODE_MAX = 52;

        function drawSkillGraph() {
            const W = skillCanvas.width = skillCanvas.offsetWidth;
            const H = skillCanvas.height = Math.min(W * 0.55, 420);
            skillCanvas.height = H;

            const cx = W / 2;
            const cy = H / 2;
            const radius = Math.min(W, H) * 0.33;

            ctx2.clearRect(0, 0, W, H);

            // 背景グリッドライン (同心円)
            ctx2.strokeStyle = 'rgba(0, 102, 204, 0.1)';
            ctx2.lineWidth = 1;
            [0.3, 0.6, 0.9].forEach(r => {
                ctx2.beginPath();
                ctx2.arc(cx, cy, radius * r, 0, Math.PI * 2);
                ctx2.stroke();
            });

            // エッジ (全ノードを中心へ)
            SKILLS.forEach(skill => {
                const rad = (skill.angle * Math.PI) / 180;
                const nx = cx + Math.cos(rad) * radius * skill.level;
                const ny = cy + Math.sin(rad) * radius * skill.level;

                ctx2.beginPath();
                ctx2.strokeStyle = skill.color + '55';
                ctx2.lineWidth = 1.5;
                ctx2.setLineDash([4, 6]);
                ctx2.moveTo(cx, cy);
                ctx2.lineTo(nx, ny);
                ctx2.stroke();
                ctx2.setLineDash([]);
            });

            // 中心ノード
            const gradient = ctx2.createRadialGradient(cx, cy, 0, cx, cy, 32);
            gradient.addColorStop(0, '#1a3a6a');
            gradient.addColorStop(1, '#0A0F1A');
            ctx2.beginPath();
            ctx2.arc(cx, cy, 36, 0, Math.PI * 2);
            ctx2.fillStyle = gradient;
            ctx2.fill();
            ctx2.strokeStyle = 'rgba(0, 204, 255, 0.6)';
            ctx2.lineWidth = 2;
            ctx2.stroke();
            ctx2.shadowColor = '#00CCFF';
            ctx2.shadowBlur = 16;
            ctx2.strokeStyle = 'rgba(0, 204, 255, 0.4)';
            ctx2.stroke();
            ctx2.shadowBlur = 0;

            ctx2.fillStyle = '#00CCFF';
            ctx2.font = `bold 10px 'Roboto Mono', monospace`;
            ctx2.textAlign = 'center';
            ctx2.textBaseline = 'middle';
            ctx2.fillText('CORE', cx, cy);

            // スキルノード
            SKILLS.forEach(skill => {
                const rad = (skill.angle * Math.PI) / 180;
                const nx = cx + Math.cos(rad) * radius * skill.level;
                const ny = cy + Math.sin(rad) * radius * skill.level;
                const nr = NODE_MIN + (NODE_MAX - NODE_MIN) * skill.level;

                // ノード描画
                ctx2.beginPath();
                ctx2.arc(nx, ny, nr / 2, 0, Math.PI * 2);
                ctx2.fillStyle = skill.color + '22';
                ctx2.fill();
                ctx2.strokeStyle = skill.color;
                ctx2.lineWidth = 2;
                ctx2.stroke();
                ctx2.shadowColor = skill.color;
                ctx2.shadowBlur = 12;
                ctx2.stroke();
                ctx2.shadowBlur = 0;

                // ラベル
                ctx2.fillStyle = skill.color;
                ctx2.font = `bold 9px 'Roboto Mono', monospace`;
                ctx2.textAlign = 'center';
                ctx2.textBaseline = 'middle';
                ctx2.fillText(skill.label, nx, ny - 3);

                // パーセント
                ctx2.fillStyle = '#94A3B8';
                ctx2.font = `500 9px 'Roboto Mono', monospace`;
                ctx2.fillText(`${Math.round(skill.level * 100)}%`, nx, ny + 8);
            });
        }

        const ro2 = new ResizeObserver(() => drawSkillGraph());
        ro2.observe(skillCanvas.parentElement);
        drawSkillGraph();
    }

    // ============================================================
    // 4. Intersection Observer — スクロールReveal
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
    // 5. カウントアップ (Aboutスタットカード)
    // ============================================================
    const countObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const duration = 1400;
                const start = performance.now();

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    // easeOutExpo
                    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.textContent = target;
                }

                requestAnimationFrame(tick);
                countObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.q-count').forEach(el => countObs.observe(el));

    // ============================================================
    // 6. Stat bar アニメーション
    // ============================================================
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const width = el.dataset.width;
                setTimeout(() => {
                    el.style.width = width + '%';
                }, 200);
                barObs.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.q-stat-fill').forEach(el => barObs.observe(el));

    // ============================================================
    // 7. Contact Form (デモ送信)
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const responsePanel = document.getElementById('responsePanel');
    const responseId = document.getElementById('responseId');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            submitBtn.textContent = 'PROCESSING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                responseId.textContent = 'MSG-' + Math.floor(Math.random() * 9000 + 1000);
                responsePanel.hidden = false;
                contactForm.reset();
                submitBtn.innerHTML = '<span class="q-send-icon">▶</span> SEND_REQUEST()';
                submitBtn.disabled = false;

                setTimeout(() => { responsePanel.hidden = true; }, 6000);
            }, 1200);
        });
    }

});
