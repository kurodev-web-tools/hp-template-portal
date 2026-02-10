/**
 * Template T - FutureScale
 * Main JavaScript
 * Features: Scroll animations, mobile menu, hover effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinkItems = document.querySelectorAll('.nav-link, .nav-links .btn');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.section-header, .bento-card, .integration-card, .spec-item, .code-window, .cta-container');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('active');
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
    
    // Parallax effect for glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        glassCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // Navigation background on scroll
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Animate cluster nodes
    const nodes = document.querySelectorAll('.node');
    function animateNodes() {
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.toggle('active');
            }, index * 200);
        });
    }
    
    // Run node animation periodically
    setInterval(animateNodes, 3000);
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
        }
        
        .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: var(--space-xl);
            border-bottom: 1px solid var(--border-glass);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-base);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        @media (min-width: 768px) {
            .nav-links {
                position: static;
                flex-direction: row;
                padding: 0;
                background: transparent;
                border: none;
                transform: none;
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Typewriter effect for code window (optional enhancement)
    const codeContent = document.querySelector('.code-content pre');
    if (codeContent) {
        // Add subtle glow pulse to active code lines
        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('code-visible');
                }
            });
        }, { threshold: 0.5 });
        
        codeObserver.observe(codeContent);
    }
});

// Add custom easing for smoother animations
if (!CSS.supports('animation-timing-function', 'cubic-bezier(0.16, 1, 0.3, 1)')) {
    // Fallback for older browsers
    document.documentElement.style.setProperty('--ease-out-expo', 'ease-out');
}
