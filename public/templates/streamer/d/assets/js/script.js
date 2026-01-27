document.addEventListener('DOMContentLoaded', () => {
    // Spotlight Effect
    const spotlight = document.querySelector('.spotlight');

    window.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // Lights Toggle
    const lightBtn = document.querySelector('.lights-toggle');
    if (lightBtn) {
        lightBtn.addEventListener('click', () => {
            document.body.classList.toggle('lights-on');
            // Haptic
            if (window.Haptics) window.Haptics.tap();

            // Update icon state if needed (optional)
            const icon = lightBtn.querySelector('.material-icons');
            if (document.body.classList.contains('lights-on')) {
                icon.textContent = 'flashlight_off';
            } else {
                icon.textContent = 'highlight';
            }
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Fix: Close menu when link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
            document.body.style.overflow = '';
        });
    });

    // Random Character Glitch Effect
    const title = document.querySelector('.hero-title');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const originalText = title.innerText;

    function glitchText() {
        let iterations = 0;
        const interval = setInterval(() => {
            title.innerText = originalText.split('').map((char, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    }

    setInterval(() => {
        if (Math.random() > 0.95) glitchText();
    }, 2000);
});
