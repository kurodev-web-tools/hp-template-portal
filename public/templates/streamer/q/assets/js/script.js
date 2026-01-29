document.addEventListener('DOMContentLoaded', () => {
    // Menu Navigation
    const menuItems = document.querySelectorAll('.menu-list li');
    const panels = document.querySelectorAll('.content-panel');
    const closeBtns = document.querySelectorAll('.close-btn');

    function openPanel(targetId) {
        // Play sound effect (haptics for now)
        if (navigator.vibrate) navigator.vibrate(10);

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
            // Allow display:none to clear before opacity transition
            setTimeout(() => {
                targetPanel.classList.add('active');
            }, 10);
        }
    }

    function closePanel(panel) {
        panel.classList.remove('active');
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 200); // Match CSS transition
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            openPanel(target);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.closest('.content-panel');
            closePanel(panel);
        });
    });

    // Mobile Menu Logic (Quest Book)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const mobileLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');

            // Icon switch
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'book';

            // Body scroll lock
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when clicking outside book (on the overlay)
        menu.addEventListener('click', (e) => {
            if (e.target === menu) {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            }
        });

        // Close menu when link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }
});
