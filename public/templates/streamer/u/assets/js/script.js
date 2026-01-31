document.addEventListener('DOMContentLoaded', () => {
    // Initialize Spray Paint Effect
    const sprayPaint = new SprayPaintEffect();

    // Snap Scroll Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to animate children if needed
                entry.target.classList.add('in-view');
                // Trigger mobile spray effect
                if (sprayPaint.isMobile) {
                    sprayPaint.triggerSectionSpray(entry.target);
                }
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.snap-section').forEach(section => {
        observer.observe(section);
    });

    // Letter-by-letter Spray Effect (Simulation)
    const title = document.querySelector('.spray-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transition = `opacity 0.1s ${i * 0.1}s`;
            title.appendChild(span);
            // Trigger immediately for demo
            setTimeout(() => span.style.opacity = '1', 100);
        });
    }

    // Mobile Menu (Spray Tag)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'format_paint';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'format_paint';
                document.body.style.overflow = '';
            });
        });
    }
});

// ============================================
// SPRAY PAINT EFFECT - Urban Graffiti Animation
// ============================================

class SprayPaintEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.sprayColors = ['#db2777', '#facc15', '#06b6d4']; // Pink, Yellow, Cyan
        this.sprayTitles = document.querySelectorAll('.spray-title');
        this.stickers = document.querySelectorAll('.sticker');

        this.init();
    }

    init() {
        if (!this.isMobile) {
            this.setupPCEffects();
        }
    }

    setupPCEffects() {
        // PC: Hover/Click spray effects
        this.sprayTitles.forEach(title => {
            title.addEventListener('mouseenter', (e) => {
                this.createSprayBurst(e.clientX + window.scrollX, e.clientY + window.scrollY);
                this.createInkDrips(title);
            });

            title.addEventListener('click', (e) => {
                const color = this.sprayColors[Math.floor(Math.random() * this.sprayColors.length)];
                this.createPaintSplatter(e.clientX + window.scrollX, e.clientY + window.scrollY, color);
                this.createSprayMist(e.clientX + window.scrollX, e.clientY + window.scrollY, color);
            });
        });

        this.stickers.forEach(sticker => {
            sticker.addEventListener('mouseenter', () => {
                const rect = sticker.getBoundingClientRect();
                sticker.classList.add('spray-hover');
                this.createSprayBurst(
                    rect.left + rect.width / 2 + window.scrollX,
                    rect.top + rect.height / 2 + window.scrollY
                );
                setTimeout(() => {
                    sticker.classList.remove('spray-hover');
                }, 600);
            });

            sticker.addEventListener('click', (e) => {
                const color = this.sprayColors[Math.floor(Math.random() * this.sprayColors.length)];
                this.createPaintSplatter(e.clientX + window.scrollX, e.clientY + window.scrollY, color);
            });
        });
    }

    triggerSectionSpray(section) {
        // Mobile: Auto spray when section comes into view
        const title = section.querySelector('.spray-title');
        if (title) {
            title.classList.add('spraying');

            // Create spray effect around title
            const rect = title.getBoundingClientRect();
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const x = rect.left + Math.random() * rect.width + window.scrollX;
                    const y = rect.top + Math.random() * rect.height + window.scrollY;
                    this.createSprayMist(x, y, this.sprayColors[Math.floor(Math.random() * 3)]);
                }, i * 100);
            }

            // Add ink drips
            setTimeout(() => {
                this.createInkDrips(title);
            }, 500);

            setTimeout(() => {
                title.classList.remove('spraying');
            }, 1000);
        }
    }

    createSprayBurst(x, y) {
        // Create multiple particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'spray-particle';

            const size = 10 + Math.random() * 20;
            const color = this.sprayColors[Math.floor(Math.random() * this.sprayColors.length)];

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = color;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.boxShadow = `0 0 ${size / 2}px ${color}`;

            // Random scatter direction
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 30 + Math.random() * 50;
            const destX = x + Math.cos(angle) * distance;
            const destY = y + Math.sin(angle) * distance;

            document.body.appendChild(particle);

            requestAnimationFrame(() => {
                particle.classList.add('active');
                particle.style.left = destX + 'px';
                particle.style.top = destY + 'px';
            });

            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }

    createSprayMist(x, y, color) {
        const mist = document.createElement('div');
        mist.className = 'spray-mist';

        const size = 40 + Math.random() * 40;
        mist.style.width = size + 'px';
        mist.style.height = size + 'px';
        mist.style.backgroundColor = color;
        mist.style.left = (x - size / 2) + 'px';
        mist.style.top = (y - size / 2) + 'px';

        document.body.appendChild(mist);

        requestAnimationFrame(() => {
            mist.classList.add('puffing');
        });

        setTimeout(() => {
            mist.remove();
        }, 1000);
    }

    createPaintSplatter(x, y, color) {
        const splatter = document.createElement('div');
        splatter.className = 'paint-splatter';

        const size = 30 + Math.random() * 40;
        splatter.style.width = size + 'px';
        splatter.style.height = size + 'px';
        splatter.style.backgroundColor = color;
        splatter.style.left = (x - size / 2) + 'px';
        splatter.style.top = (y - size / 2) + 'px';
        splatter.style.boxShadow = `0 0 ${size / 2}px ${color}`;
        splatter.style.filter = `blur(${Math.random() * 2}px)`;

        document.body.appendChild(splatter);

        // Fade out after some time
        setTimeout(() => {
            splatter.style.transition = 'opacity 3s';
            splatter.style.opacity = '0.3';
        }, 2000);

        setTimeout(() => {
            splatter.remove();
        }, 8000);
    }

    createInkDrips(element) {
        const rect = element.getBoundingClientRect();
        const dripCount = 2 + Math.floor(Math.random() * 3);

        for (let i = 0; i < dripCount; i++) {
            setTimeout(() => {
                const drip = document.createElement('div');
                drip.className = 'ink-drip';
                const color = this.sprayColors[Math.floor(Math.random() * this.sprayColors.length)];

                // Position relative to body for consistent scroll behavior
                drip.style.left = (rect.left + 20 + Math.random() * (rect.width - 40) + window.scrollX) + 'px';
                drip.style.top = (rect.bottom - 5 + window.scrollY) + 'px';
                drip.style.backgroundColor = color;
                drip.style.color = color;

                document.body.appendChild(drip);

                requestAnimationFrame(() => {
                    drip.classList.add('dripping');
                });

                setTimeout(() => {
                    drip.remove();
                }, 2000);
            }, i * 300);
        }
    }
}
