/**
 * Template W - Wa (Japanese Modern)
 * Main JavaScript
 * Modern Zen Theme with Vertical Writing
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    
    // Create mobile menu content
    const menuLinks = [
        { href: '#concept', text: 'Concept' },
        { href: '#features', text: 'Features' },
        { href: '#gallery', text: 'Gallery' },
        { href: '#cta', text: 'Reservation' }
    ];
    
    menuLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Reset menu toggle
            const lines = menuToggle.querySelectorAll('.menu-line');
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        });
        mobileOverlay.appendChild(a);
    });
    
    document.body.appendChild(mobileOverlay);
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            const isOpen = this.classList.contains('active');
            
            const lines = this.querySelectorAll('.menu-line');
            
            if (isOpen) {
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Animate to X
                lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // Reset
                lines[0].style.transform = '';
                lines[1].style.opacity = '1';
                lines[2].style.transform = '';
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
        '.concept-content, .feature-card, .gallery-item, .cta-content'
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
    
    // Navigation visibility on scroll
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(28, 28, 28, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Parallax effect for concept image
    const conceptImage = document.querySelector('.concept-image img');
    if (conceptImage && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const conceptSection = document.querySelector('.concept');
            if (conceptSection) {
                const rect = conceptSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const rate = (scrolled - conceptSection.offsetTop) * 0.05;
                    conceptImage.style.transform = `translateY(${rate}px)`;
                }
            }
        }, { passive: true });
    }
    
    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(10px)';
                caption.style.opacity = '0.9';
            }
        });
    });
    
    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const text = this.querySelector('.btn-text');
            if (text) {
                text.style.transform = 'translateX(5px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const text = this.querySelector('.btn-text');
            if (text) {
                text.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Add scroll-based fade for hero
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
    
    // Initialize title characters animation
    const titleChars = document.querySelectorAll('.title-char');
    titleChars.forEach((char, index) => {
        char.style.opacity = '0';
        setTimeout(() => {
            char.style.opacity = '1';
        }, 200 * (index + 1));
    });
});
