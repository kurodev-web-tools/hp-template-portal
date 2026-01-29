document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu (Command Prompt)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const terminalOutput = document.querySelector('.terminal-output');
    const menuSource = document.querySelector('.menu-source');

    let isTyping = false;

    // Typewriter function
    async function typeWriter(text, element, delay = 30) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function runSequence() {
        if (isTyping) return;
        isTyping = true;
        terminalOutput.innerHTML = ''; // Clear previous output

        const items = menuSource.querySelectorAll('li');

        // Initial boot sequence
        const bootText = document.createElement('div');
        bootText.className = 'terminal-line';
        terminalOutput.appendChild(bootText);
        await typeWriter('INITIALIZING MENU SYSTEM...', bootText, 20);
        await new Promise(resolve => setTimeout(resolve, 300));

        bootText.innerHTML += '<br>LOADING MODULES... OK';
        await new Promise(resolve => setTimeout(resolve, 300));

        // Menu items
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const line = document.createElement('div');
            line.className = 'terminal-line';
            terminalOutput.appendChild(line);

            await typeWriter(`> [${i + 1}] `, line, 10);

            const link = document.createElement('a');
            link.href = item.dataset.href;
            link.textContent = ''; // Start empty
            line.appendChild(link);

            await typeWriter(item.textContent, link, 50);

            // Add click listener to close menu
            link.addEventListener('click', () => {
                closeMenu();
            });

            await new Promise(resolve => setTimeout(resolve, 200));
        }
        isTyping = false;
    }

    function closeMenu() {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.querySelector('.material-icons').textContent = 'memory';
        document.body.style.overflow = '';
        isTyping = false;
        terminalOutput.innerHTML = '';
    }

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');

            if (isActive) {
                icon.textContent = 'close';
                document.body.style.overflow = 'hidden';
                runSequence();
            } else {
                icon.textContent = 'memory';
                document.body.style.overflow = '';
                isTyping = false;
                // Output clears on next open or via closeMenu if needed immediately
            }
        });
    }


    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'memory';
        });
    });

    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.logic-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
});
