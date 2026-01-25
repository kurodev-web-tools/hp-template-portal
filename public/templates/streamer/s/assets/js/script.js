document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
    });

    // Steam Particle Effect (Simple simulation)
    // In a real scenario, use PremiumEffects.Particles with "steam" settings
    // Here we assume simple fade-in for page transitions is enough based on "Signature" description "CSS Fade"
    
    // Page Transition Simulation
    const content = document.querySelector('.page-content');
    if(content) {
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.transition = 'opacity 1s ease';
            content.style.opacity = '1';
        }, 100);
    }
});
