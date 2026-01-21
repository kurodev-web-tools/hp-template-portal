document.addEventListener('DOMContentLoaded', () => {
    // ===== Pop Theme Effects =====
    if (window.PremiumEffects) {
        // Energetic reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 1000 });

        // Tilt for story panels and grid items
        PremiumEffects.Tilt('.story-panel, .grid-item', { max: 15, scale: 1.05, speed: 400 });
    }

    // ===== Sticker Hover Shiver =====
    const stickers = document.querySelectorAll('.hero-sticker');
    stickers.forEach(sticker => {
        sticker.addEventListener('mouseenter', () => {
            sticker.style.animation = 'shiver 0.3s infinite';
        });
        sticker.addEventListener('mouseleave', () => {
            sticker.style.animation = '';
        });
    });
    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.pop-mobile-toggle');
    const menu = document.querySelector('.pop-mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = menu.classList.contains('is-active') ? 'close' : 'menu';
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
            });
        });
    }
});

// Shiver Animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes shiver {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`;
document.head.appendChild(style);
