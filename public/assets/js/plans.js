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
                const index = Array.from(cards).indexOf(targetCard);

                // Desktop: Horizontal alignment for 3 cards
                // Mobile: Scroll logic for swiper
                if (window.innerWidth < 1024) {
                    const scrollAmount = index * container.offsetWidth;
                    container.scrollTo({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }

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

    container.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50; // swipe threshold

        if (Math.abs(diff) > threshold) {
            const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
            let nextIndex = currentIndex;

            if (diff > 0) {
                nextIndex = Math.min(currentIndex + 1, cards.length - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }

            const targetPlan = cards[nextIndex].dataset.plan;
            const targetTab = document.querySelector(`.tab-btn[data-tab="${targetPlan}"]`);
            if (targetTab) {
                targetTab.click();
            }
        }
    });

    // --- Initial State ---
    // Standard (Index 1) as initial for focus on the middle/popular
    setTimeout(() => {
        const standardTab = document.querySelector('.tab-btn[data-tab="standard"]');
        if (standardTab) standardTab.click();
    }, 100);

    // --- Resize Handler ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab && window.innerWidth < 768) activeTab.click();
        }, 100);
    });
});
