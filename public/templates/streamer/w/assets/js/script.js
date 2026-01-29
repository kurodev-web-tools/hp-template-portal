document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Parallax Logic
    const container = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.layer');

    if (container && layers.length > 0) {
        container.addEventListener('scroll', () => {
            const scrollLeft = container.scrollLeft;
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.2;
                layer.style.transform = `translateX(${-scrollLeft * speed}px)`;
            });
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // Toggles active class for CSS

            // Icon Switch
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'waves';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close when clicking a link and jump to section
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection && container) {
                    // Smooth scroll the container horizontally
                    container.scrollTo({
                        left: targetSection.offsetLeft,
                        behavior: 'smooth'
                    });
                }

                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'waves';
                document.body.style.overflow = '';
            });
        });
    }
});
