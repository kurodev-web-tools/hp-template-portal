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

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                if (menu.style.display === 'flex') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'flex';
                    menu.style.flexDirection = 'column';
                    menu.style.position = 'absolute';
                    menu.style.top = '100%';
                    menu.style.left = '0';
                    menu.style.width = '100%';
                    menu.style.background = 'rgba(0, 0, 0, 0.95)';
                    menu.style.padding = '2rem';
                    menu.style.gap = '2rem';
                    menu.style.borderBottom = '1px solid #333';
                }
            });

            // Close menu when a link is clicked (mobile)
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        menu.style.display = 'none';
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
