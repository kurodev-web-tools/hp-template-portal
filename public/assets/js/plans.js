document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const container = document.querySelector('.pricing-container');
    const cards = document.querySelectorAll('.pricing-card');

    if (!container || cards.length === 0) return;

    // --- Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPlan = tab.dataset.tab;

            // Update Tab Active State
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Scroll to Target Card
            const targetCard = document.querySelector(`.pricing-card[data-plan="${targetPlan}"]`);
            if (targetCard) {
                // Determine scroll position based on card index
                // Standard is index 0, Premium is index 1
                const index = Array.from(cards).indexOf(targetCard);
                const scrollAmount = index * container.offsetWidth;

                container.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });

                // Update Card Active State (for scaling effect)
                updateActiveCard(index);
            }
        });
    });

    // --- Update Active State Helper ---
    function updateActiveCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // --- Swipe Support (Touch Events) ---
    let startX = 0;
    let isDown = false;

    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDown = true;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        // Optional: Prevent default scrolling if needed, but horizontal scrolling should be native-ish
    });

    container.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50; // swipe threshold

        if (Math.abs(diff) > threshold) {
            // Determine current index based on scroll position
            const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
            let nextIndex = currentIndex;

            if (diff > 0) {
                // Swiped Left -> Go Next (Premium)
                nextIndex = Math.min(currentIndex + 1, cards.length - 1);
            } else {
                // Swiped Right -> Go Prev (Standard)
                nextIndex = Math.max(currentIndex - 1, 0);
            }

            // Trigger click on corresponding tab to reuse logic
            const targetPlan = cards[nextIndex].dataset.plan;
            const targetTab = document.querySelector(`.tab-btn[data-tab="${targetPlan}"]`);
            if (targetTab) {
                targetTab.click();
            }
        } else {
            // Snap back if swipe wasn't strong enough
            const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
            const targetPlan = cards[currentIndex].dataset.plan;
            const targetTab = document.querySelector(`.tab-btn[data-tab="${targetPlan}"]`);
            if (targetTab) {
                targetTab.click(); // Re-center
            }
        }
    });

    // --- Initial State ---
    // On load, set Standard as active
    updateActiveCard(0);

    // --- Resize Handler ---
    // Ensure correct scroll position on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-align to currently active tab
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) activeTab.click();
        }, 100);
    });
});
