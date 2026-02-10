/**
 * Template U - UniConnect
 * Main JavaScript
 * Global Logistics Platform
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        // Create mobile menu overlay if not exists
        let mobileOverlay = document.querySelector('.mobile-overlay');
        if (!mobileOverlay) {
            mobileOverlay = document.createElement('div');
            mobileOverlay.className = 'mobile-overlay';
            mobileOverlay.style.cssText = `
                position: fixed;
                inset: 72px 0 0 0;
                background: rgba(11, 16, 38, 0.98);
                backdrop-filter: blur(20px);
                z-index: 999;
                display: flex;
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(mobileOverlay);
            
            // Clone nav links to overlay
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                const clone = link.cloneNode(true);
                clone.style.cssText = `
                    font-size: 1.25rem;
                    color: rgba(248, 250, 252, 0.9);
                    padding: 1rem;
                    border-bottom: 1px solid rgba(76, 201, 240, 0.1);
                    text-decoration: none;
                    transition: color 0.3s ease;
                `;
                clone.addEventListener('mouseenter', () => {
                    clone.style.color = '#4CC9F0';
                });
                clone.addEventListener('mouseleave', () => {
                    clone.style.color = 'rgba(248, 250, 252, 0.9)';
                });
                mobileOverlay.appendChild(clone);
            });
        }
        
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const isOpen = this.classList.contains('active');
            
            if (isOpen) {
                mobileOverlay.style.transform = 'translateX(0)';
                document.body.style.overflow = 'hidden';
            } else {
                mobileOverlay.style.transform = 'translateX(100%)';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.style.transform = 'translateX(100%)';
                document.body.style.overflow = '';
            });
        });
    }
    
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
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(
        '.section-header, .stat-card, .feature-card, .network-map, .cta-content'
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
    
    // Add reveal-active class styles
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .reveal.reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Navigation background on scroll
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(11, 16, 38, 0.98)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(11, 16, 38, 0.9)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Animate stats numbers on scroll
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
        // Extract number from text
        const numMatch = finalText.match(/[\d.]+/);
        if (!numMatch) return;
        
        const finalNum = parseFloat(numMatch[0]);
        const isDecimal = finalText.includes('.');
        const suffix = finalText.replace(/[\d.]+/, '');
        const duration = 2000;
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
    
    // Parallax effect for globe on scroll (subtle)
    const globe = document.querySelector('.globe-container');
    
    if (globe && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.05;
            globe.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        }, { passive: true });
    }
    
    // Network node animation - random pulse timing
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
        const pulse = node.querySelector('.node-pulse');
        if (pulse) {
            pulse.style.animationDelay = `${index * 0.5}s`;
            pulse.style.animationDuration = `${3 + Math.random() * 2}s`;
        }
    });
    
    // Globe dots animation enhancement
    const dots = document.querySelectorAll('.globe-dots span');
    dots.forEach((dot, index) => {
        // Randomize animation delay for more organic feel
        dot.style.animationDelay = `${Math.random() * 3}s`;
    });
});

// Add CSS for mobile overlay
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (min-width: 768px) {
        .mobile-overlay {
            display: none !important;
        }
    }
`;
document.head.appendChild(mobileStyles);
