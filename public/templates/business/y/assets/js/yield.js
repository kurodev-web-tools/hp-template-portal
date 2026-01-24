
// Global Toggle Function
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const overlay = document.querySelector('.mobile-menu-overlay');
    const toggle = document.querySelector('.mobile-toggle');
    
    if (overlay) {
        const isActive = overlay.classList.toggle('active');
        if(toggle) toggle.classList.toggle('active');
        
        // Scroll Lock
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.yield-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Minimal entrance observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ===== Mobile Menu Logic (Robust) =====
    const toggleBtn = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (toggleBtn) {
        // Use global toggle
        toggleBtn.removeAttribute('onclick'); // Ensure clean state
        toggleBtn.addEventListener('click', window.toggleMenu);
    }

    if (overlay) {
        // Close when clicking a link
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('active');
                if(toggleBtn) toggleBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
