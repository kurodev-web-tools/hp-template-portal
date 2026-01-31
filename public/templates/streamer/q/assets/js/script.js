document.addEventListener('DOMContentLoaded', () => {
    // Initialize Page Turn & Seal Effect
    const pageTurnSeal = new PageTurnSealEffect();
});

// ============================================
// PAGE TURN & SEAL EFFECT - Fantasy RPG Style
// ============================================

class PageTurnSealEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.panels = document.querySelectorAll('.content-panel');
        this.menuItems = document.querySelectorAll('.menu-list li');
        this.closeBtns = document.querySelectorAll('.close-btn');
        this.completedQuests = document.querySelectorAll('.quest-item.completed');
        
        this.init();
    }

    init() {
        this.setupPanelNavigation();
        this.setupMobileMenu();
        this.setupWaxSeals();
        
        if (!this.isMobile) {
            this.setupPageCurlEffect();
        }
    }

    setupPanelNavigation() {
        // Menu item click - open panel with page turn
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-target');
                this.openPanel(target);
            });
        });

        // Close button
        this.closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const panel = btn.closest('.content-panel');
                this.closePanel(panel);
            });
        });
    }

    openPanel(targetId) {
        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate(10);

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
            
            // Add page turning animation
            targetPanel.classList.add('page-turning');
            
            setTimeout(() => {
                targetPanel.classList.add('active');
            }, 10);
            
            // Remove animation class after completion
            setTimeout(() => {
                targetPanel.classList.remove('page-turning');
            }, 600);
        }
    }

    closePanel(panel) {
        panel.classList.remove('active');
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 200);
    }

    setupPageCurlEffect() {
        // PC: Panel corner hover for page curl effect
        this.panels.forEach(panel => {
            const header = panel.querySelector('.panel-header');
            if (!header) return;

            // Create corner hover area
            const corner = document.createElement('div');
            corner.className = 'panel-corner-hover';
            header.appendChild(corner);

            // Mouse enter - curl page
            corner.addEventListener('mouseenter', () => {
                panel.classList.add('corner-curl');
            });

            // Mouse leave - uncurl
            corner.addEventListener('mouseleave', () => {
                panel.classList.remove('corner-curl');
            });
        });
    }

    setupWaxSeals() {
        // Add wax seals to completed quests
        this.completedQuests.forEach(quest => {
            // Check if seal already exists
            if (quest.querySelector('.wax-seal')) return;

            // Create wax seal
            const seal = document.createElement('div');
            seal.className = 'wax-seal';
            seal.innerHTML = '✓'; // Checkmark
            
            // Insert seal at the beginning of quest item
            quest.insertBefore(seal, quest.firstChild);

            // Create observer for stamp animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Trigger stamp animation
                        setTimeout(() => {
                            seal.classList.add('stamp-animation');
                        }, 300);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(quest);
        });
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.mobile-menu');
        const mobileLinks = menu ? menu.querySelectorAll('a') : [];

        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = menu.classList.toggle('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = isActive ? 'close' : 'book';
                document.body.style.overflow = isActive ? 'hidden' : '';
            });

            menu.addEventListener('click', (e) => {
                if (e.target === menu) {
                    menu.classList.remove('active');
                    const icon = toggle.querySelector('.material-icons');
                    if (icon) icon.textContent = 'book';
                    document.body.style.overflow = '';
                }
            });

            // Mobile menu flash effect on selection
            mobileLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Add flash effect
                    link.classList.add('menu-flash');
                    
                    // Haptic feedback
                    if (navigator.vibrate) navigator.vibrate(20);
                    
                    setTimeout(() => {
                        link.classList.remove('menu-flash');
                        menu.classList.remove('active');
                        const icon = toggle.querySelector('.material-icons');
                        if (icon) icon.textContent = 'book';
                        document.body.style.overflow = '';
                    }, 300);
                });
            });
        }
    }
}
