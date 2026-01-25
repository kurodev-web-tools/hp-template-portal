document.addEventListener('DOMContentLoaded', () => {
    // Spotlight Effect
    const spotlight = document.querySelector('.spotlight');
    
    window.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
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
            iterations += 1/3;
        }, 30);
    }

    setInterval(() => {
        if (Math.random() > 0.95) glitchText();
    }, 2000);
});
