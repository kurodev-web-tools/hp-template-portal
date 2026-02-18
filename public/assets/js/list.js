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

    // Show Mobile Nav
    const mobileNav = document.getElementById('mobileCategoryNav');
    if (mobileNav) mobileNav.style.display = ''; // Reset to CSS default (flex on mobile)

    // Enable Vertical Scroll on Main Content
    document.querySelector('.gallery-content').classList.add('scrollable-y');

    // Render sidebar and sections
    renderSidebar();
    renderAllCategorySections();
    renderMobileNav();
    setupMobileNavObserver(); // Added Scroll-Sync

    // Dynamic Meta (SEO)
    updateDynamicMeta(null);

    // Init Aurora with default colors
    initAuroraDefault();
    // Init Particles
    initParticles();
}

/**
 * Mobile Nav Scroll-Sync
 * Automatically updates active state of mobile nav as user scrolls
 */
function setupMobileNavObserver() {
    const sections = document.querySelectorAll('.category-section');
    const navLinks = document.querySelectorAll('.mobile-cat-link');
    const mobileNav = document.getElementById('mobileCategoryNav');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.id.replace('section-', '');

                navLinks.forEach(link => {
                    if (link.dataset.id === catId) {
                        link.classList.add('active');
                        // Bonus: Scroll link into view horizontally
                        link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        root: document.querySelector('.gallery-content.scrollable-y'),
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebarNav');

    PORTAL_DATA.categories.forEach((cat, index) => {
        const link = document.createElement('div');
        link.className = 'sidebar-link';
        if (index === 0) link.classList.add('active');
        link.textContent = cat.name;
        link.dataset.categoryId = cat.id;

        if (cat.isComingSoon) {
            link.style.opacity = '0.5';
            link.innerHTML += ' <span class="material-icons" style="font-size:0.8em; vertical-align:middle; margin-left:4px;">lock</span>';
        }

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

        if (cat.isComingSoon) {
            const banner = document.createElement('div');
            banner.className = 'coming-soon-banner';
            banner.textContent = 'Coming Soon - New Designs Under Development';
            gallery.appendChild(banner);
            // We can skip rendering cards if we want, or just append this.
            // The instructions say: "SKIP rendering the loop of 26 templates."
            // So we will just append banner and not loop.
        } else {
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

                    // Individual Background Position Adjustment (Same as main gallery)
                    if (t.bgPosition) {
                        card.style.backgroundPosition = t.bgPosition;
                    }
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
        }

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

    // Error Guard: Redirect if category not found
    if (!categoryData) {
        window.location.href = '404.html';
        return;
    }
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

    // Disable Vertical Scroll (Horizontal only)
    const galleryContent = document.querySelector('.gallery-content');
    if (galleryContent) galleryContent.classList.remove('scrollable-y');

    // Hide Mobile Nav (Only for all-categories)
    const mobileNav = document.getElementById('mobileCategoryNav');
    if (mobileNav) mobileNav.style.display = 'none';

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

    // Check Coming Soon for Single Category Page
    if (categoryData.isComingSoon) {
        const container = document.getElementById('galleryContainer');
        container.innerHTML = ''; // Clear skeleton or anything else

        const banner = document.createElement('div');
        banner.className = 'coming-soon-banner';
        banner.style.marginTop = '4rem';
        banner.textContent = 'Coming Soon - This collection is under development';

        // Append banner directly
        container.appendChild(banner);

        // Hide Index Bar as it's not needed
        const indexBar = document.getElementById('indexBar');
        if (indexBar) indexBar.style.display = 'none';

        // Dynamic Meta
        updateDynamicMeta(categoryData);

        // Init Backgrounds
        initAurora(categoryData);
        initParticles();

        return; // Stop further rendering
    }

    // Render Index Bar and Gallery
    renderIndexBar(templates);
    renderGallery(templates);

    // Dynamic Meta (SEO)
    updateDynamicMeta(categoryData);


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

            // Individual Background Position Adjustment
            if (t.bgPosition) {
                card.style.backgroundPosition = t.bgPosition;
            }
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
    document.body.classList.add('modal-open');

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

    // Set Category Color for Background Glow
    const primaryColor = (template.colors && template.colors.length > 0) ? template.colors[0] : 'var(--color-primary)';
    const modalOverlay = document.getElementById('detailModal');
    modalOverlay.style.setProperty('--card-color', primaryColor);

    // Populate Modal
    document.getElementById('modalTag').textContent = template.tag;
    document.getElementById('modalTitle').textContent = template.themeLabel || template.name;
    document.getElementById('modalTitle').style.color = primaryColor;
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
        featContainer.appendChild(span);
    });

    // Colors
    const colorContainer = document.getElementById('modalColors');
    colorContainer.innerHTML = '';
    (template.colors || []).forEach(c => {
        const div = document.createElement('div');
        div.className = 'color-dot';
        div.style.backgroundColor = c;
        div.style.boxShadow = `0 0 10px ${c}40`;
        colorContainer.appendChild(div);
    });

    // Link
    const modalLink = document.getElementById('modalLink');
    modalLink.href = `${template.path}/index.html`;
    modalLink.style.setProperty('--btn-color', primaryColor);

    // Enhance View Transition on Demo Click
    modalLink.onclick = (e) => {
        // Assign view-transition-name dynamically to the modal for a smooth exit
        document.querySelector('.modal-content').style.viewTransitionName = 'hero-card';
    };

    // Show
    document.getElementById('detailModal').classList.add('open');
}

// Close Logic
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('detailModal').classList.remove('open');
    document.body.classList.remove('modal-open');
});
document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.id === 'detailModal') {
        document.getElementById('detailModal').classList.remove('open');
        document.body.classList.remove('modal-open');
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

function shouldBlockClick() {
    return wasDragging;
}

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

/**
 * Mobile Category Navigation
 * Renders horizontal scroll links for categories on mobile
 */
function renderMobileNav() {
    const container = document.getElementById('mobileCategoryNav');
    if (!container) return;

    container.innerHTML = '';

    PORTAL_DATA.categories.forEach((cat, index) => {
        const btn = document.createElement('div');
        btn.className = 'mobile-cat-link';
        if (index === 0) btn.classList.add('active'); // Default active
        btn.textContent = cat.name;
        btn.dataset.id = cat.id;

        btn.addEventListener('click', () => {
            Haptics.tap();
            // In All Categories view, scroll to section
            const section = document.getElementById(`section-${cat.id}`);
            if (section) {
                // Determine the scrollable container. 
                // Based on layout fix, it's .gallery-content.scrollable-y
                const scroller = document.querySelector('.gallery-content.scrollable-y');

                if (scroller) {
                    // Manual scroll calculation to avoid jumping and ensure correct offset
                    // Nav height is approx 50px, adding buffer
                    const navHeight = 60;
                    // Calculate target position relative to the scroller
                    // We simply subtract the navHeight so the section starts below the sticky nav
                    const targetTop = section.offsetTop - navHeight;

                    scroller.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback to window scroll if not locked
                    const offset = 120;
                    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }

            // Update Active State UI
            document.querySelectorAll('.mobile-cat-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });

        container.appendChild(btn);
    });
}

/**
 * Dynamic Meta (SEO) Update
 * Updates Document Title and Meta Tags based on Category
 */
function updateDynamicMeta(categoryData) {
    const siteName = 'HP Portal';
    let title = 'Home Templates Gallery';
    let description = '高品質なホームページテンプレートを一覧表示。プレビューと詳細を確認できます。';

    if (categoryData) {
        title = `${categoryData.name} Template Gallery`;
        description = categoryData.description;
    } else {
        title = 'All Templates Gallery';
    }

    // Update Document Title
    document.title = `${title} - ${siteName}`;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update OG Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${title} - ${siteName}`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
}

