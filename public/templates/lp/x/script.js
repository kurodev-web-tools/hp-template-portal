/**
 * Template X - Xtreme (Action/Sports)
 * Main JavaScript
 * High Energy & Speed Theme
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    
    // Create mobile menu content
    const menuLinks = [
        { href: '#about', text: 'ABOUT' },
        { href: '#features', text: 'FEATURES' },
        { href: '#gallery', text: 'GALLERY' },
        { href: '#cta', text: 'START' }
    ];
    
    menuLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Reset menu toggle
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
        mobileOverlay.appendChild(a);
    });
    
    document.body.appendChild(mobileOverlay);
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            const isOpen = this.classList.contains('active');
            
            const spans = this.querySelectorAll('span');
            
            if (isOpen) {
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Animate to X
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // Reset
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
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
        '.about-content, .feature-card, .gallery-item, .cta-content'
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
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(targetValue * easeProgress);
                    
                    target.textContent = currentValue;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        target.textContent = targetValue;
                    }
                }
                
                requestAnimationFrame(update);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // Navigation visibility on scroll
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%)';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Hero parallax effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const opacity = 1 - (scrolled / heroHeight);
            
            if (opacity > 0) {
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) skewX(-3deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) skewX(-3deg)';
        });
    });
    
    // Gallery item effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Skewed button interactions
    const skewButtons = document.querySelectorAll('.btn-skew');
    skewButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const text = this.querySelector('.btn-text');
            if (text) {
                text.style.transform = 'skewX(15deg) translateX(5px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const text = this.querySelector('.btn-text');
            if (text) {
                text.style.transform = 'skewX(15deg)';
            }
        });
    });
    
    // Glitch effect on hero image
    const heroImage = document.querySelector('.hero-image-wrapper img');
    if (heroImage) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                heroImage.style.filter = 'brightness(0.4) contrast(1.2) hue-rotate(10deg)';
                setTimeout(() => {
                    heroImage.style.filter = 'brightness(0.4) contrast(1.2)';
                }, 50);
            }
        }, 2000);
    }
    
    // Speed lines animation on scroll
    const createSpeedLine = () => {
        const line = document.createElement('div');
        line.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -10px;
            width: 2px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(180deg, transparent, var(--red), transparent);
            opacity: ${Math.random() * 0.5};
            z-index: 9998;
            pointer-events: none;
            animation: speedLine ${Math.random() * 1 + 0.5}s linear forwards;
        `;
        document.body.appendChild(line);
        
        setTimeout(() => {
            line.remove();
        }, 1500);
    };
    
    // Add speed lines on fast scroll
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
        
        if (scrollSpeed > 20) {
            createSpeedLine();
            if (Math.random() > 0.5) {
                createSpeedLine();
            }
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
    
    // Add speed line animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes speedLine {
            to {
                transform: translateY(110vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
