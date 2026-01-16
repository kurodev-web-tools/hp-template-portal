/**
 * List Page Script
 * Handles Gallery Rendering, Filtering, and Scroll Synchronization.
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    if (categoryId) {
        initGallery(categoryId);
    } else {
        // Fallback or Redirect
        document.getElementById('categoryTitle').textContent = 'All Templates';
    }
});

function initGallery(categoryId) {
    const categoryData = PORTAL_DATA.categories.find(c => c.id === categoryId);
    const templates = PORTAL_DATA.templates[categoryId];

    // Set Header Info & Theme
    const titleEl = document.getElementById('categoryTitle');
    if (categoryData) {
        if (titleEl) {
            titleEl.textContent = categoryData.name;
            // Provide fallback if var isn't set yet, but CSS should handle it
            titleEl.style.color = 'var(--theme-accent)';
        }

        // Apply Theme Class to Body
        if (categoryData.theme) {
            document.body.classList.add(categoryData.theme);
        }
    }

    // Render Index Bar and Gallery
    renderIndexBar(templates);
    renderGallery(templates);

    // Init Scroll Listeners
    setupScrollSync();
}

function renderIndexBar(templates) {
    const bar = document.getElementById('indexBar');
    // Get unique starting letters
    const letters = [...new Set(templates.map(t => t.tag))].sort();

    letters.forEach((letter, index) => {
        const link = document.createElement('div');
        link.className = 'index-link';
        if (index === 0) link.classList.add('active');
        link.textContent = letter;
        link.dataset.target = `card-${letter}`;

        link.addEventListener('click', () => {
            const targetCard = document.getElementById(`card-${letter}`);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                updateActiveIndex(link);
            }
        });

        bar.appendChild(link);
    });
}

function renderGallery(templates) {
    const container = document.getElementById('galleryContainer');

    if (templates.length === 0) {
        container.innerHTML = '<p style="margin:auto;">Coming Soon...</p>';
        return;
    }

    templates.forEach(t => {
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.id = `card-${t.tag}`;

        // Background Image Logic
        if (t.image) {
            card.style.backgroundImage = `url(${t.image})`;
            card.classList.add('has-image');
        }

        const labelHtml = t.themeLabel
            ? `<div class="theme-label">${t.themeLabel}</div>`
            : '';

        card.innerHTML = `
            <div class="placeholder-content">
                <div class="big-char">${t.tag}</div>
                ${labelHtml}
                <h3>${t.name}</h3>
                <button class="btn-view" onclick="openModal('${t.id}')">DETAILS</button>
            </div>
        `;

        // Make the whole card clickable for modal? 
        // Or just the button. The prompt said "Click card".
        // Let's attach click event to card, but avoid double trigger if button clicked.
        card.addEventListener('click', (e) => {
            // If user simply clicks the card (and not some interactive element if any)
            openModal(t.id);
        });

        container.appendChild(card);
    });
}

// Modal Logic
function openModal(templateId) {
    // Find template data
    let template;
    // Search across all categories or just current? 
    // Ideally we know the current category.
    // For simplicity, let's search all.
    for (const cat in PORTAL_DATA.templates) {
        const found = PORTAL_DATA.templates[cat].find(t => t.id === templateId);
        if (found) {
            template = found;
            break;
        }
    }

    if (!template) return;

    // Populate Modal
    document.getElementById('modalTag').textContent = template.tag;
    document.getElementById('modalTitle').textContent = template.name;
    document.getElementById('modalTitle').style.color = getCategoryColor(template.id) || 'var(--color-primary)';

    document.getElementById('modalDesc').textContent = template.description || 'No description available.';

    // Features
    const featContainer = document.getElementById('modalFeatures');
    featContainer.innerHTML = '';
    (template.features || []).forEach(f => {
        const span = document.createElement('span');
        span.className = 'feature-tag';
        span.textContent = f;
        featContainer.appendChild(span);
    });

    // Colors
    const colorContainer = document.getElementById('modalColors');
    colorContainer.innerHTML = '';
    (template.colors || []).forEach(c => {
        const div = document.createElement('div');
        div.className = 'color-dot';
        div.style.backgroundColor = c;
        colorContainer.appendChild(div);
    });

    // Link
    // Note: Adjusting path logic. 
    // If we are in public/list.html, and path is 'templates/business/a', 
    // then href should be 'templates/business/a/index.html' (relative) or '/templates/business/a/index.html' (root).
    // The previous implementation used `../../${t.path}/index.html`.
    // Let's adhere to that or check. 
    // If t.path is 'templates/business/a', and we are in public/, then just 'templates/business/a/index.html' works?
    // Wait, public/list.html is in public. 
    // templates is in public/templates.
    // So 'templates/business/a/index.html' is correct relative path.
    document.getElementById('modalLink').href = `${template.path}/index.html`;

    // Show
    document.getElementById('detailModal').classList.add('open');
}

// Helper to get color (quick fix)
function getCategoryColor(id) {
    if (id.startsWith('bus')) return '#00f2ff';
    if (id.startsWith('st')) return '#7000ff';
    return null;
}

// Close Logic
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('detailModal').classList.remove('open');
});
document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.id === 'detailModal') {
        document.getElementById('detailModal').classList.remove('open');
    }
});

function updateActiveIndex(activeLink) {
    document.querySelectorAll('.index-link').forEach(l => l.classList.remove('active'));
    activeLink.classList.add('active');
    activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

function setupScrollSync() {
    const container = document.getElementById('galleryContainer');
    const cards = document.querySelectorAll('.gallery-item');

    // Intersection Observer to detect which card is centered
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Highlight the card
                cards.forEach(c => c.classList.remove('active-card'));
                entry.target.classList.add('active-card');

                // Active the corresponding Index Link
                const tag = entry.target.id.replace('card-', '');
                const link = document.querySelector(`.index-link[data-target="card-${tag}"]`);
                if (link) {
                    updateActiveIndex(link);
                }
            }
        });
    }, {
        root: container,
        // Shrink the detection area to a thin vertical line in the center
        // This ensures ONLY the center element is "intersecting"
        rootMargin: '0px -50% 0px -50%',
        threshold: 0
    });

    cards.forEach(card => observer.observe(card));

    // Button Controls (PC)
    document.getElementById('scrollLeft').addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
    document.getElementById('scrollRight').addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });
}
