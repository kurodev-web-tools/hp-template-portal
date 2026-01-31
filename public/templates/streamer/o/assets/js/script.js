document.addEventListener('DOMContentLoaded', () => {
    // Warp Speed / Starfield
    if (window.PremiumEffects) {
        // Using Hyperspeed but slowly to simulate drifting
        const starfield = PremiumEffects.Hyperspeed('#starfield', {
            count: 200,
            speed: 0.5, // Slow drift
            starColor: '#ffffff'
        });
    }

    // Snap Scroll Observer to trigger zoom/fade
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.snap-section').forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu (Planetary Ring)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    // Parallax Effect Variables
    const systemContainer = document.querySelector('.system-container');
    let mouseX = 0, mouseY = 0;

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active', isActive);
            toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'vibration';

            // Add/Remove Parallax Listeners

            // Add/Remove Parallax Listeners
            if (isActive) {
                document.addEventListener('mousemove', handleParallax);
                document.addEventListener('touchmove', handleTouchParallax, { passive: false });
            } else {
                document.removeEventListener('mousemove', handleParallax);
                document.removeEventListener('touchmove', handleTouchParallax);
                // Reset transform
                if (systemContainer) systemContainer.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.querySelector('.material-icons').textContent = 'vibration';
                document.removeEventListener('mousemove', handleParallax);
                document.removeEventListener('mousemove', handleParallax);
                document.removeEventListener('touchmove', handleTouchParallax);
            });
        });
    }

    function handleParallax(e) {
        if (!systemContainer) return;
        const x = (window.innerWidth / 2 - e.clientX) / 20;
        const y = (window.innerHeight / 2 - e.clientY) / 20;
        systemContainer.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    }

    function handleTouchParallax(e) {
        if (!systemContainer) return;
        // e.preventDefault(); // Prevent scroll while interacting? Maybe not necessary if menu covers all
        const touch = e.touches[0];
        const x = (window.innerWidth / 2 - touch.clientX) / 20;
        const y = (window.innerHeight / 2 - touch.clientY) / 20;
        systemContainer.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    }

    // Initialize Bubble Rise Effect
    const bubbleRise = new BubbleRiseEffect();
});

// ============================================
// BUBBLE RISE EFFECT - Deep Sea / Space Bubbles
// ============================================

class BubbleRiseEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.bubbles = [];
        this.maxBubbles = this.isMobile ? 20 : 40;
        this.colors = ['cyan', 'purple', 'white'];
        this.sizes = ['small', 'medium', 'large'];
        
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'bubble-container';
        document.body.appendChild(this.container);
        
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileMode();
        } else {
            this.setupPCMode();
        }
        
        // Start animation loop
        this.animate();
    }

    setupPCMode() {
        // PC: Mouse trail - bubbles generated from cursor movement
        let lastX = 0;
        let lastY = 0;
        let isMoving = false;
        
        document.addEventListener('mousemove', (e) => {
            const distance = Math.sqrt(
                Math.pow(e.clientX - lastX, 2) + 
                Math.pow(e.clientY - lastY, 2)
            );
            
            // Generate bubble if moved enough
            if (distance > 30 && this.bubbles.length < this.maxBubbles) {
                this.createBubble(e.clientX, e.clientY, 'trail');
                lastX = e.clientX;
                lastY = e.clientY;
            }
        }, { passive: true });
    }

    setupMobileMode() {
        // Mobile: Deep Sea mode - auto generate from bottom
        document.body.classList.add('deep-sea-mode');
        
        // Regular bubble generation
        setInterval(() => {
            if (this.bubbles.length < this.maxBubbles) {
                const x = Math.random() * window.innerWidth;
                const y = window.innerHeight + 20;
                this.createBubble(x, y, 'auto');
            }
        }, 800);
    }

    createBubble(x, y, type) {
        const bubble = document.createElement('div');
        
        // Random properties
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        const sizeMultiplier = size === 'small' ? 1 : (size === 'medium' ? 1.5 : 2.5);
        const finalSize = (Math.random() * 10 + 10) * sizeMultiplier;
        
        // Set classes and styles
        bubble.className = `bubble bubble-${color} bubble-${size}`;
        bubble.style.width = `${finalSize}px`;
        bubble.style.height = `${finalSize}px`;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Store bubble data for animation
        const bubbleData = {
            element: bubble,
            x: x,
            y: y,
            speed: Math.random() * 1.5 + 0.5,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
            wobbleAmplitude: Math.random() * 30 + 10,
            wobbleOffset: Math.random() * Math.PI * 2,
            time: 0
        };
        
        this.bubbles.push(bubbleData);
        this.container.appendChild(bubble);
    }

    animate() {
        // Update all bubbles
        this.bubbles = this.bubbles.filter(bubble => {
            bubble.time += 1;
            
            // Move up
            bubble.y -= bubble.speed;
            
            // Wobble (sine wave movement)
            const wobble = Math.sin(bubble.time * bubble.wobbleSpeed + bubble.wobbleOffset) * bubble.wobbleAmplitude;
            const currentX = bubble.x + wobble;
            
            // Update position
            bubble.element.style.transform = `translate(${currentX - bubble.x}px, 0)`;
            bubble.element.style.top = `${bubble.y}px`;
            
            // Fade out near top
            if (bubble.y < 100) {
                const opacity = bubble.y / 100;
                bubble.element.style.opacity = Math.max(0, opacity * 0.6);
            }
            
            // Remove if off screen
            if (bubble.y < -50) {
                bubble.element.remove();
                return false;
            }
            
            return true;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}
