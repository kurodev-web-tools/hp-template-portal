document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }

    // Enso circle replay on click (optional interaction)
    const enso = document.querySelector('.enso-svg');
    if (enso) {
        enso.addEventListener('click', () => {
            const circle = enso.querySelector('circle');
            circle.style.animation = 'none';
            circle.offsetHeight; /* trigger reflow */
            circle.style.animation = 'draw 2s cubic-bezier(0.22, 1, 0.36, 1) forwards';
        });
    }
});
