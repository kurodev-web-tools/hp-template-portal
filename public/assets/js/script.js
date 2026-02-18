/**
 * Portal Main Script
 * Handles Category Rendering and Navigation logic.
 */

// Global Hyperspeed instance for dynamic color control
let hyperspeedInstance = null;

// Category accent colors
const CATEGORY_COLORS = {
    'business': '#38bdf8',  // Sky blue
    'streamer': '#d946ef',  // Fuchsia
    'lp': '#f43f5e',        // Rose
    'portfolio': '#fbbf24'   // Amber
};

document.addEventListener('DOMContentLoaded', () => {
    initPortal();
});

function initPortal() {
    renderCategories();
    initHyperspeed();
    initLiquidGlass();
    // initMontage(); // Replaced by video
    initVideoControl();
    initViewTransitions();
}

function initVideoControl() {
    const video = document.querySelector('.montage-container video');
    const btn = document.getElementById('hero-video-toggle');
    const icon = btn.querySelector('.material-icons');

    if (!video || !btn) return;

    btn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            icon.textContent = 'pause';
            btn.setAttribute('aria-label', 'Pause Video');
        } else {
            video.pause();
            icon.textContent = 'play_arrow';
            btn.setAttribute('aria-label', 'Play Video');
        }
    });
}

function initViewTransitions() {
    // Intercept internal links for View Transitions
    document.querySelectorAll('a').forEach(link => {
        if (link.origin === location.origin && link.target !== '_blank') {
            link.addEventListener('click', e => {
                if (document.startViewTransition) {
                    e.preventDefault();
                    document.startViewTransition(() => {
                        window.location.href = link.href;
                    });
                }
            });
        }
    });
}


function initMontage() {
    const container = document.querySelector('.montage-container');
    if (!container) return;

    // 1. Gather all valid templates with images
    const allTemplates = [];
    if (PORTAL_DATA && PORTAL_DATA.templates) {
        Object.values(PORTAL_DATA.templates).forEach(list => {
            if (Array.isArray(list)) {
                list.forEach(t => {
                    if (t.image) allTemplates.push(t);
                });
            }
        });
    }

    if (allTemplates.length === 0) return;

    // 2. Shuffle and Pick 5
    const shuffled = allTemplates.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    // 3. Render Items
    container.innerHTML = ''; // Clear placeholder

    selected.forEach((t, index) => {
        const item = document.createElement('div');
        item.className = 'montage-item';
        if (index === 0) item.classList.add('active');
        item.style.backgroundImage = `url('${t.image}')`;

        // Add Overlay Label
        const overlay = document.createElement('div');
        overlay.className = 'montage-overlay';
        overlay.innerHTML = `<span class="label-featured">FEATURED</span> ${t.name}`;
        item.appendChild(overlay);

        container.appendChild(item);
    });

    // 4. Start Cycling
    const items = container.querySelectorAll('.montage-item');
    if (items.length <= 1) return;

    let activeIndex = 0;
    setInterval(() => {
        items[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % items.length;
        items[activeIndex].classList.add('active');
    }, 4000); // 4 seconds per slide
}

function initLiquidGlass() {
    if (window.PremiumEffects) {
        // Apply Liquid Metal Background
        if (document.querySelector('.bg-ambient')) {
            PremiumEffects.LiquidMetal('.bg-ambient', {
                colors: ['#00f2ff', '#7000ff', '#ff0055', '#4b0082'],
                count: 8
            });
        }
    }
}

function initHyperspeed() {
    if (window.PremiumEffects) {
        hyperspeedInstance = PremiumEffects.Hyperspeed('#hyperspeed-container', {
            count: 400,
            speed: 5, // Slower warp for ambient feel
            starColor: '#ffffff',
            bgColor: '5, 5, 10' // Specific deep space bg
        });
    }
}

/**
 * Render Category Cards into the Grid
 */
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return; // Not on Top Page

    const categories = PORTAL_DATA.categories;

    categories.forEach(cat => {
        const card = document.createElement('a');
        card.href = `list.html?category=${cat.id}`;
        card.className = `category-card fade-in ${cat.theme || ''}`; // Apply theme class

        card.innerHTML = `
            <h2>${cat.name}</h2>
            <p>${cat.description}</p>
        `;

        // Unified Glow Effect (CSS-based)
        card.style.setProperty('--card-color', CATEGORY_COLORS[cat.id]);

        // Coming Soon Logic
        if (cat.isComingSoon) {
            card.classList.add('is-coming-soon');
            card.removeAttribute('href'); // Remove link
            card.onclick = (e) => e.preventDefault(); // Extra safety

            const badge = document.createElement('div');
            badge.className = 'badge-coming-soon';
            badge.textContent = 'COMING SOON';
            card.appendChild(badge);
        }

        // Hyperspeed color change (PC only)
        card.addEventListener('mouseenter', () => {
            if (hyperspeedInstance && CATEGORY_COLORS[cat.id]) {
                hyperspeedInstance.setColor(CATEGORY_COLORS[cat.id]);
            }
        });

        card.addEventListener('mouseleave', () => {
            if (hyperspeedInstance) {
                hyperspeedInstance.resetColor();
            }
        });

        grid.appendChild(card);
    });
}
