document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Parallax Logic
    const container = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.layer');

    container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.2;
            layer.style.transform = `translateX(${-scrollLeft * speed}px)`;
        });
    });
});
