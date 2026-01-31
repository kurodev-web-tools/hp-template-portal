document.addEventListener('DOMContentLoaded', () => {
    // Spotlight Effect
    const spotlight = document.querySelector('.spotlight');

    window.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // Lights Toggle
    const lightBtn = document.querySelector('.lights-toggle');
    if (lightBtn) {
        lightBtn.addEventListener('click', () => {
            document.body.classList.toggle('lights-on');
            // Haptic
            if (window.Haptics) window.Haptics.tap();

            // Update icon state if needed (optional)
            const icon = lightBtn.querySelector('.material-icons');
            if (document.body.classList.contains('lights-on')) {
                icon.textContent = 'flashlight_off';
            } else {
                icon.textContent = 'highlight';
            }
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

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'grid_view';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'grid_view';

                document.body.style.overflow = '';
            });
        });
    }

    // Random Character Glitch Effect
    const title = document.querySelector('.hero-title');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const originalText = title.innerText;

    function glitchText() {
        let iterations = 0;
        const interval = setInterval(() => {
            title.innerText = originalText.split('').map((char, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    }

    setInterval(() => {
        if (Math.random() > 0.95) glitchText();
    }, 2000);

    // ============================================
    // DECRYPT TEXT EFFECT - Hacker Decryption
    // ============================================

    class DecryptEffect {
        constructor(element) {
            this.element = element;
            this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            this.isDecoding = false;
            
            // Store original text if not already stored
            if (!this.element.getAttribute('data-original-text')) {
                this.element.setAttribute('data-original-text', this.element.innerText);
            }
            this.originalText = this.element.getAttribute('data-original-text');
        }

        decode() {
            if (this.isDecoding) return;
            this.isDecoding = true;
            
            // Add decoding class
            this.element.classList.add('decoding');
            
            let iterations = 0;
            const totalIterations = this.originalText.length * 3; // Multiple passes for effect
            
            const interval = setInterval(() => {
                const currentText = this.originalText.split('').map((char, index) => {
                    // Preserve spaces and special formatting
                    if (char === ' ') return ' ';
                    if (char === '\n') return '\n';
                    
                    // Calculate progress for this character
                    const charProgress = (iterations - index * 2) / 4;
                    
                    if (charProgress >= 1) {
                        return this.originalText[index];
                    } else if (charProgress > 0) {
                        // Mix of correct and random chars during transition
                        return Math.random() > 0.3 ? this.originalText[index] : this.getRandomChar();
                    } else {
                        // Random chars during early phase
                        return this.getRandomChar();
                    }
                }).join('');
                
                this.element.innerText = currentText;
                iterations += 1;
                
                if (iterations >= totalIterations) {
                    clearInterval(interval);
                    this.element.innerText = this.originalText;
                    this.element.classList.remove('decoding');
                    this.isDecoding = false;
                }
            }, 40);
        }

        getRandomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Initialize DecryptEffect for all decrypt-hover elements
    const decryptElements = document.querySelectorAll('.decrypt-hover, .hero-title');
    const decryptEffects = new Map();

    decryptElements.forEach(element => {
        decryptEffects.set(element, new DecryptEffect(element));
    });

    // PC: Hover to trigger decryption
    if (window.innerWidth > 768) {
        decryptElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                const effect = decryptEffects.get(element);
                if (effect) effect.decode();
            });
        });
    }

    // Mobile: IntersectionObserver to auto-trigger once when visible
    if (window.innerWidth <= 768) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const decryptObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const effect = decryptEffects.get(element);
                    if (effect) {
                        effect.decode();
                    }
                    // Unobserve after triggering once
                    decryptObserver.unobserve(element);
                }
            });
        }, observerOptions);

        decryptElements.forEach(element => {
            decryptObserver.observe(element);
        });
    }
});
