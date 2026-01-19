/* =========================================
   Business Template J: Japanese Modern
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Initialize Premium Effects
    if (window.PremiumEffects) {
        // Blur Text for Hero Title
        // Blur Text for Hero Title (Staggered for parts)
        const blurElements = document.querySelectorAll('.effect-blur');
        blurElements.forEach((el, index) => {
            PremiumEffects.BlurText(el, {
                delay: 100,
                duration: 1500,
                baseDelay: index * 200 // Stagger parts by 200ms
            });
        });

        // CountUp for stats
        PremiumEffects.CountUp('.effect-count', {
            duration: 2500
        });

        // Tilt for service cards
        PremiumEffects.Tilt('.effect-tilt', {
            max: 15,
            perspective: 1000,
            scale: 1.05
        });
    }

    // 3. Custom Mobile Menu (Self-contained for reliability)
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            const isActive = menuToggle.classList.toggle('active');
            mainNav.classList.toggle('mobile-open');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Allow navigation to proceed
                menuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            });
        });

        // Close on click outside (nav background)
        mainNav.addEventListener('click', (e) => {
            if (e.target === mainNav) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
    }

    // 4. Image Error Handling
    // Use event delegation for error events (capture phase)
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            const parent = img.parentElement;

            // Style the parent as a gray placeholder
            if (parent.classList.contains('hero-image-wrap') || parent.classList.contains('service-card')) {
                parent.style.backgroundColor = '#e0e0e0';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                img.style.display = 'none'; // Hide broken image

                // Optional: Add an icon or text
                const icon = document.createElement('span');
                icon.className = 'material-icons';
                icon.innerText = 'image_not_supported';
                icon.style.color = '#999';
                icon.style.fontSize = '2rem';
                parent.appendChild(icon);
            } else {
                // Fallback for other images
                img.style.display = 'none';
                img.style.backgroundColor = '#ccc';
            }
        }
    }, true);
});
