const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const businessDir = path.join(rootDir, 'public', 'templates', 'business');

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(rootDir, relativePath), content);
  console.log(`Updated: ${relativePath.replace(/\\/g, '/')}`);
}

function updateBoilerplate() {
  const relativePath = 'public/templates/business/boilerplate.html';
  let content = read(relativePath);

  if (!content.includes('document.addEventListener(\'DOMContentLoaded\'')) {
    const snippet = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const toggle = document.querySelector('.{{ID}}-mobile-toggle');
            const menu = document.querySelector('.{{ID}}-mobile-menu');
            const backdrop = document.querySelector('.{{ID}}-menu-backdrop');
            const links = document.querySelectorAll('.{{ID}}-mobile-menu a[href]');

            const closeMenu = () => {
                if (!toggle || !menu || !backdrop) return;
                toggle.classList.remove('active');
                menu.classList.remove('active');
                backdrop.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            };

            const toggleMenu = () => {
                if (!toggle || !menu || !backdrop) return;
                const isOpen = !menu.classList.contains('active');
                toggle.classList.toggle('active', isOpen);
                menu.classList.toggle('active', isOpen);
                backdrop.classList.toggle('active', isOpen);
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                document.body.style.overflow = isOpen ? 'hidden' : '';
            };

            toggle?.addEventListener('click', toggleMenu);
            backdrop?.addEventListener('click', closeMenu);
            links.forEach((link) => link.addEventListener('click', closeMenu));
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') closeMenu();
            });
        });
    </script>`;
    content = content.replace('    <script src="assets/js/script.js" defer></script>', `${snippet}\n    <script src="assets/js/script.js" defer></script>`);
    write(relativePath, content);
  }
}

function updateTemplateDHtml(relativePath) {
  let content = read(relativePath);
  let changed = false;

  if (!content.includes('class="mobile-menu-backdrop')) {
    content = content.replace('</header>', `        <button class="mobile-menu-toggle relative z-[10005] flex h-11 w-11 flex-col items-center justify-center gap-1 md:hidden" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="dynamic-mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </header>

    <div class="mobile-menu-backdrop fixed inset-0 z-[10003] hidden md:hidden"></div>`);
    changed = true;
  }

  content = content.replace('<nav class="hidden md:flex items-center gap-8">', '<nav id="dynamic-mobile-menu" class="hidden md:flex items-center gap-8">');
  if (content.includes('id="dynamic-mobile-menu"')) changed = true;

  if (changed) write(relativePath, content);
}

function updateTemplateDScript() {
  const relativePath = 'public/templates/business/d/assets/js/script.js';
  let content = read(relativePath);

  if (!content.includes('initMobileMenu')) {
    content = content.replace(
      "document.addEventListener('DOMContentLoaded', () => {\n    initParallax();\n    initScrollSpy();\n});",
      "document.addEventListener('DOMContentLoaded', () => {\n    initParallax();\n    initScrollSpy();\n    initMobileMenu();\n});"
    );
    content += `

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('header nav');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    const links = document.querySelectorAll('header nav a[href]');

    const closeMenu = () => {
        if (!toggle || !menu || !backdrop) return;
        toggle.classList.remove('active');
        menu.classList.remove('mobile-open');
        backdrop.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!toggle || !menu || !backdrop) return;
        const isOpen = !menu.classList.contains('mobile-open');
        toggle.classList.toggle('active', isOpen);
        menu.classList.toggle('mobile-open', isOpen);
        backdrop.classList.toggle('hidden', !isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('mobile-menu-active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    links.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
    });
}`;
    write(relativePath, content);
  }
}

function updateTemplateNHtml(relativePath) {
  let content = read(relativePath);
  let changed = false;

  if (!content.includes('class="mobile-menu-toggle')) {
    content = content.replace(/(\s+<nav class="hidden items-center gap-3 md:flex">[\s\S]*?<\/nav>)/, `$1

                <button class="mobile-menu-toggle flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-background-dark/85 md:hidden" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="neon-mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>`);
    changed = true;
  }

  if (!content.includes('class="mobile-menu-backdrop')) {
    content = content.replace('</header>', `</header>

        <div class="mobile-menu-backdrop fixed inset-0 z-40 hidden bg-black/60 md:hidden"></div>`);
    changed = true;
  }

  if (!content.includes('id="neon-mobile-menu"')) {
    content = content.replace('</header>', `        <nav id="neon-mobile-menu" class="hidden items-center gap-6 md:hidden" aria-label="Mobile">
            <a href="index.html" class="nav-link"><span class="nav-link-label">Home</span></a>
            <a href="about.html" class="nav-link"><span class="nav-link-label">About</span></a>
            <a href="service.html" class="nav-link"><span class="nav-link-label">Service</span></a>
            <a href="contact.html" class="nav-link"><span class="nav-link-label">Contact</span></a>
        </nav>
    </header>`);
    changed = true;
  }

  if (changed) write(relativePath, content);
}

function updateTemplateNScript() {
  const relativePath = 'public/templates/business/n/assets/js/script.js';
  let content = read(relativePath);

  if (!content.includes('const menuToggle = document.querySelector(\'.mobile-menu-toggle\')')) {
    content = content.replace(
      "document.addEventListener('DOMContentLoaded', () => {\n    const currentPage = window.location.pathname.split('/').pop() || 'index.html';",
      "document.addEventListener('DOMContentLoaded', () => {\n    const currentPage = window.location.pathname.split('/').pop() || 'index.html';\n    const menuToggle = document.querySelector('.mobile-menu-toggle');\n    const menu = document.querySelector('#neon-mobile-menu');\n    const backdrop = document.querySelector('.mobile-menu-backdrop');\n    const menuLinks = document.querySelectorAll('#neon-mobile-menu a[href]');\n"
    );
    content = content.replace(
      "    document.querySelectorAll('nav a[href]').forEach((link) => {",
      "    document.querySelectorAll('nav a[href]').forEach((link) => {"
    );
    content = content.replace(
      "    if (window.PremiumEffects) {",
      `    const closeMenu = () => {
        if (!menuToggle || !menu || !backdrop) return;
        menuToggle.classList.remove('active');
        menu.classList.remove('mobile-open');
        backdrop.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menuToggle || !menu || !backdrop) return;
        const isOpen = !menu.classList.contains('mobile-open');
        menuToggle.classList.toggle('active', isOpen);
        menu.classList.toggle('mobile-open', isOpen);
        backdrop.classList.toggle('hidden', !isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
    });

    if (window.PremiumEffects) {`
    );
    write(relativePath, content);
  }
}

function updateTemplatePScript() {
  const relativePath = 'public/templates/business/p/assets/js/script.js';
  let content = read(relativePath);

  if (!content.includes("document.addEventListener('keydown'")) {
    content = `document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.removeItem('pop-spark-theme');

    const menu = document.querySelector('.pop-mobile-menu');
    const toggle = document.querySelector('.pop-mobile-toggle');
    const menuLinks = document.querySelectorAll('.pop-mobile-menu a[href]');

    const closeMenu = () => {
        if (!menu || !toggle) return;
        menu.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menu || !toggle) return;
        const isOpen = !menu.classList.contains('is-active');
        menu.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    window.toggleMenu = toggleMenu;
    toggle?.addEventListener('click', toggleMenu);
    menu?.addEventListener('click', (event) => {
        if (event.target === menu) closeMenu();
    });
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.brutalist-border, .reveal-pop').forEach((el) => {
        observer.observe(el);
    });
});`;
    write(relativePath, content);
  }
}

function updateHubNz() {
  const relativePath = 'public/templates/business/hub-nz.html';
  let content = read(relativePath);
  if (content.includes('hub-mobile-toggle')) return;

  content = content.replace(
    '<body class="fade-in">',
    `<body class="fade-in">
    <button class="hub-mobile-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="hub-mobile-menu" style="position: fixed; right: 1rem; top: 1rem; z-index: 1001; display: flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; border: 0; border-radius: 999px; background: #111; color: #fff; box-shadow: 0 10px 24px rgba(0,0,0,.22);">Menu</button>
    <div class="hub-menu-backdrop" style="position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 999; display: none;"></div>
    <nav id="hub-mobile-menu" style="position: fixed; top: 4.5rem; left: 1rem; right: 1rem; z-index: 1000; display: none; background: #fff; border-radius: 16px; padding: 1rem; box-shadow: 0 20px 40px rgba(0,0,0,.18);">
        <a href="#template-n" style="display:block; padding:.75rem 0; font-weight:700;">Template N</a>
        <a href="#template-o" style="display:block; padding:.75rem 0; font-weight:700;">Template O</a>
        <a href="#template-p" style="display:block; padding:.75rem 0; font-weight:700;">Template P</a>
        <a href="#template-z" style="display:block; padding:.75rem 0; font-weight:700;">Template Z</a>
    </nav>`
  );

  content = content.replace('<!-- N: Neon -->', '<!-- N: Neon -->\n        <div id="template-n"></div>');
  content = content.replace('<!-- O: Organic -->', '<!-- O: Organic -->\n        <div id="template-o"></div>');
  content = content.replace('<!-- P: Pop -->', '<!-- P: Pop -->\n        <div id="template-p"></div>');
  content = content.replace('<!-- Z: Zenith -->', '<!-- Z: Zenith -->\n        <div id="template-z"></div>');

  content = content.replace(
    '</main>\n</body>',
    `</main>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const toggle = document.querySelector('.hub-mobile-toggle');
            const menu = document.querySelector('#hub-mobile-menu');
            const backdrop = document.querySelector('.hub-menu-backdrop');
            const links = document.querySelectorAll('#hub-mobile-menu a[href]');
            const closeMenu = () => {
                if (!toggle || !menu || !backdrop) return;
                menu.style.display = 'none';
                backdrop.style.display = 'none';
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            };
            const toggleMenu = () => {
                if (!toggle || !menu || !backdrop) return;
                const isOpen = menu.style.display !== 'block';
                menu.style.display = isOpen ? 'block' : 'none';
                backdrop.style.display = isOpen ? 'block' : 'none';
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                document.body.style.overflow = isOpen ? 'hidden' : '';
            };
            toggle?.addEventListener('click', toggleMenu);
            backdrop?.addEventListener('click', closeMenu);
            links.forEach((link) => link.addEventListener('click', closeMenu));
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') closeMenu();
            });
        });
    </script>
</body>`
  );
  write(relativePath, content);
}

function main() {
  updateBoilerplate();

  ['about.html', 'contact.html', 'index.html', 'service.html'].forEach((file) => {
    updateTemplateDHtml(path.join('public', 'templates', 'business', 'd', file));
    updateTemplateNHtml(path.join('public', 'templates', 'business', 'n', file));
  });

  updateTemplateDScript();
  updateTemplateNScript();
  updateTemplatePScript();
  updateHubNz();
}

main();
