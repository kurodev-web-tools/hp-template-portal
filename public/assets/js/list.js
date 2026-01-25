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
    // Init Particles
    initParticles();
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
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${t.themeLabel || t.name} template`);

            // Unified Glow: Set Color Variable
            const cardColor = (t.colors && t.colors.length > 0) ? t.colors[0] : '#00f2ff';
            card.style.setProperty('--card-color', cardColor);

            if (t.image) {
                card.style.backgroundImage = `url(${t.image})`;
                card.classList.add('has-image');
            }

            card.innerHTML = `
                <div class="placeholder-content">
                    <div class="big-char">${t.tag}</div>
                    <div class="theme-label">${t.themeLabel || ''}</div>
                </div>
            `;
            card.addEventListener('click', () => { if (shouldBlockClick()) return; Haptics.select(); openModal(t.id); });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    Haptics.select();
                    openModal(t.id);
                }
            });
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
    // Deep Space Tuning: Darker colors, high contrast
    PremiumEffects.Aurora('#auroraBg', {
        colors: ['#050a14', '#0f172a', '#1e1b4b'], // Very Dark Blue/Purple
        bg: 'transparent'
    });
}

function initGallery(categoryId) {
    const categoryData = PORTAL_DATA.categories.find(c => c.id === categoryId);
    const templates = PORTAL_DATA.templates[categoryId];

    // Category accent colors (matching top page)
    const CATEGORY_ACCENT_COLORS = {
        'business': '#38bdf8',  // Sky blue
        'streamer': '#d946ef',  // Fuchsia
        'lp': '#f43f5e',        // Rose
        'portfolio': '#fbbf24'   // Amber
    };

    // Set accent color CSS variable on body
    const accentColor = CATEGORY_ACCENT_COLORS[categoryId] || '#00f2ff';
    document.body.style.setProperty('--category-accent', accentColor);

    // Set Header Info & Theme
    const titleEl = document.getElementById('categoryTitle');
    if (categoryData) {
        if (titleEl) {
            titleEl.textContent = categoryData.name;
            titleEl.style.color = accentColor;
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

    // Init Aurora Background (Deep Space Tuned)
    initAurora(categoryData);
    // Init Particles
    initParticles();

    // Init 3D Tilt
    initTilt();

    // Init View Transitions
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

function initTilt() {
    if (!window.PremiumEffects) return;

    // Apply 3D Tilt to Gallery Cards
    // Subtle tilt, slight scale
    PremiumEffects.Tilt('.gallery-item, .mini-card', { // Apply to mini-card too
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
    // Deep Space Tuning: Darker base, subtle highlights
    let colors = ['#050a14', '#0f172a', '#1e1b4b'];

    if (categoryData) {
        switch (categoryData.id) {
            case 'business':
                colors = ['#020617', '#0c4a6e', '#1e3a8a']; // Deepest Blue
                break;
            case 'streamer':
                colors = ['#1a0524', '#4a044e', '#3b0764']; // Deep Purple
                break;
            case 'lp':
                colors = ['#2b0808', '#450a0a', '#4c0519']; // Deep Red
                break;
            case 'portfolio':
                colors = ['#1c1917', '#292524', '#451a03']; // Deep Amber/Brown
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

    // Init Particles (Star Field) - Layered on top of Aurora
    if (PremiumEffects.Particles) {
        PremiumEffects.Particles('#auroraBg', {
            color: 'rgba(255, 255, 255, 0.4)',
            limit: 100,
            speed: 0.2,
            zIndex: 1 // Ensure it sits above aurora gradient but below content
        });
    }
}

// === Filtering Logic ===
let activeTag = null;

function renderIndexBar(templates) {
    const bar = document.getElementById('indexBar');
    bar.innerHTML = ''; // Clear existing

    // 1. Tag Filter Buttons
    const allTags = [...new Set(templates.flatMap(t => t.features))];

    // Create Tag Container if not exists
    let tagContainer = document.getElementById('tagFilterContainer');
    if (!tagContainer) {
        tagContainer = document.createElement('div');
        tagContainer.id = 'tagFilterContainer';
        tagContainer.className = 'tag-filter-container';
        // Insert before index bar or inside it? Let's put it above.
        bar.parentElement.insertBefore(tagContainer, bar);
    }
    tagContainer.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'tag-btn active';
    allBtn.textContent = 'All';
    allBtn.onclick = () => filterByTag(null, templates, allBtn);
    tagContainer.appendChild(allBtn);

    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.textContent = `#${tag}`;
        btn.onclick = () => filterByTag(tag, templates, btn);
        tagContainer.appendChild(btn);
    });

    // 2. Alphabet Index (Original)
    // Get unique starting letters
    const letters = [...new Set(templates.map(t => t.tag))].sort();
    const implementedTags = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    letters.forEach((letter, index) => {
        const link = document.createElement('div');
        link.className = 'index-link';
        if (index === 0) link.classList.add('active');

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

function filterByTag(tag, templates, btn) {
    activeTag = tag;
    // Update Active Button
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter Templates
    const filtered = tag ? templates.filter(t => t.features.includes(tag)) : templates;

    // Re-render Gallery
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';
    renderGalleryCards(filtered, container);
}

function renderGallery(templates) {
    const container = document.getElementById('galleryContainer');

    // Show skeleton loading first
    container.innerHTML = `
        <div class="gallery-item skeleton-card">
            <div class="skeleton-content">
                <div class="skeleton skeleton-char"></div>
                <div class="skeleton skeleton-label"></div>
                <div class="skeleton skeleton-btn"></div>
            </div>
        </div>
        <div class="gallery-item skeleton-card">
            <div class="skeleton-content">
                <div class="skeleton skeleton-char"></div>
                <div class="skeleton skeleton-label"></div>
                <div class="skeleton skeleton-btn"></div>
            </div>
        </div>
    `;

    // Simulate brief loading for smooth transition
    setTimeout(() => {
        container.innerHTML = '';

        if (templates.length === 0) {
            container.innerHTML = '<p style="margin:auto;">Coming Soon...</p>';
            return;
        }

        renderGalleryCards(templates, container);
    }, 300);
}

function renderGalleryCards(templates, container) {
    templates.forEach(t => {
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.id = `card-${t.tag}`;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${t.themeLabel || t.name} template`);

        if (t.image) {
            card.style.backgroundImage = `url(${t.image})`;
            card.classList.add('has-image');
        }

        // Set Card Color for Unified Glow
        const cardColor = (t.colors && t.colors.length > 0) ? t.colors[0] : '#00f2ff';
        card.style.setProperty('--card-color', cardColor);

        const labelHtml = t.themeLabel
            ? `<div class="theme-label">${t.themeLabel}</div>`
            : '';

        card.innerHTML = `
            <div class="placeholder-content">
                <div class="big-char">${t.tag}</div>
                ${labelHtml}
                <div class="card-actions">
                    <button class="btn-view" onclick="openModal('${t.id}')">DETAILS</button>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            // Prevent if clicked on buttons
            if (e.target.closest('button')) return;
            if (shouldBlockClick()) return;
            Haptics.select();
            openModal(t.id);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                Haptics.select();
                openModal(t.id);
            }
        });

        container.appendChild(card);
    });

    // Re-init effects after cards are rendered
    setupScrollSync();
    initTilt();
}

// Copy Command Function (Removed)

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
    // Fix: Use block: 'nearest' to prevent vertical page jump on load
    activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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

// Particles Logic
let particlesInstance = null;

function initParticles() {
    if (particlesInstance) {
        particlesInstance.destroy();
        particlesInstance = null;
    }

    if (window.PremiumEffects && window.PremiumEffects.Particles) {
        let starContainer = document.getElementById('star-container');
        if (!starContainer) {
            starContainer = document.createElement('div');
            starContainer.id = 'star-container';
            starContainer.style.position = 'fixed';
            starContainer.style.top = '0';
            starContainer.style.left = '0';
            starContainer.style.width = '100%';
            starContainer.style.height = '100%';
            starContainer.style.zIndex = '-10'; 
            starContainer.style.pointerEvents = 'none';
            document.body.appendChild(starContainer);
        }

        particlesInstance = PremiumEffects.Particles('#star-container', {
            color: 'rgba(255, 255, 255, 0.6)',
            limit: 200,
            speed: 0.2
        });
    }
}
