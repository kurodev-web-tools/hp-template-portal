document.addEventListener('DOMContentLoaded', () => {
    // Scroll-linked RGB Shift
    let lastScrollTop = 0;
    let rgbShift = 0;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const speed = Math.abs(st - lastScrollTop);
        lastScrollTop = st;

        // Calculate shift based on speed, max cap
        const targetShift = Math.min(speed * 0.5, 20);

        // Smoothly decay or ramp up (simplified)
        rgbShift = targetShift;

        document.body.style.setProperty('--shift-x', `${rgbShift}px`);

        document.querySelectorAll('.rgb-target').forEach(el => {
            if (rgbShift > 1) {
                el.classList.add('glitching');
                el.style.opacity = 0.9;
                // Add pseudo element opacity via style
                const style = document.createElement('style');
                // Simpler: just set custom properties which CSS uses
            } else {
                el.classList.remove('glitching');
            }
        });

        // Use requestAnimationFrame for smoother opacity on pseudo-elements if needed
        // For now, CSS transition handles it if we modify a var.
        // Actually, CSS variables in before/after are tricky without re-render.
        // Let's just update the --shift-x variable which is used in transform.
        // We also need to set opacity of pseudo elements to make them visible.

        // Hack: update style tag to force opacity on pseudo elements based on speed
        const opacity = Math.min(speed * 0.1, 0.8);
        document.querySelectorAll('.rgb-target').forEach(el => {
            // This is heavy, better to use a class
            if (opacity > 0.1) {
                el.classList.add('active-glitch');
            } else {
                el.classList.remove('active-glitch');
            }
        });
    });

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
            
            // Add noise sound trigger here if needed
            
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.querySelector('.material-icons').textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }
});

// Inject dynamic CSS for glitch opacity
const style = document.createElement('style');
style.textContent = `
    .active-glitch::before, .active-glitch::after {
        opacity: 0.8 !important;
    }
`;
document.head.appendChild(style);
