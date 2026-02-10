/**
 * Template S - Smart Workflow
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // FAQ Accordion Animation
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const summary = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (summary && answer) {
            // Set initial max-height for closed state
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';

            summary.addEventListener('click', function (e) {
                e.preventDefault();
                const isOpen = item.hasAttribute('open');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.hasAttribute('open')) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherItem.removeAttribute('open');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.paddingBottom = '0';
                        }
                    }
                });

                if (isOpen) {
                    // Close current item
                    item.removeAttribute('open');
                    answer.style.maxHeight = '0';
                    answer.style.paddingBottom = '0';
                } else {
                    // Open current item
                    item.setAttribute('open', '');
                    answer.style.maxHeight = answer.scrollHeight + 24 + 'px'; // 24px for padding
                    answer.style.paddingBottom = '24px';
                }
            });
        }
    });

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .benefit-row, .pricing-card, .faq-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add CSS class when element is visible
    const style = document.createElement('style');
    style.textContent = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Mockup window animation on scroll
    const mockup = document.querySelector('.mockup-window');
    if (mockup) {
        const mockupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mockup.style.opacity = '1';
                    mockup.style.transform = 'translateY(0)';
                    mockupObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        mockup.style.opacity = '0';
        mockup.style.transform = 'translateY(40px)';
        mockup.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        mockupObserver.observe(mockup);
    }

    // Pricing Tabs Logic (Mobile)
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingGrid = document.querySelector('.pricing-grid');
    const pricingCards = document.querySelectorAll('.pricing-card');

    if (pricingTabs.length > 0 && pricingGrid) {
        // Tab Click Event
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                const targetCard = document.getElementById(targetId);

                if (targetCard) {
                    // Update Active Tab
                    pricingTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Scroll to Card
                    // Use offsetLeft logic for cleaner scroll in overflow-x
                    const cardLeft = targetCard.offsetLeft;
                    const containerPadding = 20; // Matches CSS padding-left (approx)

                    pricingGrid.scrollTo({
                        left: cardLeft - pricingGrid.offsetLeft - 20, // Adjust for padding
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll Spy (Update Tab on Swipe)
        const pricingObserverOptions = {
            root: pricingGrid,
            threshold: 0.6 // 60% visibility triggers active state
        };

        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cardId = entry.target.id;
                    const activeTab = document.querySelector(`.pricing-tab[data-target="${cardId}"]`);

                    if (activeTab) {
                        pricingTabs.forEach(t => t.classList.remove('active'));
                        activeTab.classList.add('active');
                    }
                }
            });
        }, pricingObserverOptions);

        pricingCards.forEach(card => pricingObserver.observe(card));
    }
});
