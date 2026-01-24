
// Global Toggle Function
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const menu = document.querySelector('.wide-mobile-menu');
    const toggle = document.querySelector('.wide-mobile-toggle');
    
    if (menu) {
        menu.classList.toggle('active');
        
        // Scroll Lock
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Icon Toggle
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.horizontal-scroll-container');
    const sections = document.querySelectorAll('.wide-section');
    const navLinks = document.querySelectorAll('.wide-nav a');
    const progressLine = document.querySelector('.progress-line');

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.wide-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 || window.pageXOffset > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
        updateProgress();
        syncNav();
    });

    // ===== Horizontal Scroll Logic (Desktop Only) =====
    if (window.innerWidth > 768) {
        // Simple smoothing for mouse wheel
        window.addEventListener('wheel', (e) => {
            // Check if vertical scrolling is dominant
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                // Add inertia class for smoothness
                if(container) container.classList.add('inertia-active');
                
                const scrollSpeed = 3.0; // Adjusted for better feel
                window.scrollBy({
                    left: e.deltaY * scrollSpeed,
                    behavior: 'auto' 
                });

                updateProgress();
                syncNav();
                
                // Remove inertia class after scroll
                clearTimeout(window.scrollTimeout);
                window.scrollTimeout = setTimeout(() => {
                    if(container) container.classList.remove('inertia-active');
                }, 100);
            }
        }, { passive: false });
    }

    function updateProgress() {
        if (!progressLine) return;
        const maxScroll = (window.innerWidth > 768)
            ? document.documentElement.scrollWidth - window.innerWidth
            : document.documentElement.scrollHeight - window.innerHeight;

        const scrollPos = (window.innerWidth > 768) ? window.scrollX : window.scrollY;
        const scrolled = (maxScroll > 0) ? (scrollPos / maxScroll) * 100 : 0;

        progressLine.style.width = `${scrolled}%`;
    }

    function syncNav() {
        let current = '';
        sections.forEach(section => {
            const sectionPos = (window.innerWidth > 768) ? section.offsetLeft : section.offsetTop;
            const scrollPos = (window.innerWidth > 768) ? window.scrollX : window.scrollY;
            const threshold = (window.innerWidth > 768) ? window.innerWidth / 3 : window.innerHeight / 2;

            if (scrollPos >= sectionPos - threshold) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.opacity = '0.4';
            if (link.getAttribute('href').includes(current)) {
                link.style.opacity = '1';
            }
        });
    }

    // ===== Mobile Menu Logic (Robust) =====
    const toggleBtn = document.querySelector('.wide-mobile-toggle');
    const menu = document.querySelector('.wide-mobile-menu');

    if (toggleBtn) {
        toggleBtn.removeAttribute('onclick');
        toggleBtn.addEventListener('click', window.toggleMenu);
    }

    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            });
        });
    }

    // Scroll to ID (Unified)
    const allLinks = document.querySelectorAll('.wide-nav a, .wide-mobile-menu a');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                if (window.innerWidth > 768) {
                    window.scrollTo({
                        left: target.offsetLeft,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Wide Theme Effects =====
    if (window.PremiumEffects) {
        PremiumEffects.BlurText('h1', { delay: 100, duration: 2000 });
    }
});
