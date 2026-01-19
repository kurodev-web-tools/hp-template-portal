document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle with Overlay
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    // Create overlay element for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        menuToggle.querySelector('i').textContent = 'close';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.querySelector('i').textContent = 'menu';
    }

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Close sidebar when overlay is clicked
        overlay.addEventListener('click', closeSidebar);

        // Close sidebar when navigation link is clicked (for mobile UX)
        sidebar.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
    }

    // Initialize Premium Effects
    if (window.PremiumEffects) {
        PremiumEffects.BlurText('.blur-text');
        PremiumEffects.CountUp('.count-up');
        PremiumEffects.Tilt('.stat-card', { max: 5 });
    }

    // Active Link Management
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Add some "pulse" effect to flow nodes occasionally
    const nodes = document.querySelectorAll('.flow-node');
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        const node = nodes[randomIndex];
        node.style.boxShadow = '0 0 15px var(--color-primary)';
        node.style.transition = 'box-shadow 0.5s';
        setTimeout(() => {
            node.style.boxShadow = 'none';
        }, 1000);
    }, 3000);
});
