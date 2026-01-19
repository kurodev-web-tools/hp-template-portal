document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Custom Logic)
    // Detached from template-common.js by using <div class="nav"> structure
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            // Toggle body scroll lock
            document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close menu
                menuToggle.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
                // Default anchor behavior will handle scroll (html { scroll-behavior: smooth })
            });
        });
    }

    // Form Submission (Demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'SENT SUCCESSFULLY';
            btn.style.background = '#000';
            btn.style.color = '#fff';

            setTimeout(() => {
                btn.textContent = originalText;
                contactForm.reset();
            }, 3000);
        });
    }

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
});
