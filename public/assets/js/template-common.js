/* =========================================
   HP Portal - Common Template Script
   ========================================= 
   This script is included in ALL templates.
   It handles:
   1. The "Back to Portal" navigation button.
   2. Mobile menu toggle functionality.
   3. Common utility functions (optional).
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    clearHashOnLoad();
    injectPortalNav();
    if (!document.body.classList.contains('custom-menu-only')) {
        initMobileMenu();
    }
    initHaptics();
    initStatusEngine();
});

function initHaptics() {
    // Simple Haptics
    window.Haptics = {
        tap: () => {
            if (navigator.vibrate) navigator.vibrate(5);
        }
    };

    // Attach to all interactive elements
    document.querySelectorAll('a, button, input[type="submit"], input[type="button"]').forEach(el => {
        el.addEventListener('click', () => {
            if (window.Haptics) window.Haptics.tap();
        });
    });
}

// Prevent auto-scroll to anchor on page load/refresh
function clearHashOnLoad() {
    if (window.location.hash) {
        // Scroll to top first
        window.scrollTo(0, 0);
        // Remove the hash without triggering scroll
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
}

function injectPortalNav() {
    // Create the navigation container
    const nav = document.createElement('a');
    nav.href = '../../../list.html?category=business';
    nav.className = 'portal-nav-back';
    nav.innerHTML = `
        <span class="material-icons">arrow_back</span>
        <span class="nav-text">PORTAL</span>
    `;

    // Style injection - Portal nav only + minimal mobile menu structure
    const style = document.createElement('style');
    style.textContent = `
        /* Portal Back Button */
        .portal-nav-back {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 10002;
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            padding: 10px 16px;
            border-radius: 30px;
            color: white;
            text-decoration: none;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        html { scroll-behavior: smooth; }
        .portal-nav-back:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: translateY(2px);
            border-color: rgba(255, 255, 255, 0.6);
        }
        .portal-nav-back .material-icons {
            font-size: 1.2rem;
        }
        @media (max-width: 768px) {
            .portal-nav-back {
                top: 15px;
                left: 15px;
                padding: 8px 14px;
            }
            .portal-nav-back .nav-text {
                display: none;
            }
        }
        
        /* Mobile Menu - Minimal Functional Styles Only */
        /* Visual styling should be done in each template's style.css */
        .mobile-menu-toggle {
            display: none;
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 10001;
            width: 44px;
            height: 44px;
            cursor: pointer;
            border: none;
            background: transparent;
            padding: 0;
        }
        .mobile-menu-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .mobile-menu-backdrop.active {
            opacity: 1;
            visibility: visible;
        }
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(nav);
}

function initMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;

    const nav = header.querySelector('nav');
    if (!nav) return;

    // Create hamburger button
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'メニューを開く');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';

    document.body.appendChild(toggle);
    document.body.appendChild(backdrop);

    // Toggle function
    function toggleMenu() {
        const isOpen = toggle.classList.toggle('active');
        nav.classList.toggle('mobile-open');
        backdrop.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');

        // Prevent body scroll when menu open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        toggle.classList.remove('active');
        nav.classList.remove('mobile-open');
        backdrop.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * AI-Ready Status Engine
 * Handles live/offline status synchronization via URL parameters or manual control.
 */
function initStatusEngine() {
    const updateFromParams = () => {
        const params = new URLSearchParams(window.location.search);
        // Supports ?live=true, ?status=live, or ?stream_status=live
        const isLive = params.get('live') === 'true' ||
            params.get('status') === 'live' ||
            params.get('stream_status') === 'live';

        document.body.dataset.streamStatus = isLive ? 'live' : 'offline';

        // Set channel URL if provided in params
        const channelUrl = params.get('channel_url');
        if (channelUrl) {
            document.body.dataset.channelUrl = channelUrl;
        }
    };

    // Initial check
    updateFromParams();

    // Global click handler for live indicators/buttons
    document.addEventListener('click', (e) => {
        // Elements with [data-action="open-channel"] will trigger the link
        const target = e.target.closest('[data-action="open-channel"]');
        if (target && document.body.dataset.streamStatus === 'live') {
            const url = document.body.dataset.channelUrl;
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                console.warn('[StatusEngine] Channel URL is not set.');
            }
        }
    });

    // Export to global scope for manual/AI control
    window.StreamerPortal = {
        setStatus: (status) => {
            document.body.dataset.streamStatus = status;
            console.log(`[StatusEngine] Status updated to: ${status}`);
        },
        setChannelUrl: (url) => {
            document.body.dataset.channelUrl = url;
            console.log(`[StatusEngine] Channel URL set to: ${url}`);
        },
        getStatus: () => document.body.dataset.streamStatus,
        getChannelUrl: () => document.body.dataset.channelUrl
    };

    // Auto-Fetch Logic (Standalone Mode)
    const apiKey = document.body.dataset.apiKey;
    const channelId = document.body.dataset.channelId;

    if (apiKey && channelId) {
        console.log('[StatusEngine] API Key detected. Checking YouTube status...');
        checkYouTubeLiveStatus(apiKey, channelId);
    } else {
        console.log(`[StatusEngine] Initialized in Passive Mode. Status: ${document.body.dataset.streamStatus}`);
    }
}

/**
 * Fetches the live status from YouTube Data API.
 * Costs ~3 quota units.
 */
async function checkYouTubeLiveStatus(apiKey, channelId) {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            // Live stream found!
            console.log('[StatusEngine] LIVE STREAM DETECTED!');
            document.body.dataset.streamStatus = 'live';
            
            // Optionally update the channel URL to the specific video
            const videoId = data.items[0].id.videoId;
            if (videoId) {
                const liveUrl = `https://www.youtube.com/watch?v=${videoId}`;
                document.body.dataset.channelUrl = liveUrl;
            }
        } else {
            console.log('[StatusEngine] Channel is offline.');
            document.body.dataset.streamStatus = 'offline';
        }

    } catch (error) {
        console.warn('[StatusEngine] Failed to check status:', error);
        // Fallback to default (offline) or whatever is manually set
    }
}
