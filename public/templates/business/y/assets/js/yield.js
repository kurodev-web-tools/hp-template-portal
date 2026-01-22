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

    // Mobile Menu Logic
    const toggle = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (toggle && overlay) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // Close when clicking a link
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
    }
});
