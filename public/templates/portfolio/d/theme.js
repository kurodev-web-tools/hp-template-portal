/**
 * Darkmode Portfolio Theme - JS Effects
 * 特殊仕様: タイピング背景、スキルバー充電、ホバー発光
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger);

        initMobileMenu();
        initBackgroundTyping();
        initSkillBars();
        initTextareaResize();
    }

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    function initMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('is-open');
                menu.classList.toggle('is-open');
            });

            // Close menu when a link is clicked (mobile)
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (window.innerWidth <= 768) {
                        toggle.classList.remove('is-open');
                        menu.classList.remove('is-open');
                    }

                    // Smooth scroll with GSAP (adding 50ms delay for performance after menu closes)
                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        setTimeout(() => {
                            gsap.to(window, {
                                duration: 1.5,
                                scrollTo: target,
                                ease: 'power3.inOut'
                            });
                        }, 50);
                    }
                });
            });
        }
    }

    // ============================================
    // Background Typing Effect (Hero)
    // ============================================
    function initBackgroundTyping() {
        const bgContainer = document.querySelector('.hero-bg-typing');
        if (!bgContainer) return;

        // Code snippets to type
        const snippets = [
            "Initializing kernel... OK",
            "Loading drivers... OK",
            "Mounting root filesystem... OK",
            "Checking memory integrity... PASS",
            "Establishing secure connection to mainframe...",
            "[WARN] Unauthorized access attempt detected. IP logged.",
            "Deploying countermeasures...",
            "Encrypting datastore with AES-256...",
            "Process complete. System is stable."
        ];

        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,.<>/?";

        // Fill background with random chars mixed with snippets initially
        let initialText = "";
        for (let i = 0; i < 2000; i++) {
            if (Math.random() > 0.95) {
                initialText += snippets[Math.floor(Math.random() * snippets.length)] + "\n";
            } else {
                initialText += chars.charAt(Math.floor(Math.random() * chars.length));
                if (Math.random() > 0.9) initialText += " ";
            }
        }
        bgContainer.textContent = initialText;

        // Continuously update small chunks to simulate live typing
        setInterval(() => {
            const currentText = bgContainer.textContent;
            const newChar = chars.charAt(Math.floor(Math.random() * chars.length));
            // Add to end, remove from start to keep length stable
            bgContainer.textContent = currentText.substring(5) + " " + newChar + " " + (Math.random() > 0.8 ? "1" : "0");
        }, 100);
    }

    // ============================================
    // Skill Bars Animation
    // ============================================
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');

        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');

            // Set up scroll trigger to animate the width of the ::before pseudo element
            // Since we can't directly animate ::before width via inline styles easily,
            // we use a CSS variable.

            bar.style.setProperty('--target-width', '0%');
            // Injecting a small style block or using standard GSAP on the pseudo element doesn't work directly.
            // Best approach: create a child element or use CSS variable. 
            // We used a CSS ::before in CSS. Let's fix that by adding a span inside instead for GSAP.

            // Fix: Create actual div inside for easier GSAP control
            const filler = document.createElement('div');
            filler.style.height = '100%';
            filler.style.width = '0%';
            filler.style.background = 'repeating-linear-gradient(to right, var(--neon-green), var(--neon-green) 8px, transparent 8px, transparent 10px)';
            filler.style.boxShadow = 'var(--neon-glow)';
            bar.appendChild(filler);

            ScrollTrigger.create({
                trigger: bar,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(filler, {
                        width: level + '%',
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                },
                once: true
            });
        });

        // Remove the CSS ::before rule effect since we replaced it with a real DOM element
        // (Just overriding the CSS logic visually)
        const style = document.createElement('style');
        style.textContent = `.skill-bar::before { display: none !important; }`;
        document.head.appendChild(style);
    }

    // ============================================
    // Textarea Auto Resize
    // ============================================
    function initTextareaResize() {
        const textarea = document.getElementById('message');
        if (textarea) {
            textarea.addEventListener('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
    }

})();
