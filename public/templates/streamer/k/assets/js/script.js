document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];
    
    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // For potential button animation
            
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';
            
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
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

    // Page Transition Simulation (since it's multi-page, real transition happens on load)
    const content = document.querySelector('.page-content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.8s ease-out';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 100);
});
