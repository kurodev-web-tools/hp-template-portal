/**
 * Portal Main Script
 * Handles Category Rendering and Navigation logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPortal();
});

function initPortal() {
    renderCategories();
    initHyperspeed();
}

function initHyperspeed() {
    if (window.PremiumEffects) {
        PremiumEffects.Hyperspeed('#hyperspeed-container', {
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
        // card.style.setProperty('--card-color', cat.color); // Handled by CSS vars now

        card.innerHTML = `
            <h2>${cat.name}</h2>
            <p>${cat.description}</p>
        `;

        grid.appendChild(card);
    });
}
