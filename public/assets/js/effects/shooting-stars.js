/**
 * Shooting Stars Effect
 * Spawns falling stars occasionally for ambient wonder.
 */
export function ShootingStars(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) return;

    const defaults = {
        frequency: 3000, // ms
        color: 'rgba(200, 240, 255, 0.8)',
        trailLength: 150
    };
    const settings = { ...defaults, ...options };

    // Ensure container relative/absolute for positioning
    const computedStyle = window.getComputedStyle(container);
    if (computedStyle.position === 'static') {
        container.style.position = 'relative';
    }

    // Add CSS styles dynamically if not present
    if (!document.getElementById('shooting-star-style')) {
        const style = document.createElement('style');
        style.id = 'shooting-star-style';
        style.textContent = `
            .shooting-star {
                position: absolute;
                height: 2px;
                background: linear-gradient(-45deg, rgba(255,255,255,1), rgba(0,0,255,0));
                border-radius: 999px;
                filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
                animation: tail 3s ease-in-out infinite, shooting 3s ease-in-out infinite;
                opacity: 0;
                pointer-events: none;
                z-index: 0;
            }
            @keyframes tail {
                0% { width: 0; }
                30% { width: 100px; }
                100% { width: 0; }
            }
            @keyframes shooting {
                0% { transform: translateX(0); opacity: 0; }
                10% { opacity: 1; }
                100% { transform: translateX(-300px) translateY(300px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    let intervalId;

    function spawnStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');

        const startX = Math.random() * container.clientWidth;
        const startY = Math.random() * (container.clientHeight / 2); // Top half

        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        const duration = 2000 + Math.random() * 2000;
        star.style.animationDuration = `${duration}ms`;
        star.style.animationDelay = '0ms';

        container.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });

        setTimeout(() => {
            if (container.contains(star)) star.remove();
        }, duration + 100);
    }

    intervalId = setInterval(spawnStar, settings.frequency);

    return {
        destroy: () => {
            clearInterval(intervalId);
            const style = document.getElementById('shooting-star-style');
            if (style) style.remove();
        }
    };
}
