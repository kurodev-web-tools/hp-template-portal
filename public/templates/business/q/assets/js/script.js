document.addEventListener('DOMContentLoaded', () => {
    // ===== Quality Theme Effects =====
    if (window.PremiumEffects) {
        // High precision reveal (slower, elegant)
        PremiumEffects.BlurText('h1', { delay: 200, duration: 2500 });

        // Very subtle parallax for craft image
        PremiumEffects.Tilt('.craft-img-small', { max: 2, scale: 1.02 });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.quality-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.querySelector('.top-loader').style.width = `${scrolled}%`;
    });

    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.precision-mobile-toggle');
    const menu = document.querySelector('.precision-mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
            });
        });
    }
});

// Create Loader Element
const loader = document.createElement('div');
loader.className = 'top-loader';
document.body.appendChild(loader);

const style = document.createElement('style');
style.innerHTML = `
.top-loader {
    position: fixed; top: 0; left: 0; height: 2px;
    background: #1A1A1A; width: 0%; z-index: 2000;
    transition: width 0.1s linear;
}
`;
document.head.appendChild(style);
