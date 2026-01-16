/* =========================================
   HP Portal - Common Template Script
   ========================================= 
   This script is included in ALL templates.
   It handles:
   1. The "Back to Portal" navigation button.
   2. Common utility functions (optional).
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    injectPortalNav();
});

function injectPortalNav() {
    // Create the navigation container
    const nav = document.createElement('a');
    nav.href = '../../../list.html?category=business'; // Default fallback, logic can improve
    nav.className = 'portal-nav-back';
    nav.innerHTML = `
        <span class="material-icons">arrow_back</span>
        <span class="nav-text">PORTAL</span>
    `;

    // Dynamic Link Logic: Try to return to the specific category if known, else root
    // Since we don't track history across domains easily without session storage, 
    // a simple relative link is safest. 
    // ../../../index.html goes to Top. 
    // ../../../list.html goes to List.

    // Style injection (to avoid needing a separate common.css file just for this)
    const style = document.createElement('style');
    style.textContent = `
        .portal-nav-back {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
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
        /* Mobile adjustment */
        @media (max-width: 768px) {
            .portal-nav-back {
                top: 15px;
                left: 15px;
                padding: 8px 14px;
            }
            .portal-nav-back .nav-text {
                display: none; /* Icon only on mobile to save space */
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(nav);
}
