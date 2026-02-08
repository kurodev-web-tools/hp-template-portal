/**
 * Template J - Just One
 * Minimal Luxury LP - JavaScript
 * Scroll animations and reservation flow
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navToggle = document.querySelector('.nav-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const openInvitationBtn = document.getElementById('open-invitation');
    const modal = document.getElementById('reservation-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const reservationForm = document.getElementById('reservation-form');
    
    // Navigation toggle
    if (navToggle && menuOverlay) {
        navToggle.addEventListener('click', function() {
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Menu close button
    const menuClose = document.querySelector('.menu-close');
    if (menuClose && menuOverlay) {
        menuClose.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Modal functionality
    if (openInvitationBtn && modal) {
        openInvitationBtn.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (modalClose && modal) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay && modal) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('ご予約ありがとうございます。確認メールをお送りいたしました。');
            
            // Close modal
            setTimeout(() => {
                closeModal();
                reservationForm.reset();
            }, 2000);
        });
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--bordeaux);
            color: var(--off-white);
            padding: 1.5rem 2.5rem;
            font-family: var(--font-mincho);
            font-size: 0.9375rem;
            letter-spacing: 0.1em;
            z-index: 1000;
            text-align: center;
            opacity: 0;
            transition: opacity 0.8s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Trigger reflow
        notification.offsetHeight;
        
        // Fade in
        notification.style.opacity = '1';
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 800);
        }, 3000);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For experience items, add staggered delay
                if (entry.target.classList.contains('experience-item')) {
                    const items = document.querySelectorAll('.experience-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const observeElements = [
        '.philosophy-item',
        '.experience-item',
        '.gallery-item',
        '.invitation-card'
    ];
    
    observeElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = 80;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for images - Fixed version using relative positioning
    let ticking = false;
    
    function updateParallax() {
        const parallaxElements = document.querySelectorAll('.philosophy-image img');
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgHeight = rect.height;
            
            // Only apply parallax when image is in or near viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate how far the image is through the viewport (0 to 1)
                // 0 = image just entered from bottom, 1 = image just exited to top
                const scrollProgress = (windowHeight - rect.top) / (windowHeight + imgHeight);
                
                // Clamp value between 0 and 1
                const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
                
                // Calculate parallax offset
                // The image is 130% height, so we have 30% extra space to move
                // We want to move from -15% (top) to -15% + 30% = 15% (bottom)
                const parallaxRange = 30; // 30% movement range
                const offset = -15 + (clampedProgress * parallaxRange);
                
                // Apply transform
                img.style.transform = `translateY(${offset}%)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Initial call to set positions
    updateParallax();
    
    // Text reveal animation on scroll
    const textElements = document.querySelectorAll('.philosophy-desc, .experience-desc');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        textObserver.observe(el);
    });
    
    // Set minimum date for reservation (tomorrow)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Handle visibility change (pause animations when tab is hidden)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });
    
    console.log('✨ L\'ÉCRIN - Minimal Luxury LP initialized');
});