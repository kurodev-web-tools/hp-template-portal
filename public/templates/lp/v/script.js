/**
 * Template V - Vivid Impact (Premium Edition)
 * Main JavaScript
 * High-End Brutalist Design with Image Interactions
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');

    if (menuToggle) {
        // Create mobile menu overlay
        let mobileOverlay = document.querySelector('.mobile-overlay');
        if (!mobileOverlay) {
            mobileOverlay = document.createElement('div');
            mobileOverlay.className = 'mobile-overlay';
            document.body.appendChild(mobileOverlay);

            // Clone nav links to overlay
            const links = document.querySelectorAll('.nav-links a, .nav-links .btn');
            links.forEach(link => {
                const clone = link.cloneNode(true);
                mobileOverlay.appendChild(clone);
            });
        }

        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            const isOpen = this.classList.contains('active');

            if (isOpen) {
                mobileOverlay.style.transform = 'translateX(0)';
                document.body.style.overflow = 'hidden';
                // Animate hamburger to X
                const spans = this.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                mobileOverlay.style.transform = 'translateX(100%)';
                document.body.style.overflow = '';
                // Reset hamburger
                const spans = this.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking on links
        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.style.transform = 'translateX(100%)';
                document.body.style.overflow = '';
                // Reset hamburger
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            });
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
                    const navHeight = document.querySelector('.nav').offsetHeight;
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
        '.feature-card, .gallery-item, .section-header'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-active');
                }, index * 100);
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

    // Navigation background on scroll
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    }, { passive: true });

    // Feature Card Hover Effects with rapid transitions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Trigger image color restore
            const img = this.querySelector('.feature-image img');
            if (img) {
                img.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            const img = this.querySelector('.feature-image img');
            if (img) {
                img.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    });

    // Gallery Item Hover Effects with rapid transitions
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.gallery-image img');
            if (img) {
                img.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transition = 'opacity 0.1s ease';
            }
        });

        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.gallery-image img');
            if (img) {
                img.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transition = 'opacity 0.3s ease';
            }
        });
    });

    // Hero Image Hover Effects
    const heroImages = document.querySelectorAll('.hero-image');
    heroImages.forEach(imgContainer => {
        imgContainer.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });

        imgContainer.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    });

    // Glitch effect intensity on mouse move in hero
    const heroTitle = document.querySelector('.hero-title');
    const hero = document.querySelector('.hero');
    
    if (hero && heroTitle && window.matchMedia('(pointer: fine)').matches) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Increase glitch intensity based on mouse position
            const intensity = Math.abs(x - 0.5) + Math.abs(y - 0.5);
            heroTitle.style.setProperty('--glitch-intensity', intensity);
        });
    }

    // Button magnetic effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Check if it's a number
                if (/\d/.test(text)) {
                    animateNumber(target, text);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    function animateNumber(element, finalText) {
        const numMatch = finalText.match(/[\d.]+/);
        if (!numMatch) return;

        const finalNum = parseFloat(numMatch[0]);
        const isDecimal = finalText.includes('.');
        const suffix = finalText.replace(/[\d.]+/, '');
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = finalNum * easeProgress;

            if (isDecimal) {
                element.textContent = currentNum.toFixed(2) + suffix;
            } else {
                element.textContent = Math.floor(currentNum) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = finalText;
            }
        }

        requestAnimationFrame(update);
    }

    // CTA Button ripple effect
    const ctaButton = document.querySelector('.btn-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 200px;
                height: 200px;
                margin-left: -100px;
                margin-top: -100px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Random glitch trigger for hero title
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() > 0.7) {
                heroTitle.style.animation = 'none';
                heroTitle.offsetHeight; // Trigger reflow
                heroTitle.style.animation = '';
            }
        }, 3000);
    }

    // Parallax effect for hero images on scroll
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImages = document.querySelectorAll('.hero-image img');
            heroImages.forEach((img, index) => {
                const rate = scrolled * (0.02 + index * 0.01);
                img.style.transform = `translateY(${rate}px)`;
            });
        }, { passive: true });
    }
});
