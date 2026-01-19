/**
 * Business Template I: Intelligent
 * Integration with Premium Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Blur Text Animation for Header
    if (window.PremiumEffects && window.PremiumEffects.BlurText) {
        window.PremiumEffects.BlurText('.blur-text', {
            delay: 40,
            duration: 1200
        });
    }

    // 2. Custom CountUp with Comma Formatting
    initCountUp();

    // 3. Initialize Tilt Effect for Cards
    if (window.PremiumEffects && window.PremiumEffects.Tilt) {
        window.PremiumEffects.Tilt('.tilt-card', {
            max: 12,
            perspective: 800,
            scale: 1.02
        });
    }

    // 4. Initialize Aurora Background (Subtle)
    if (window.PremiumEffects && window.PremiumEffects.Aurora) {
        const bgContainer = document.querySelector('.bg-ambient');
        if (bgContainer) {
            window.PremiumEffects.Aurora('.bg-ambient', {
                colors: ['#4B0082', '#00f2ff', '#7000ff'],
                bg: 'transparent'
            });
        }
    }

    // 5. Initialize Globe for Network Page
    if (window.PremiumEffects && window.PremiumEffects.Globe) {
        const globeContainer = document.querySelector('#globe-container');
        if (globeContainer) {
            window.PremiumEffects.Globe('#globe-container', {
                color: '#00f2ff',
                size: 400
            });
        }
    }

    // 6. Animate Charts on Load
    animateCharts();

    // 7. Tab Switching for Analysis Charts
    initChartTabs();

    // 8. Mobile Side Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isOpen);
        });

        const navLinks = sidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            });
        });
    }
});

/**
 * Custom CountUp that properly handles commas
 */
function initCountUp() {
    const elements = document.querySelectorAll('.count-up');
    const duration = 2000;

    const formatNumber = (num, hasComma, suffix) => {
        let str = hasComma ? num.toLocaleString('en-US') : num.toString();
        return str + suffix;
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const originalText = el.dataset.originalValue || el.innerText;
                el.dataset.originalValue = originalText;

                // Extract number and suffix
                const numMatch = originalText.match(/^([\d,]+\.?\d*)/);
                if (!numMatch) return;

                const numStr = numMatch[1].replace(/,/g, '');
                const target = parseFloat(numStr);
                const suffix = originalText.replace(numMatch[1], '');
                const hasComma = originalText.includes(',');
                const hasDecimal = numStr.includes('.');

                let start = 0;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (easeOutQuart)
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const current = start + (target - start) * eased;

                    const displayNum = hasDecimal ? current.toFixed(1) : Math.floor(current);
                    el.innerText = formatNumber(parseFloat(displayNum), hasComma, suffix);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));
}

/**
 * Animate SVG chart lines on page load
 */
function animateCharts() {
    // Target both path and polyline elements
    const charts = document.querySelectorAll('.fake-chart path:first-of-type, .fake-chart polyline');

    charts.forEach(el => {
        const length = el.getTotalLength ? el.getTotalLength() : 1000;

        // Set up dash array
        el.style.strokeDasharray = length;
        el.style.strokeDashoffset = length;
        el.style.transition = 'none';

        // Force reflow
        el.getBoundingClientRect();

        // Animate with slight delay for dramatic effect
        setTimeout(() => {
            el.style.transition = 'stroke-dashoffset 2s ease-out';
            el.style.strokeDashoffset = '0';
        }, 300);
    });
}

/**
 * Initialize Chart Tab Switching (Daily/Weekly/Monthly)
 */
function initChartTabs() {
    const tabControls = document.querySelector('.tab-controls');
    if (!tabControls) return;

    const buttons = tabControls.querySelectorAll('button[data-tab]');
    const chartLines = document.querySelectorAll('.chart-line[data-chart]');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch chart visibility with animation
            chartLines.forEach(line => {
                if (line.dataset.chart === targetTab) {
                    // Show this line with animation
                    line.style.opacity = '1';
                    const length = line.getTotalLength ? line.getTotalLength() : 1000;
                    line.style.strokeDasharray = length;
                    line.style.strokeDashoffset = length;
                    line.style.transition = 'none';
                    line.getBoundingClientRect();
                    setTimeout(() => {
                        line.style.transition = 'stroke-dashoffset 1.5s ease-out, opacity 0.3s';
                        line.style.strokeDashoffset = '0';
                    }, 50);
                } else {
                    // Hide other lines
                    line.style.opacity = '0';
                }
            });
        });
    });
}
