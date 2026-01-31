document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Parallax Logic
    const container = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.layer');

    if (container && layers.length > 0) {
        container.addEventListener('scroll', () => {
            const scrollLeft = container.scrollLeft;
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.2;
                layer.style.transform = `translateX(${-scrollLeft * speed}px)`;
            });
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            // Icon Switch
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'waves';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection && container) {
                    // Smooth scroll the container horizontally
                    container.scrollTo({
                        left: targetSection.offsetLeft,
                        behavior: 'smooth'
                    });
                }

                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'waves';
                document.body.style.overflow = '';
            });
        });
    }

    // Initialize Waveform System
    const waveformSystem = new AudioWaveformSystem();
});

// ============================================
// AUDIO WAVEFORM SYSTEM - Visual Soundscape
// ============================================

class AudioWaveformSystem {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.container = document.querySelector('.wave-container');
        this.waveBack = document.querySelector('.wave-back');
        this.waveMid = document.querySelector('.wave-mid');
        this.waveFront = document.querySelector('.wave-front');
        this.parallaxContainer = document.querySelector('.parallax-container');

        // Wave parameters
        this.time = 0;
        this.amplitude = 30; // Base amplitude
        this.frequency = 0.02; // Base frequency
        this.speed = 0.05; // Base speed

        // PC mouse tracking
        this.mouseY = window.innerHeight / 2;
        this.targetAmplitude = 30;

        // Mobile scroll tracking
        this.scrollProgress = 0;

        this.init();
    }

    init() {
        if (!this.waveBack || !this.waveMid || !this.waveFront) return;

        if (this.isMobile) {
            this.setupMobileMode();
        } else {
            this.setupPCMode();
        }

        // Start animation loop
        this.animate();
    }

    setupPCMode() {
        // Track mouse Y position
        document.addEventListener('mousemove', (e) => {
            this.mouseY = e.clientY;

            // Calculate amplitude based on mouse Y
            // Top of screen (0) = high amplitude, Bottom (height) = low amplitude
            const normalizedY = 1 - (this.mouseY / window.innerHeight);
            this.targetAmplitude = 20 + (normalizedY * 80); // 20 to 100

            // Add high-amplitude class for glow effect
            if (this.container) {
                if (normalizedY > 0.7) {
                    this.container.classList.add('high-amplitude');
                } else {
                    this.container.classList.remove('high-amplitude');
                }
            }
        }, { passive: true });
    }

    setupMobileMode() {
        // Track horizontal scroll for frequency change
        if (this.parallaxContainer) {
            this.parallaxContainer.addEventListener('scroll', () => {
                const maxScroll = this.parallaxContainer.scrollWidth - this.parallaxContainer.clientWidth;
                const currentScroll = this.parallaxContainer.scrollLeft;
                this.scrollProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;

                // Change frequency based on scroll progress
                // More scroll = higher frequency (denser waves)
                this.frequency = 0.01 + (this.scrollProgress * 0.03); // 0.01 to 0.04
            }, { passive: true });
        }
    }

    generateWavePath(amplitude, frequency, phase, yOffset, complexity = 1) {
        const width = 1200;
        const height = 200;

        // Start from x=0
        const startY = yOffset + Math.sin(phase) * amplitude;
        let path = `M 0 ${startY}`;

        // Generate wave points with higher resolution for smooth thin lines
        for (let x = 5; x <= width; x += 5) {
            let y = yOffset;

            // Primary wave
            y += Math.sin((x * frequency) + phase) * amplitude;

            // Secondary harmonic
            if (complexity > 1) {
                y += Math.sin((x * frequency * 2) + phase * 1.5) * (amplitude * 0.3);
            }

            // Third harmonic
            if (complexity > 2) {
                y += Math.sin((x * frequency * 0.5) + phase * 0.7) * (amplitude * 0.2);
            }

            path += ` L ${x} ${y}`;
        }

        return path;
    }

    animate() {
        // Smooth amplitude transition
        this.amplitude += (this.targetAmplitude - this.amplitude) * 0.1;

        // Update time
        this.time += this.speed;

        // Generate wave paths for each layer
        // All centered at y=100 for a shared horizon look
        if (this.waveBack) {
            const backPath = this.generateWavePath(
                this.amplitude * 0.7,
                this.frequency * 0.5,
                this.time * 0.7,
                100,
                2
            );
            this.waveBack.setAttribute('d', backPath);
        }

        if (this.waveMid) {
            const midPath = this.generateWavePath(
                this.amplitude * 1.0,
                this.frequency * 0.75,
                this.time * 0.85,
                100,
                2
            );
            this.waveMid.setAttribute('d', midPath);
        }

        if (this.waveFront) {
            const frontPath = this.generateWavePath(
                this.amplitude * 1.3,
                this.frequency,
                this.time,
                100,
                3
            );
            this.waveFront.setAttribute('d', frontPath);
        }

        requestAnimationFrame(() => this.animate());
    }
}
