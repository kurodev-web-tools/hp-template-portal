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
    initMontage();
    initViewTransitions();
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
    const items = document.querySelectorAll('.montage-item');
    if (items.length === 0) return;
    
    let activeIndex = 0;
    // Auto-rotate every 4 seconds
    setInterval(() => {
        items[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % items.length;
        items[activeIndex].classList.add('active');
        
        // Optional: Update label if needed (e.g. data-label attribute)
    }, 4000);
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
