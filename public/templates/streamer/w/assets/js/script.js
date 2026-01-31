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
            toggle.classList.toggle('active'); // Toggles active class for CSS

            // Icon Switch
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'waves';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close when clicking a link and jump to section
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
                this.scrollProgress = this.parallaxContainer.scrollLeft / maxScroll;
                
                // Change frequency based on scroll progress
                // More scroll = higher frequency (denser waves)
                this.frequency = 0.01 + (this.scrollProgress * 0.03); // 0.01 to 0.04
            }, { passive: true });
        }
    }

    generateWavePath(amplitude, frequency, phase, yOffset, complexity = 1) {
        const width = 1200;
        const height = 200;
        let path = `M 0 ${height}`;
        
        // Generate wave points
        for (let x = 0; x <= width; x += 10) {
            let y = yOffset;
            
            // Primary wave
            y += Math.sin((x * frequency) + phase) * amplitude;
            
            // Secondary harmonic for complexity
            if (complexity > 1) {
                y += Math.sin((x * frequency * 2) + phase * 1.5) * (amplitude * 0.3);
            }
            
            // Third harmonic
            if (complexity > 2) {
                y += Math.sin((x * frequency * 0.5) + phase * 0.7) * (amplitude * 0.2);
            }
            
            path += ` L ${x} ${y}`;
        }
        
        path += ` L ${width} ${height} Z`;
        return path;
    }

    animate() {
        // Smooth amplitude transition
        this.amplitude += (this.targetAmplitude - this.amplitude) * 0.1;
        
        // Update time
        this.time += this.speed;
        
        // Generate wave paths for each layer
        if (this.waveBack) {
            const backPath = this.generateWavePath(
                this.amplitude * 0.8, // Slightly smaller amplitude
                this.frequency * 0.5, // Lower frequency (slower waves)
                this.time * 0.7, // Slower phase
                120, // Y offset
                2 // Complexity
            );
            this.waveBack.setAttribute('d', backPath);
        }
        
        if (this.waveMid) {
            const midPath = this.generateWavePath(
                this.amplitude, // Base amplitude
                this.frequency * 0.75, // Medium frequency
                this.time * 0.85, // Medium phase
                140, // Y offset
                2 // Complexity
            );
            this.waveMid.setAttribute('d', midPath);
        }
        
        if (this.waveFront) {
            const frontPath = this.generateWavePath(
                this.amplitude * 1.2, // Larger amplitude
                this.frequency, // Base frequency
                this.time, // Full speed phase
                160, // Y offset
                3 // Full complexity
            );
            this.waveFront.setAttribute('d', frontPath);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
const waveformSystem = new AudioWaveformSystem();

                }

                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'waves';
                document.body.style.overflow = '';
            });
        });
    }
});
