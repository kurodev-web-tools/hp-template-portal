/**
 * Template Y - Yield (Direct Response LP)
 * High-Conversion JavaScript
 * Focus: Conversion optimization
 */

document.addEventListener('DOMContentLoaded', function () {
    // Animate bars on scroll
    const chartBars = document.querySelectorAll('.bar');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    const height = bar.style.getPropertyValue('--height');
                    bar.style.setProperty('--height', '0%');
                    
                    setTimeout(() => {
                        bar.style.transition = 'height 1s ease';
                        bar.style.setProperty('--height', height);
                    }, index * 200);
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const chartContainer = document.querySelector('.chart-bars');
    if (chartContainer) {
        barObserver.observe(chartContainer.parentElement);
    }
    
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Parse the numeric value
                const match = text.match(/^([+-]?)([\d,.]+)(.*)$/);
                if (match) {
                    const prefix = match[1];
                    const numStr = match[2].replace(/,/g, '');
                    const suffix = match[3];
                    const finalNum = parseFloat(numStr);
                    const isDecimal = numStr.includes('.');
                    
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    function update(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out cubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentNum = finalNum * easeProgress;
                        
                        let displayNum;
                        if (isDecimal) {
                            displayNum = currentNum.toFixed(1);
                        } else {
                            displayNum = Math.floor(currentNum).toLocaleString();
                        }
                        
                        target.textContent = prefix + displayNum + suffix;
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            target.textContent = text;
                        }
                    }
                    
                    requestAnimationFrame(update);
                }
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Lead form handling
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-hero');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="btn-text">送信中...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span class="btn-text">✓ 資料を送信しました</span>';
                btn.style.background = 'var(--green-light)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    this.reset();
                    
                    // Scroll to final CTA
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }, 2000);
            }, 1000);
        });
    }
    
    // Final form handling
    const finalForm = document.getElementById('finalForm');
    if (finalForm) {
        finalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-final');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="btn-text-main">送信中...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span class="btn-text-main">✓ 申し込み完了</span><span class="btn-text-sub">担当者から連絡いたします</span>';
                btn.style.background = '#059669';
                
                setTimeout(() => {
                    alert('ご申し込みありがとうございます。担当者より24時間以内にご連絡いたします。');
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    this.reset();
                }, 1500);
            }, 1500);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky CTA visibility based on scroll
    const stickyCtaDesktop = document.querySelector('.sticky-cta-desktop');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show sticky CTA after scrolling past hero
        if (stickyCtaDesktop) {
            if (currentScroll > 500) {
                stickyCtaDesktop.style.transform = 'translateY(0)';
            } else {
                stickyCtaDesktop.style.transform = 'translateY(-100%)';
            }
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Initialize sticky CTA hidden on desktop
    if (stickyCtaDesktop) {
        stickyCtaDesktop.style.transform = 'translateY(-100%)';
        stickyCtaDesktop.style.transition = 'transform 0.3s ease';
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.pillar, .testimonial, .faq-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
    
    // Urgency countdown effect
    const urgencyFill = document.querySelector('.urgency-fill');
    if (urgencyFill) {
        setTimeout(() => {
            urgencyFill.style.width = '57%';
        }, 500);
    }
    
    // Track scroll depth for analytics (placeholder)
    const scrollDepths = [25, 50, 75, 90];
    const trackedDepths = new Set();
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                trackedDepths.add(depth);
                console.log(`Scroll depth: ${depth}%`);
                // Here you would typically send to analytics
            }
        });
    }, { passive: true });
});
