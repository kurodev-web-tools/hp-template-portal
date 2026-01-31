document.addEventListener('DOMContentLoaded', () => {
    // Initialize Pro Stats Counter
    initProStats();

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
            if (icon) icon.textContent = isActive ? 'close' : 'bolt';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'bolt';

                document.body.style.overflow = '';
            });
        });
    }

    // Ranking animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rank-row').forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.6s ease-out';
        observer.observe(row);
    });
});

// ============================================
// PRO STAT COUNTER - Advanced Stats Animation
// ============================================

function initProStats() {
    const scoreItems = document.querySelectorAll('.score-item .value');

    // Store original values and parse format
    const statsData = new Map();

    scoreItems.forEach(item => {
        const originalText = item.innerText;
        const hasPercent = originalText.includes('%');
        const numericValue = parseFloat(originalText.replace(/,/g, '').replace('%', ''));
        const decimals = originalText.includes('.') ?
            originalText.split('.')[1].replace('%', '').length : 0;

        statsData.set(item, {
            originalText,
            numericValue,
            hasPercent,
            decimals,
            isAnimating: false,
            glitchInterval: null
        });

        // Start from 0
        item.innerText = formatValue(0, hasPercent, decimals);
    });

    // IntersectionObserver for count-up animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const data = statsData.get(item);

                if (data && !data.isAnimating) {
                    data.isAnimating = true;
                    animateCountUp(item, data);
                }

                statsObserver.unobserve(item);
            }
        });
    }, { threshold: 0.5 });

    scoreItems.forEach(item => {
        statsObserver.observe(item);
    });

    // Live Update Glitch on hover
    scoreItems.forEach(item => {
        const data = statsData.get(item);

        item.parentElement.addEventListener('mouseenter', () => {
            startLiveGlitch(item, data);
        });

        item.parentElement.addEventListener('mouseleave', () => {
            stopLiveGlitch(item, data);
        });
    });
}

function parseLocaleNumber(stringNumber) {
    const thousandSeparator = ',';
    const decimalSeparator = '.';
    return parseFloat(stringNumber
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
        .replace('%', '')
    );
}

function formatValue(value, hasPercent, decimals) {
    // Use toLocaleString for comma separation logic
    // We handle fixed decimals manually to ensure trailing zeros if needed
    let formatted = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

    if (hasPercent) {
        formatted += '%';
    }
    return formatted;
}

function animateCountUp(element, data) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = data.numericValue * easeProgress;

        element.innerText = formatValue(currentValue, data.hasPercent, data.decimals);

        if (currentStep >= steps) {
            clearInterval(interval);
            // Ensure we land exactly on the original text (preserving original format perfectly)
            element.innerText = data.originalText;
            data.isAnimating = false;
        }
    }, stepDuration);
}

function startLiveGlitch(element, data) {
    // Add glitching class
    element.parentElement.classList.add('live-glitching');

    // Random micro changes
    data.glitchInterval = setInterval(() => {
        const variation = (Math.random() - 0.5) * 0.2; // ±0.1 variation
        let glitchValue = data.numericValue + variation;

        // Clamp to reasonable bounds
        glitchValue = Math.max(0, glitchValue);
        if (data.hasPercent) {
            glitchValue = Math.min(100, glitchValue);
        }

        element.innerText = formatValue(glitchValue, data.hasPercent, data.decimals);
    }, 100); // Update every 100ms
}

function stopLiveGlitch(element, data) {
    // Remove glitching class
    element.parentElement.classList.remove('live-glitching');

    // Clear interval
    if (data.glitchInterval) {
        clearInterval(data.glitchInterval);
        data.glitchInterval = null;
    }

    // Return to original value
    element.innerText = data.originalText;
}
