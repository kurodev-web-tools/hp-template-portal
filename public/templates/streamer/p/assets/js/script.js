document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
        document.body.classList.add('is-booting');
        window.setTimeout(() => document.body.classList.remove('is-booting'), 900);
    }

    const commandLinks = document.querySelectorAll('.top-command a, .command-item');
    commandLinks.forEach((link) => {
        link.addEventListener('click', () => {
            commandLinks.forEach((item) => item.classList.remove('is-current', 'active'));
            link.classList.add(link.classList.contains('command-item') ? 'active' : 'is-current');
        });
    });
});
