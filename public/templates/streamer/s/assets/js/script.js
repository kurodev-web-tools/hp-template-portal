document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';
            
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }


    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
        });
    });

    // Steam Particle Effect (Simple simulation)
    // In a real scenario, use PremiumEffects.Particles with "steam" settings
    // Here we assume simple fade-in for page transitions is enough based on "Signature" description "CSS Fade"

    // Page Transition Simulation
    const content = document.querySelector('.page-content');
    if (content) {
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.transition = 'opacity 1s ease';
            content.style.opacity = '1';
        }, 100);
    }
});
