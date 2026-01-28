document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Parallax Logic
    const container = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.layer');

    container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.2;
            layer.style.transform = `translateX(${-scrollLeft * speed}px)`;
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            
            // Icon Switch
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';
            
            // Invert toggle color for visibility against black shutter
            toggle.style.color = isActive ? '#fff' : '#000';
            
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close when clicking a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                toggle.style.color = '#000';
                document.body.style.overflow = '';
                
                // Manual Scroll Logic for Anchor Links in Horizontal Layout
                // Since this template uses custom horizontal scroll, standard #anchor might fail.
                // We need to find the target section index and scroll container.
                // Assuming simple mapping: #section1 -> index 0, etc.
            });
        });
    }
});
    });
});
