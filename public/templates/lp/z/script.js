/**
 * Template Z - Zenith (Ultimate Luxury)
 * Premium Particle Animation System
 * Elite Membership Experience
 */

document.addEventListener('DOMContentLoaded', function () {
    // Particle System
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId;
    let mouse = { x: null, y: null };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.02;
        }

        update() {
            // Gentle floating movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Pulse effect
            this.pulse += this.pulseSpeed;
            const pulseFactor = Math.sin(this.pulse) * 0.3 + 0.7;
            this.currentOpacity = this.opacity * pulseFactor;

            // Mouse interaction (subtle repulsion)
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226, 232, 240, ${this.currentOpacity})`;
            ctx.fill();
        }
    }

    // Create particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(80, (canvas.width * canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    // Connect particles with subtle lines
    function connectParticles() {
        const maxDistance = 120;
        const maxConnections = 3;

        for (let i = 0; i < particles.length; i++) {
            let connections = 0;

            for (let j = i + 1; j < particles.length; j++) {
                if (connections >= maxConnections) break;

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(226, 232, 240, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    connections++;
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';

    const menuLinks = [
        { href: '#heritage', text: 'Heritage' },
        { href: '#membership', text: 'Membership' },
        { href: '#concierge', text: 'Concierge' },
        { href: '#inquiry', text: 'Inquiry' }
    ];

    menuLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        mobileOverlay.appendChild(a);
    });

    document.body.appendChild(mobileOverlay);

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            const isOpen = this.classList.contains('active');

            if (isOpen) {
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(
        '.heritage-content, .membership-card, .concierge-content, .inquiry-form'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-active');
                }, index * 150);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Counter animation for heritage stats
    const counters = document.querySelectorAll('.h-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2500;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(finalValue * easeProgress);

                    target.textContent = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        target.textContent = finalValue;
                    }
                }

                requestAnimationFrame(update);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Navigation background on scroll
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Inquiry form handling
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('.invitation-button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span class="button-text">Sending...</span><span class="button-line"></span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span class="button-text">Thank You</span><span class="button-line" style="width: 120px;"></span>';
                btn.style.borderColor = '#10b981';

                setTimeout(() => {
                    alert('ご連絡ありがとうございます。担当者より3営業日以内にご連絡いたします。');
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.borderColor = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Membership card hover effects
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Hero content fade on scroll
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const opacity = 1 - (scrolled / (heroHeight * 0.5));

            if (opacity > 0) {
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // Pause particle animation when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    // Membership Tab/Swipe Sync (Mobile)
    const membershipGrid = document.getElementById('membershipGrid');
    const membershipTabs = document.getElementById('membershipTabs');

    if (membershipGrid && membershipTabs) {
        const tabBtns = membershipTabs.querySelectorAll('.tab-btn');
        const cards = membershipGrid.querySelectorAll('.membership-card');

        // Tab click -> scroll to card
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                if (cards[index]) {
                    cards[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Scroll -> update active tab
        let scrollTimeout;
        membershipGrid.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const gridRect = membershipGrid.getBoundingClientRect();
                const center = gridRect.left + gridRect.width / 2;
                let closestIndex = 0;
                let closestDist = Infinity;

                cards.forEach((card, i) => {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const dist = Math.abs(cardCenter - center);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closestIndex = i;
                    }
                });

                tabBtns.forEach(b => b.classList.remove('active'));
                if (tabBtns[closestIndex]) {
                    tabBtns[closestIndex].classList.add('active');
                }
            }, 50);
        }, { passive: true });
    }
});
