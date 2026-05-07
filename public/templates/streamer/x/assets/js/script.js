document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const scheduleItems = document.querySelectorAll('.race-schedule li');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        scheduleItems.forEach((item) => observer.observe(item));
    } else {
        scheduleItems.forEach((item) => item.classList.add('is-visible'));
    }

    const cards = document.querySelectorAll('.camera-card, .timer-card');
    cards.forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
            card.style.setProperty('--tilt-x', `${y.toFixed(2)}deg`);
            card.style.setProperty('--tilt-y', `${x.toFixed(2)}deg`);
            card.classList.add('is-tilting');
        });

        card.addEventListener('pointerleave', () => {
            card.classList.remove('is-tilting');
            card.style.removeProperty('--tilt-x');
            card.style.removeProperty('--tilt-y');
        });
    });
});
