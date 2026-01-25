document.addEventListener('DOMContentLoaded', () => {
    // Shockwave Effect on Scroll
    const container = document.querySelector('.snap-container');
    const wave = document.querySelector('.shockwave-overlay');
    let isScrolling;

    // Detect section change
    let currentSection = 0;
    const sections = document.querySelectorAll('.snap-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger shockwave
                wave.classList.remove('shockwave-active');
                void wave.offsetWidth; // Trigger reflow
                wave.classList.add('shockwave-active');
                
                // Haptics
                if (navigator.vibrate) navigator.vibrate(20);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});
