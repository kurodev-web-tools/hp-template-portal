document.addEventListener('DOMContentLoaded', () => {
    // Scroll-linked RGB Shift
    let lastScrollTop = 0;
    let rgbShift = 0;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const speed = Math.abs(st - lastScrollTop);
        lastScrollTop = st;

        // Calculate shift based on speed, max cap
        const targetShift = Math.min(speed * 0.5, 20);

        // Smoothly decay or ramp up (simplified)
        rgbShift = targetShift;

        document.body.style.setProperty('--shift-x', `${rgbShift}px`);

        document.querySelectorAll('.rgb-target').forEach(el => {
            if (rgbShift > 1) {
                el.classList.add('glitching');
                el.style.opacity = 0.9;
                // Add pseudo element opacity via style
                const style = document.createElement('style');
                // Simpler: just set custom properties which CSS uses
            } else {
                el.classList.remove('glitching');
            }
        });

        // Use requestAnimationFrame for smoother opacity on pseudo-elements if needed
        // For now, CSS transition handles it if we modify a var.
        // Actually, CSS variables in before/after are tricky without re-render.
        // Let's just update the --shift-x variable which is used in transform.
        // We also need to set opacity of pseudo elements to make them visible.

        // Hack: update style tag to force opacity on pseudo elements based on speed
        const opacity = Math.min(speed * 0.1, 0.8);
        document.querySelectorAll('.rgb-target').forEach(el => {
            // This is heavy, better to use a class
            if (opacity > 0.1) {
                el.classList.add('active-glitch');
            } else {
                el.classList.remove('active-glitch');
            }
        });
    });

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'rocket';

            // Add noise sound trigger here if needed

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.querySelector('.material-icons').textContent = 'rocket';
                document.body.style.overflow = '';
            });
        });
    }
});

// Inject dynamic CSS for glitch opacity
const style = document.createElement('style');
style.textContent = `
    .active-glitch::before, .active-glitch::after {
        opacity: 0.8 !important;
    }
`;
document.head.appendChild(style);

// ============================================
// COLOR SPLASH RIPPLE - Electric Click Effect
// ============================================

class ColorSplashRipple {
    constructor() {
        this.brand = document.querySelector('.brand');
        this.rgbTargets = document.querySelectorAll('.rgb-target');
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        this.init();
    }

    init() {
        // Listen for clicks/taps on the entire document
        document.addEventListener('click', (e) => this.handleInteraction(e));
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.handleInteraction(e.touches[0]);
            }
        }, { passive: true });
    }

    handleInteraction(e) {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        
        if (!x || !y) return;
        
        // Create main ripple
        this.createRipple(x, y);
        
        // Create secondary ring
        this.createRing(x, y);
        
        // Maximize RGB shift
        this.maximizeRGBShift();
        
        // Flash brand
        this.flashBrand();
        
        // Page flash
        this.pageFlash();
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-circle invert-mode';
        
        const size = 100 + Math.random() * 100;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        document.body.appendChild(ripple);
        
        // Trigger animation
        requestAnimationFrame(() => {
            ripple.classList.add('expanding');
        });
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createRing(x, y) {
        const ring = document.createElement('div');
        ring.className = 'ripple-ring';
        
        const size = 150 + Math.random() * 50;
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.left = x + 'px';
        ring.style.top = y + 'px';
        
        document.body.appendChild(ring);
        
        // Trigger animation with slight delay
        setTimeout(() => {
            requestAnimationFrame(() => {
                ring.classList.add('expanding');
            });
        }, 50);
        
        // Remove after animation
        setTimeout(() => {
            ring.remove();
        }, 800);
    }

    maximizeRGBShift() {
        // Add max shift class to body
        document.body.classList.add('rgb-max-shift');
        
        // Maximize shift-x property
        document.body.style.setProperty('--shift-x', '30px');
        
        // Add glitching to all rgb targets
        this.rgbTargets.forEach(target => {
            target.classList.add('active-glitch');
        });
        
        // Reset after a short time
        setTimeout(() => {
            document.body.classList.remove('rgb-max-shift');
            document.body.style.setProperty('--shift-x', '0px');
            this.rgbTargets.forEach(target => {
                target.classList.remove('active-glitch');
            });
        }, 300);
    }

    flashBrand() {
        if (this.brand) {
            this.brand.classList.add('flash-active');
            setTimeout(() => {
                this.brand.classList.remove('flash-active');
            }, 400);
        }
    }

    pageFlash() {
        document.body.classList.add('page-flash');
        setTimeout(() => {
            document.body.classList.remove('page-flash');
        }, 300);
    }
}

// Initialize
const colorSplash = new ColorSplashRipple();
