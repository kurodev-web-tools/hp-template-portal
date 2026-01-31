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

    // Initialize Circuit Trace Engine
    const circuitTrace = new CircuitTraceEngine();
});

// ============================================
// CIRCUIT TRACE ENGINE - Technology Circuit Animation
// ============================================

class CircuitTraceEngine {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.logicCards = document.querySelectorAll('.logic-card');
        this.networkMap = document.querySelector('.network-map');
        this.circuitGrid = document.querySelector('.circuit-grid');
        this.nodes = document.querySelectorAll('.node');
        
        this.init();
    }

    init() {
        // Setup logic cards with power pulse
        this.logicCards.forEach(card => {
            card.classList.add('power-active');
        });

        // Setup network map connections
        if (this.networkMap && this.nodes.length >= 2) {
            this.setupNetworkConnections();
        }

        if (this.isMobile) {
            this.setupMobileDataWave();
        } else {
            this.setupPCHoverEffects();
        }
    }

    setupPCHoverEffects() {
        // PC: Hover emits signal packets
        this.logicCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.emitSignalPackets(card, e);
                this.pulseCircuitGrid();
            });
        });

        // Network node hover effects
        this.nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                this.activateConnections();
            });
        });
    }

    setupMobileDataWave() {
        // Mobile: Periodic data wave scan
        const dataWave = document.createElement('div');
        dataWave.className = 'data-wave';
        document.body.appendChild(dataWave);

        // Trigger scan every 4 seconds
        setInterval(() => {
            dataWave.classList.remove('scanning');
            void dataWave.offsetWidth; // Force reflow
            dataWave.classList.add('scanning');
            
            // Activate elements when wave passes
            setTimeout(() => {
                this.logicCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('neon-glow');
                        setTimeout(() => {
                            card.classList.remove('neon-glow');
                        }, 500);
                    }, index * 100);
                });
            }, 1500);
        }, 4000);
    }

    setupNetworkConnections() {
        // Create connection lines between nodes
        const nodePositions = Array.from(this.nodes).map(node => {
            const rect = node.getBoundingClientRect();
            const mapRect = this.networkMap.getBoundingClientRect();
            return {
                x: rect.left - mapRect.left + rect.width / 2,
                y: rect.top - mapRect.top + rect.height / 2
            };
        });

        // Create lines between nodes
        for (let i = 0; i < nodePositions.length - 1; i++) {
            for (let j = i + 1; j < nodePositions.length; j++) {
                this.createConnectionLine(nodePositions[i], nodePositions[j]);
            }
        }
    }

    createConnectionLine(pos1, pos2) {
        const line = document.createElement('div');
        line.className = 'node-connector';
        
        const length = Math.sqrt(
            Math.pow(pos2.x - pos1.x, 2) + 
            Math.pow(pos2.y - pos1.y, 2)
        );
        const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
        
        line.style.width = length + 'px';
        line.style.left = pos1.x + 'px';
        line.style.top = pos1.y + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 50%';
        
        this.networkMap.appendChild(line);
    }

    emitSignalPackets(card, event) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Emit 4-8 packets in different directions
        const packetCount = 4 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < packetCount; i++) {
            const packet = document.createElement('div');
            packet.className = 'signal-packet';
            packet.style.left = centerX + 'px';
            packet.style.top = centerY + 'px';
            document.body.appendChild(packet);

            // Calculate random direction
            const angle = (i / packetCount) * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            const destX = centerX + Math.cos(angle) * distance;
            const destY = centerY + Math.sin(angle) * distance;

            // Animate packet
            requestAnimationFrame(() => {
                packet.style.transition = 'all 0.8s ease-out';
                packet.style.opacity = '1';
                packet.style.left = destX + 'px';
                packet.style.top = destY + 'px';
            });

            // Remove after animation
            setTimeout(() => {
                packet.remove();
            }, 800);
        }
    }

    pulseCircuitGrid() {
        if (this.circuitGrid) {
            this.circuitGrid.classList.remove('pulse-active');
            void this.circuitGrid.offsetWidth;
            this.circuitGrid.classList.add('pulse-active');
            
            setTimeout(() => {
                this.circuitGrid.classList.remove('pulse-active');
            }, 500);
        }
    }

    activateConnections() {
        const connectors = document.querySelectorAll('.node-connector');
        connectors.forEach((connector, index) => {
            setTimeout(() => {
                connector.classList.add('communicating');
                setTimeout(() => {
                    connector.classList.remove('communicating');
                }, 2000);
            }, index * 100);
        });
    }
}
