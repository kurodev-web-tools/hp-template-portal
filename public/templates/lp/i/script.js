/**
 * Template I - Interactive Calculator LP
 * Real-time Simulation Logic
 */

(function() {
    'use strict';

    // ========================================
    // Configuration
    // ========================================
    const CONFIG = {
        currency: 'JPY',
        locale: 'ja-JP',
        animationDuration: 800,
        chartYears: 10
    };

    // ========================================
    // State Management
    // ========================================
    const state = {
        bill: 15000,
        people: 4,
        rate: 30,
        monthlySavings: 0,
        annualSavings: 0,
        totalSavings: 0
    };

    // ========================================
    // DOM Elements
    // ========================================
    const elements = {
        // Sliders
        billSlider: document.getElementById('bill-slider'),
        peopleSlider: document.getElementById('people-slider'),
        rateSlider: document.getElementById('rate-slider'),
        
        // Displays
        billDisplay: document.getElementById('bill-display'),
        peopleDisplay: document.getElementById('people-display'),
        rateDisplay: document.getElementById('rate-display'),
        
        // Fills
        billFill: document.getElementById('bill-fill'),
        peopleFill: document.getElementById('people-fill'),
        rateFill: document.getElementById('rate-fill'),
        
        // Results
        monthlySavings: document.getElementById('monthly-savings'),
        annualSavings: document.getElementById('annual-savings'),
        totalSavings: document.getElementById('total-savings'),
        savingsRate: document.getElementById('savings-rate'),
        
        // Hero
        heroSavings: document.getElementById('hero-savings'),
        previewSavings: document.getElementById('preview-savings'),
        
        // Chart
        yearChart: document.getElementById('year-chart'),
        
        // FAQ
        faqItems: document.querySelectorAll('.faq-item'),
        
        // Sticky CTA
        stickyCTA: document.querySelector('.sticky-cta'),
        
        // Counter animations
        counters: document.querySelectorAll('[data-count]')
    };

    // ========================================
    // Number Formatter
    // ========================================
    const formatNumber = (number) => {
        return new Intl.NumberFormat(CONFIG.locale).format(Math.round(number));
    };

    const formatCurrency = (number) => {
        return new Intl.NumberFormat(CONFIG.locale, {
            style: 'currency',
            currency: CONFIG.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // ========================================
    // Calculator Logic
    // ========================================
    const calculate = () => {
        // Get values from sliders
        state.bill = parseInt(elements.billSlider.value);
        state.people = parseInt(elements.peopleSlider.value);
        state.rate = parseInt(elements.rateSlider.value);
        
        // Calculate savings
        // Base calculation: current bill * savings rate
        // Bonus for larger families
        const familyBonus = state.people >= 4 ? 1.1 : 1.0;
        state.monthlySavings = (state.bill * (state.rate / 100)) * familyBonus;
        state.annualSavings = state.monthlySavings * 12;
        state.totalSavings = state.annualSavings * CONFIG.chartYears;
        
        // Update displays
        updateDisplays();
        updateChart();
    };

    // ========================================
    // Update Displays
    // ========================================
    const updateDisplays = () => {
        // Update input displays
        elements.billDisplay.textContent = formatNumber(state.bill);
        elements.peopleDisplay.textContent = state.people;
        elements.rateDisplay.textContent = state.rate;
        
        // Update slider fills
        const billPercent = ((state.bill - 5000) / (50000 - 5000)) * 100;
        const peoplePercent = ((state.people - 1) / (8 - 1)) * 100;
        const ratePercent = ((state.rate - 10) / (50 - 10)) * 100;
        
        elements.billFill.style.width = `${billPercent}%`;
        elements.peopleFill.style.width = `${peoplePercent}%`;
        elements.rateFill.style.width = `${ratePercent}%`;
        
        // Update result displays with animation
        animateNumber(elements.monthlySavings, state.monthlySavings, true);
        animateNumber(elements.annualSavings, state.annualSavings, false);
        animateNumber(elements.totalSavings, state.totalSavings, false);
        elements.savingsRate.textContent = `${state.rate}%`;
        
        // Update hero preview
        const heroAmount = Math.round(state.totalSavings / 10000);
        if (elements.heroSavings) {
            elements.heroSavings.textContent = heroAmount;
        }
        if (elements.previewSavings) {
            elements.previewSavings.textContent = formatCurrency(state.annualSavings);
        }
    };

    // ========================================
    // Number Animation
    // ========================================
    const animateNumber = (element, target, isCurrency) => {
        if (!element) return;
        
        const start = parseInt(element.dataset.value || 0);
        const duration = CONFIG.animationDuration;
        const startTime = performance.now();
        
        element.dataset.value = target;
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const current = start + (target - start) * easeProgress;
            
            if (isCurrency) {
                element.textContent = formatCurrency(current);
            } else {
                element.textContent = formatNumber(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    };

    // ========================================
    // Chart Generation
    // ========================================
    const generateChart = () => {
        if (!elements.yearChart) return;
        
        elements.yearChart.innerHTML = '';
        
        for (let year = 1; year <= CONFIG.chartYears; year++) {
            const savings = state.annualSavings * year;
            const maxSavings = state.annualSavings * CONFIG.chartYears;
            const height = maxSavings > 0 ? (savings / maxSavings) * 100 : 0;
            
            const barItem = document.createElement('div');
            barItem.className = 'bar-item';
            barItem.innerHTML = `
                <div class="bar-fill" style="height: 0%;" data-height="${height}%"></div>
                <span class="bar-label">${year}年</span>
            `;
            
            elements.yearChart.appendChild(barItem);
        }
        
        // Animate chart bars
        setTimeout(() => {
            const bars = elements.yearChart.querySelectorAll('.bar-fill');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.height = bar.dataset.height;
                }, index * 50);
            });
        }, 100);
    };

    const updateChart = () => {
        if (!elements.yearChart) return;
        
        const bars = elements.yearChart.querySelectorAll('.bar-fill');
        const maxSavings = state.annualSavings * CONFIG.chartYears;
        
        bars.forEach((bar, index) => {
            const year = index + 1;
            const savings = state.annualSavings * year;
            const height = maxSavings > 0 ? (savings / maxSavings) * 100 : 0;
            bar.style.height = `${height}%`;
        });
    };

    // ========================================
    // FAQ Accordion
    // ========================================
    const initFAQ = () => {
        elements.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                elements.faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };

    // ========================================
    // Counter Animation (Scroll Trigger)
    // ========================================
    const initCounters = () => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.dataset.count);
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    const update = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const current = target * easeProgress;
                        
                        if (target % 1 !== 0) {
                            counter.textContent = current.toFixed(1);
                        } else {
                            counter.textContent = Math.round(current);
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    };
                    
                    requestAnimationFrame(update);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        elements.counters.forEach(counter => observer.observe(counter));
    };

    // ========================================
    // Sticky CTA Controller
    // ========================================
    class StickyCTAController {
        constructor() {
            this.lastScrollY = 0;
            this.ticking = false;
            this.init();
        }

        init() {
            if (window.innerWidth >= 768) return;
            this.bindEvents();
        }

        bindEvents() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        this.handleScroll();
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        }

        handleScroll() {
            const currentScrollY = window.scrollY;
            
            // Hide when near top or at calculator section
            const calculator = document.getElementById('simulation');
            const cta = document.getElementById('contact');
            
            if (calculator && cta) {
                const calcRect = calculator.getBoundingClientRect();
                const ctaRect = cta.getBoundingClientRect();
                
                if (calcRect.top < window.innerHeight && calcRect.bottom > 0) {
                    this.hide();
                } else if (ctaRect.top < window.innerHeight) {
                    this.hide();
                } else if (currentScrollY < 100) {
                    this.hide();
                } else {
                    this.show();
                }
            }
            
            this.lastScrollY = currentScrollY;
        }

        show() {
            elements.stickyCTA?.classList.remove('hidden');
        }

        hide() {
            elements.stickyCTA?.classList.add('hidden');
        }
    }

    // ========================================
    // Smooth Scroll
    // ========================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ========================================
    // Save Result
    // ========================================
    const initSaveResult = () => {
        const saveBtn = document.getElementById('save-result');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const result = {
                    monthlyBill: state.bill,
                    people: state.people,
                    savingsRate: state.rate,
                    monthlySavings: Math.round(state.monthlySavings),
                    annualSavings: Math.round(state.annualSavings),
                    totalSavings: Math.round(state.totalSavings),
                    timestamp: new Date().toISOString()
                };
                
                // Save to localStorage
                localStorage.setItem('smartSaverResult', JSON.stringify(result));
                
                // Show confirmation
                alert(`シミュレーション結果を保存しました！\n\n年間削減額: ${formatCurrency(state.annualSavings)}\n10年間の累積: ${formatCurrency(state.totalSavings)}\n\nこの結果をもってお問い合わせください。`);
                
                // Track event (if analytics is available)
                if (window.gtag) {
                    window.gtag('event', 'save_simulation', {
                        annual_savings: state.annualSavings
                    });
                }
            });
        }
    };

    // ========================================
    // Initialize
    // ========================================
    const init = () => {
        // Bind slider events
        if (elements.billSlider) {
            elements.billSlider.addEventListener('input', calculate);
        }
        if (elements.peopleSlider) {
            elements.peopleSlider.addEventListener('input', calculate);
        }
        if (elements.rateSlider) {
            elements.rateSlider.addEventListener('input', calculate);
        }
        
        // Initialize components
        initFAQ();
        initCounters();
        initSmoothScroll();
        initSaveResult();
        
        // Initialize sticky CTA
        new StickyCTAController();
        
        // Initial calculation
        calculate();
        generateChart();
        
        // Expose to global for debugging
        window.SmartSaver = {
            state,
            calculate,
            formatCurrency
        };
        
        console.log('✨ Smart Saver Calculator initialized');
    };

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();