document.addEventListener('DOMContentLoaded', () => {
    // Snap Scroll Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to animate children if needed
                entry.target.classList.add('in-view');
                // Could also update active nav link here
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.snap-section').forEach(section => {
        observer.observe(section);
    });

    // Letter-by-letter Spray Effect (Simulation)
    const title = document.querySelector('.spray-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transition = `opacity 0.1s ${i * 0.1}s`;
            title.appendChild(span);
            // Trigger immediately for demo
            setTimeout(() => span.style.opacity = '1', 100);
        });
    }

    // Mobile Menu (Spray Tag)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'format_paint';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'format_paint';
                document.body.style.overflow = '';
            });
        });
    }
});
