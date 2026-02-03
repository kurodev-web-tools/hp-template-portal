
// Global Toggle Function
window.toggleMenu = function() {
    const sidebar = document.querySelector('.saas-sidebar');
    const toggle = document.querySelector('.saas-mobile-toggle');
    if (sidebar) {
        sidebar.classList.toggle('active');
        
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = sidebar.classList.contains('active') ? 'close' : 'menu';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ===== Smart SaaS Theme Effects =====
    if (window.PremiumEffects) {
        // Crisp modern reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 1500 });

        // Tilt for dashboard cards
        PremiumEffects.Tilt('.stat-card, .f-item', { max: 5, scale: 1.05 });
    }

    // ===== Sidebar Active State Sync =====
    const sections = document.querySelectorAll('section');
    const sideLinks = document.querySelectorAll('.sidebar-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        sideLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ===== Mobile Sidebar Logic =====
    const sidebar = document.querySelector('.saas-sidebar');
    const toggle = document.querySelector('.saas-mobile-toggle');

    if (sidebar) {
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                if (toggle) {
                    const icon = toggle.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            });
        });
    }
});

// Mobile Pricing Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('.p-control');
    const container = document.querySelector('.pricing-grid');
    const cards = document.querySelectorAll('.price-card');

    if (!container || controls.length === 0) return;

    // 1. Tab Click -> Scroll
    controls.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Update UI
            controls.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Scroll
            const card = cards[index];
            if (card) {
                const left = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
                container.scrollTo({
                    left: left,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll/Swipe -> Update Tab
    // Use IntersectionObserver to tell which card is center
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find index of intersecting card
                const index = Array.from(cards).indexOf(entry.target);
                if (index !== -1) {
                    controls.forEach(b => b.classList.remove('active'));
                    controls[index].classList.add('active');
                }
            }
        });
    }, {
        root: container,
        threshold: 0.6 // Card must be 60% visible to activate tab
    });

    cards.forEach(card => observer.observe(card));
});

// Mobile Expandable Search Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const searchIcon = searchBar ? searchBar.querySelector('.material-icons') : null;
    const searchInput = searchBar ? searchBar.querySelector('input') : null;

    if (!searchBar || !searchIcon) return;

    // Expand on Click (Mobile only)
    searchIcon.addEventListener('click', (e) => {
        // Only trigger if window is mobile-sized (<= 1024px based on CSS)
        if (window.innerWidth <= 1024) {
            e.stopPropagation(); // Prevent document click from closing immediately
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active') && searchInput) {
                searchInput.focus();
            }
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && searchBar.classList.contains('active')) {
            if (!searchBar.contains(e.target)) {
                searchBar.classList.remove('active');
            }
        }
    });
});
