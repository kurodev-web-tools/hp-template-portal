document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
    });

    // Enso circle replay on click (optional interaction)
    const enso = document.querySelector('.enso-svg');
    if(enso) {
        enso.addEventListener('click', () => {
            const circle = enso.querySelector('circle');
            circle.style.animation = 'none';
            circle.offsetHeight; /* trigger reflow */
            circle.style.animation = 'draw 2s cubic-bezier(0.22, 1, 0.36, 1) forwards';
        });
    }
});
