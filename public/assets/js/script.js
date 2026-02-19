/**
 * Portal Main Script
 * Handles Category Rendering and Navigation logic.
 */

import { Hyperspeed } from './effects/hyperspeed.js';
import { LiquidMetal } from './effects/liquid-metal.js';
import { Tilt } from './effects/tilt.js';
import { Spotlight } from './effects/spotlight.js';
import { PORTAL_DATA } from './data.js';

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
    initPremiumCards();
}

function initPremiumCards() {
    // 1. 3D Tilt
    Tilt('.category-card', {
        max: 5,        // Subtle tilt
        perspective: 800,
        scale: 1.02
    });

    // 2. Spotlight Logic
    Spotlight('.category-card', {
        size: 350,
        color: 'rgba(255, 255, 255, 0.12)'
    });
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

        const badge = document.createElement('span');
        badge.className = 'label-featured';
        badge.textContent = 'FEATURED';

        overlay.appendChild(badge);
        overlay.appendChild(document.createTextNode(` ${t.name}`));
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
    // Apply Liquid Metal Background
    if (document.querySelector('.bg-ambient')) {
        LiquidMetal('.bg-ambient', {
            colors: ['#00f2ff', '#7000ff', '#ff0055', '#4b0082'],
            count: 8
        });
    }
}

function initHyperspeed() {
    hyperspeedInstance = Hyperspeed('#hyperspeed-container', {
        count: 400,
        speed: 5, // Slower warp for ambient feel
        starColor: '#ffffff',
        bgColor: '5, 5, 10' // Specific deep space bg
    });
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

        const content = document.createElement('div');
        content.className = 'card-content';

        const icon = document.createElement('span');
        icon.className = 'material-icons category-icon';
        icon.textContent = cat.icon || 'star';
        content.appendChild(icon);

        const h2 = document.createElement('h2');
        h2.textContent = cat.name;
        content.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = cat.description;
        content.appendChild(p);

        const glow = document.createElement('div');
        glow.className = 'card-glow';

        card.appendChild(content);
        card.appendChild(glow);

        // Unified Glow Effect (CSS-based)
        card.style.setProperty('--card-color', cat.color || '#00f2ff');

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
            if (hyperspeedInstance && cat.color) {
                hyperspeedInstance.setColor(cat.color);
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
