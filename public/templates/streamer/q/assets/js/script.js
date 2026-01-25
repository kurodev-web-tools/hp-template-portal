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
});
