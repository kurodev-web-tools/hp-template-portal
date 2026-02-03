
// Global Toggle Function
window.toggleMenu = function () {
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                if (index !== -1) {
                    controls.forEach(b => b.classList.remove('active'));
                    controls[index].classList.add('active');
                }
            }
        });
    }, {
        root: container,
        threshold: 0.6
    });

    cards.forEach(card => observer.observe(card));
});

// Mobile Expandable Search Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const searchIcon = searchBar ? searchBar.querySelector('.material-icons') : null;
    const searchInput = searchBar ? searchBar.querySelector('input') : null;

    if (!searchBar || !searchIcon) return;

    // Inject Close Button dynamically
    let closeBtn = document.createElement('span');
    closeBtn.className = 'material-icons search-close';
    closeBtn.textContent = 'close';
    searchBar.appendChild(closeBtn);

    // Expand on Click (Mobile only)
    searchIcon.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.stopPropagation();
            searchBar.classList.add('active');
            if (searchInput) searchInput.focus();
        }
    });

    // Close Button Action
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBar.classList.remove('active');
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
