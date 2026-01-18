/**
 * List Page Script
 * Handles Gallery Rendering, Filtering, and Scroll Synchronization.
 */

// =========================================
// Haptic Feedback Utility (Vibration API)
// =========================================

const Haptics = {
    /**
     * Check if Vibration API is supported
     */
    isSupported: () => 'vibrate' in navigator,

    /**
     * Light tap - for button clicks, card selections
     */
    tap: () => {
        if (Haptics.isSupported()) {
            navigator.vibrate(10);
        }
    },

    /**
     * Success feedback - double pulse
     */
    success: () => {
        if (Haptics.isSupported()) {
            navigator.vibrate([10, 50, 10]);
        }
    },

    /**
     * Error feedback - longer single pulse
     */
    error: () => {
        if (Haptics.isSupported()) {
            navigator.vibrate(50);
        }
    },

    /**
     * Selection feedback - medium pulse
     */
    select: () => {
        if (Haptics.isSupported()) {
            navigator.vibrate(15);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    if (categoryId) {
        // Single Category View
        initGallery(categoryId);
    } else {
        // All Categories View
        initAllCategories();
    }
});

/**
 * Initialize All Categories View
 * Shows all categories with sidebar navigation
 */
function initAllCategories() {
    const titleEl = document.getElementById('categoryTitle');
    titleEl.textContent = 'All Templates';

    // Hide single-category elements
    document.getElementById('indexBar').style.display = 'none';
    document.getElementById('galleryContainer').style.display = 'none';
    document.getElementById('galleryControls').style.display = 'none';

    // Show all-categories elements
    document.getElementById('sidebarNav').classList.add('visible');
    document.getElementById('allCategoriesContainer').classList.add('visible');

    // Render sidebar and sections
    renderSidebar();
    renderAllCategorySections();

    // Init Aurora with default colors
    initAuroraDefault();
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebarNav');

    PORTAL_DATA.categories.forEach((cat, index) => {
        const link = document.createElement('div');
        link.className = 'sidebar-link';
        if (index === 0) link.classList.add('active');
        link.textContent = cat.name;
        link.dataset.categoryId = cat.id;

        link.addEventListener('click', () => {
            Haptics.tap(); // Haptic feedback
            // Scroll to section
            const section = document.getElementById(`section-${cat.id}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            // Update active state
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });

        sidebar.appendChild(link);
    });
}

function renderAllCategorySections() {
    const container = document.getElementById('allCategoriesContainer');

    PORTAL_DATA.categories.forEach(cat => {
        const templates = PORTAL_DATA.templates[cat.id] || [];

        // Section wrapper
        const section = document.createElement('section');
        section.className = 'category-section';
        section.id = `section-${cat.id}`;

        // Header
        const header = document.createElement('div');
        header.className = 'category-section-header';
        header.innerHTML = `
            <h2>${cat.name}</h2>
            <span class="template-count">${templates.length} templates</span>
        `;

        // Mini gallery
        const gallery = document.createElement('div');
        gallery.className = 'mini-gallery';

        templates.forEach(t => {
            const card = document.createElement('div');
            card.className = 'mini-card';
            card.innerHTML = `
                <div class="big-char">${t.tag}</div>
                <div class="theme-label">${t.themeLabel || ''}</div>
            `;
            card.addEventListener('click', () => { if (shouldBlockClick()) return; Haptics.select(); openModal(t.id); });
            gallery.appendChild(card);
        });

        section.appendChild(header);
        section.appendChild(gallery);
        container.appendChild(section);

        // Enable drag scroll for mini gallery
        setupDragScroll(gallery);
    });

    // Setup scroll observer for sidebar active state
    setupSidebarScrollObserver();
}

function setupSidebarScrollObserver() {
    const container = document.getElementById('allCategoriesContainer');
    const sections = document.querySelectorAll('.category-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.id.replace('section-', '');
                const link = document.querySelector(`.sidebar-link[data-category-id="${catId}"]`);
                if (link) {
                    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, {
        root: container,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

function initAuroraDefault() {
    if (!window.PremiumEffects) return;

    const container = document.getElementById('auroraBg');
    if (!container) return;

    container.innerHTML = '';
    PremiumEffects.Aurora('#auroraBg', {
        colors: ['#00f2ff', '#7000ff', '#ff0055'],
        bg: 'transparent'
    });
}

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

    // Init Aurora Background
    initAurora(categoryData);

    // Init 3D Tilt
    initTilt();
}

function initTilt() {
    if (!window.PremiumEffects) return;

    // Apply 3D Tilt to Gallery Cards
    // Subtle tilt, slight scale
    PremiumEffects.Tilt('.gallery-item', {
        max: 8,
        perspective: 1200,
        scale: 1.02
    });
}

function initAurora(categoryData) {
    if (!window.PremiumEffects) return;

    const container = document.getElementById('auroraBg');
    if (!container) return;

    // Define colors based on category ID or Theme
    // Default: Business Blue/Gold
    let colors = ['#003366', '#d4af37', '#ffffff'];

    if (categoryData) {
        switch (categoryData.id) {
            case 'business':
                colors = ['#003366', '#1e90ff', '#d4af37']; // Deep Blue, Azure, Gold
                break;
            case 'streamer':
                colors = ['#7000ff', '#bc13fe', '#00ff00']; // Purple, Neon Pink, Green
                break;
            case 'lp':
                colors = ['#ff0055', '#ff9900', '#ffffff']; // Red, Orange, White
                break;
            case 'portfolio':
                colors = ['#ffcc00', '#333333', '#f0f0f0']; // Yellow, Dark, Light
                break;
        }
    }

    // Clear previous if any (simple innerHTML clear or reuse?)
    // PremiumEffects.Aurora appends to container. If we re-run, it might duplicate.
    // Ideally we should clear container first.
    container.innerHTML = '';

    PremiumEffects.Aurora('#auroraBg', {
        colors: colors,
        bg: 'transparent' // Let ambient bg show through if needed, or set base color
    });
}

function renderIndexBar(templates) {
    const bar = document.getElementById('indexBar');
    // Get unique starting letters
    const letters = [...new Set(templates.map(t => t.tag))].sort();

    // Determine which templates are implemented (have actual content)
    // For now, A-H are implemented, I-Z are placeholders
    const implementedTags = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    letters.forEach((letter, index) => {
        const link = document.createElement('div');
        link.className = 'index-link';
        if (index === 0) link.classList.add('active');

        // Gray out unimplemented templates
        const isImplemented = implementedTags.includes(letter);
        if (!isImplemented) {
            link.classList.add('disabled');
        }

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
                <button class="btn-view" onclick="openModal('${t.id}')">DETAILS</button>
            </div>
        `;

        // Make the whole card clickable for modal? 
        // Or just the button. The prompt said "Click card".
        // Let's attach click event to card, but avoid double trigger if button clicked.
        card.addEventListener('click', (e) => {
            if (shouldBlockClick()) return; // Prevent click after drag
            Haptics.select(); // Haptic feedback
            openModal(t.id);
        });

        container.appendChild(card);
    });
}

// Modal Logic
function openModal(templateId) {
    Haptics.tap(); // Haptic feedback on modal open

    // Find template data
    let template;
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
    // Use Theme Label for Title (e.g. "Authentic", "Bold") if available, else Name
    document.getElementById('modalTitle').textContent = template.themeLabel || template.name;

    // Dynamic Color for Title
    const primaryColor = (template.colors && template.colors.length > 0) ? template.colors[0] : 'var(--color-primary)';
    document.getElementById('modalTitle').style.color = primaryColor;

    // Also style the Tag watermark with this color (optional, but looks nice)
    document.getElementById('modalTag').style.webkitTextStrokeColor = primaryColor;
    document.getElementById('modalTag').style.opacity = '0.15';

    document.getElementById('modalDesc').textContent = template.description || 'No description available.';

    // Features
    const featContainer = document.getElementById('modalFeatures');
    featContainer.innerHTML = '';
    (template.features || []).forEach(f => {
        const span = document.createElement('span');
        span.className = 'feature-tag';
        span.textContent = f;
        span.style.borderColor = 'rgba(255,255,255,0.1)';
        // Hover effect is handled by CSS, but we could inject var
        featContainer.appendChild(span);
    });

    // Colors
    const colorContainer = document.getElementById('modalColors');
    colorContainer.innerHTML = '';
    (template.colors || []).forEach(c => {
        const div = document.createElement('div');
        div.className = 'color-dot';
        div.style.backgroundColor = c;
        div.style.boxShadow = `0 0 10px ${c}40`; // Add glow
        colorContainer.appendChild(div);
    });

    // Link
    const modalLink = document.getElementById('modalLink');
    modalLink.href = `${template.path}/index.html`;

    // Use White Background with Brand Color text for better contrast/premium look
    // Updated: Use pure CSS class control for outline style (Ghost Button)
    modalLink.style.background = '';
    modalLink.style.color = '';
    modalLink.style.border = '';
    modalLink.style.boxShadow = '';

    // We can inject the color as a CSS variable for the button to use on hover
    modalLink.style.setProperty('--btn-color', primaryColor);

    // Show
    document.getElementById('detailModal').classList.add('open');
}

// Helper to get color (Deprecated/Fallback)
function getCategoryColor(id) {
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
        Haptics.tap();
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
    document.getElementById('scrollRight').addEventListener('click', () => {
        Haptics.tap();
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Drag-to-Scroll (PC)
    setupDragScroll(container);
}

/**
 * Setup drag-to-scroll for a container
 * Implements click/drag threshold to avoid conflicting with card clicks
 */
let wasDragging = false; // Global flag to prevent clicks after drag

function setupDragScroll(container) {
    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    const DRAG_THRESHOLD = 5; // Pixels before considered a drag

    container.addEventListener('mousedown', (e) => {
        // Don't trigger on buttons or interactive elements
        if (e.target.closest('button') || e.target.closest('a')) return;

        isDown = true;
        isDragging = false;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = '';
    });

    container.addEventListener('mouseup', (e) => {
        isDown = false;
        container.style.cursor = '';

        // If was dragging, set global flag to block clicks
        if (isDragging) {
            wasDragging = true;
            e.preventDefault();
            e.stopPropagation();
            // Reset flag after a delay
            setTimeout(() => {
                wasDragging = false;
            }, 150); // Longer timeout for reliability
        }
        isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;

        const x = e.pageX - container.offsetLeft;
        const walk = x - startX;

        // Only start dragging after threshold
        if (Math.abs(walk) > DRAG_THRESHOLD) {
            isDragging = true;
            e.preventDefault();
            container.scrollLeft = scrollLeft - walk;
        }
    });

    // Add grab cursor on hover (PC only)
    container.style.cursor = 'grab';
}

/**
 * Check if a click should be blocked (after drag)
 */
function shouldBlockClick() {
    return wasDragging;
}
