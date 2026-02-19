/**
 * Blur Text Animation
 * Fades characters in from a blurred state.
 */
export function BlurText(selector, options = {}) {
    const defaults = {
        delay: 50,
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        baseDelay: 0
    };
    const settings = { ...defaults, ...options };

    let elements;
    if (typeof selector === 'string') {
        elements = document.querySelectorAll(selector);
    } else if (selector instanceof Element) {
        elements = [selector];
    } else if (selector instanceof NodeList || Array.isArray(selector)) {
        elements = selector;
    } else {
        return;
    }

    elements.forEach(el => {
        el.style.overflow = 'hidden';
        el.style.wordBreak = 'keep-all';

        const originalNodes = Array.from(el.childNodes).map(node => node.cloneNode(true));
        el.innerHTML = '';

        let globalCharIndex = 0;

        function processNode(node, parent) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const parts = text.split(/(\s+)/);

                parts.forEach(part => {
                    if (!part) return;
                    if (part.match(/^\s+$/)) {
                        [...part].forEach(char => {
                            if (char === '\n') return;
                            const span = document.createElement('span');
                            span.innerText = char;
                            span.style.display = 'inline-block';
                            span.style.opacity = '0';
                            span.style.filter = 'blur(10px)';
                            span.style.transform = 'translateY(20px)';
                            span.style.transition = `all ${settings.duration}ms ${settings.easing}`;
                            span.style.transitionDelay = `${settings.baseDelay + globalCharIndex * settings.delay}ms`;
                            span.style.width = '0.25em';
                            parent.appendChild(span);
                            globalCharIndex++;
                        });
                    } else {
                        const wordWrapper = document.createElement('span');
                        wordWrapper.style.display = 'inline-block';
                        wordWrapper.style.whiteSpace = 'nowrap';
                        [...part].forEach(char => {
                            const span = document.createElement('span');
                            span.innerText = char;
                            span.style.display = 'inline-block';
                            span.style.opacity = '0';
                            span.style.filter = 'blur(10px)';
                            span.style.transform = 'translateY(20px)';
                            span.style.transition = `all ${settings.duration}ms ${settings.easing}`;
                            span.style.transitionDelay = `${settings.baseDelay + globalCharIndex * settings.delay}ms`;
                            wordWrapper.appendChild(span);
                            globalCharIndex++;
                        });
                        parent.appendChild(wordWrapper);
                    }
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                if (tagName === 'br' || tagName === 'wbr') {
                    parent.appendChild(node.cloneNode(true));
                } else {
                    const newContainer = node.cloneNode(false);
                    parent.appendChild(newContainer);
                    Array.from(node.childNodes).forEach(child => processNode(child, newContainer));
                }
            }
        }

        originalNodes.forEach(node => processNode(node, el));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.filter = 'blur(0px)';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(el);
    });
}
