document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Hero Reveal
    const hero = document.querySelector('.hero');
    setTimeout(() => {
        if (hero) hero.classList.add('revealed');
    }, 300);

    // 2. Intersection Observer for Skew Sections & Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about').forEach(el => observer.observe(el));

    // 3. Spotlight Movement on Scroll
    const spotlight = document.querySelector('.spotlight');
    const worksSection = document.querySelector('.works');

    if (spotlight && worksSection) {
        let mouseX = 50;
        let mouseY = 50;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 100;
        });

        window.addEventListener('scroll', () => {
            const rect = worksSection.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                spotlight.style.opacity = '1';

                const sectionHeight = rect.height;
                const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + sectionHeight)));

                // Vertical follows scroll, horizontal follows mouse for extra "wow"
                const yPos = scrollProgress * 100;
                spotlight.style.background = `radial-gradient(circle at ${mouseX}% ${yPos}%, transparent 5%, rgba(0,0,0,0.92) 75%)`;
            } else {
                spotlight.style.opacity = '0';
            }
        });
    }

    // 4. Smooth Scroll for Nav (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Letter Reveal Utility (Golden Master)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

});
