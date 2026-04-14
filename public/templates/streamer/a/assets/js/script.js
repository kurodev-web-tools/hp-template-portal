document.addEventListener('DOMContentLoaded', () => {
    const THREE = window.THREE;
    const body = document.body;
    const root = document.documentElement;
    const menu = document.querySelector('.mobile-menu');
    const toggle = document.querySelector('.mobile-toggle');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];
    const shell = document.querySelector('.depth-shell');
    const viewport = document.querySelector('.depth-viewport');
    const track = document.querySelector('.depth-track');
    const sections = [...document.querySelectorAll('.depth-section')];
    const navLinks = [...document.querySelectorAll('[data-nav-link]')];
    const revealTargets = document.querySelectorAll('.reveal');
    const depthValue = document.querySelector('[data-depth-value]');
    const depthStatus = document.querySelector('.depth-status');
    const stageLayers = [...document.querySelectorAll('.stage-layer')];
    const stageStates = [...document.querySelectorAll('[data-stage-state]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopMedia = window.matchMedia('(min-width: 861px)');
    const pointer = { x: 0, y: 0 };
    const desktopTransitionStart = 0.68;
    let menuIsOpen = false;
    let lastDesktopFloatIndex = null;
    let lastDesktopDirection = 1;
    let lastDesktopVelocity = 0;

    const sectionProfiles = {
        'depth-hero': { beam: 0.22, sideGlow: 0.09, abyssGlow: 0.04, fog: 0.032, nearBoost: 0.08, column: 0.06, camera: 0, status: 'ENTRY SEA' },
        world: { beam: 0.15, sideGlow: 0.15, abyssGlow: 0.08, fog: 0.041, nearBoost: 0.12, column: 0.1, camera: 0.5, status: 'ORIGIN LOG' },
        profile: { beam: 0.09, sideGlow: 0.2, abyssGlow: 0.12, fog: 0.05, nearBoost: 0.18, column: 0.14, camera: 1, status: 'PROFILE SEA' },
        schedule: { beam: 0.06, sideGlow: 0.25, abyssGlow: 0.18, fog: 0.058, nearBoost: 0.26, column: 0.18, camera: 1.6, status: 'DIVE LOG' },
        archives: { beam: 0.04, sideGlow: 0.29, abyssGlow: 0.22, fog: 0.066, nearBoost: 0.32, column: 0.21, camera: 2.2, status: 'ARCHIVE DEPTH' },
        community: { beam: 0.03, sideGlow: 0.32, abyssGlow: 0.24, fog: 0.07, nearBoost: 0.36, column: 0.24, camera: 2.8, status: 'COMMUNITY SEA' }
    };

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function mix(start, end, amount) {
        return start + (end - start) * amount;
    }

    function easeOutCubic(value) {
        return 1 - Math.pow(1 - value, 3);
    }

    function smoothstep(min, max, value) {
        const t = clamp((value - min) / Math.max(max - min, 0.0001), 0, 1);
        return t * t * (3 - 2 * t);
    }

    class BubbleTransition {
        constructor(selector) {
            this.canvas = document.querySelector(selector);
            this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
            this.active = false;
            this.frame = 0;
            this.startTime = 0;
            this.duration = 720;
            this.coverAt = 0.62;
            this.direction = 1;
            this.covered = false;
            this.width = 0;
            this.height = 0;
            this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            this.particles = [];
            this.onCovered = null;
            this.onComplete = null;
            this.resize = this.resize.bind(this);
            this.animate = this.animate.bind(this);

            if (!this.canvas || !this.ctx) return;

            window.addEventListener('resize', this.resize, { passive: true });
            this.resize();
        }

        isEnabled() {
            return !!this.ctx && !reduceMotion && window.innerWidth <= 860;
        }

        resize() {
            if (!this.canvas || !this.ctx) return;
            this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            this.width = window.innerWidth || 1;
            this.height = window.innerHeight || 1;
            this.canvas.width = Math.round(this.width * this.dpr);
            this.canvas.height = Math.round(this.height * this.dpr);
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        }

        stop(clear = true) {
            if (this.frame) {
                window.cancelAnimationFrame(this.frame);
                this.frame = 0;
            }
            this.active = false;
            this.covered = false;
            this.particles = [];
            this.canvas?.classList.remove('is-active');
            this.canvas?.classList.remove('is-settled');
            if (clear && this.ctx) {
                this.ctx.clearRect(0, 0, this.width, this.height);
            }
        }

        start(direction, options = {}) {
            if (!this.isEnabled()) {
                options.onCovered?.();
                options.onComplete?.();
                return;
            }

            this.stop(false);
            this.direction = direction >= 0 ? 1 : -1;
            this.duration = options.duration || 4000;
            this.coverAt = options.coverAt || (this.direction > 0 ? 0.9 : 0.88);
            this.onCovered = options.onCovered || null;
            this.onComplete = options.onComplete || null;
            this.startTime = performance.now();
            this.active = true;
            this.covered = false;
            this.particles = this.createParticles();
            this.canvas?.classList.add('is-active');
            this.frame = window.requestAnimationFrame(this.animate);
        }

        createParticles() {
            const count = clamp(Math.round(Math.max(this.width, this.height) / 7), 48, 90);
            const bubbles = [];
            const edgeStart = this.direction > 0 ? this.height + 40 : -40;
            const edgeEnd = this.direction > 0 ? -this.height * 0.22 : this.height + this.height * 0.22;
            const lift = -this.height * 0.03;

            for (let index = 0; index < count; index += 1) {
                const sizeSeed = Math.random();
                bubbles.push({
                    x: Math.random() * this.width,
                    startY: edgeStart + (Math.random() - 0.5) * this.height * 0.3 + lift,
                    endY: edgeEnd + (Math.random() - 0.5) * this.height * 0.16 + lift,
                    radius: 9 + Math.pow(sizeSeed, 0.52) * Math.min(this.width, this.height) * 0.085,
                    drift: (Math.random() - 0.5) * this.width * 0.035,
                    sway: 0.4 + Math.random() * 0.8,
                    offset: Math.random() * 0.42,
                    span: 0.44 + Math.random() * 0.34,
                    alpha: 0.2 + Math.random() * 0.24,
                    pulse: Math.random() * Math.PI * 2,
                    highlight: 0.2 + Math.random() * 0.34
                });
            }

            return bubbles;
        }

        drawBubble(x, y, radius, alpha, highlight) {
            if (!this.ctx) return;
            const ctx = this.ctx;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(126, 232, 255, ${alpha * 0.11})`;
            ctx.fill();
            ctx.lineWidth = Math.max(1.2, radius * 0.08);
            ctx.strokeStyle = `rgba(224, 250, 255, ${alpha})`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x - radius * 0.22, y - radius * 0.2, radius * 0.24, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${highlight})`;
            ctx.fill();
        }

        animate(now) {
            if (!this.active || !this.ctx) return;
            const elapsed = now - this.startTime;
            const progress = clamp(elapsed / this.duration, 0, 1);
            const eased = easeOutCubic(progress);
            const coverReady = eased >= this.coverAt;

            if (!this.covered && coverReady) {
                this.covered = true;
                this.onCovered?.();
            }

            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = `rgba(1, 7, 16, ${0.16 + eased * 0.64})`;
            ctx.fillRect(0, 0, this.width, this.height);

            const wash = ctx.createLinearGradient(0, this.direction > 0 ? this.height : 0, 0, this.direction > 0 ? 0 : this.height);
            wash.addColorStop(0, `rgba(8, 28, 48, ${0.18 + eased * 0.18})`);
            wash.addColorStop(0.55, `rgba(13, 50, 78, ${0.24 + eased * 0.2})`);
            wash.addColorStop(1, `rgba(2, 8, 20, ${0.42 + eased * 0.22})`);
            ctx.fillStyle = wash;
            ctx.fillRect(0, 0, this.width, this.height);

            for (let index = 0; index < this.particles.length; index += 1) {
                const bubble = this.particles[index];
                const local = clamp((eased - bubble.offset) / Math.max(bubble.span, 0.0001), 0, 1);
                const reveal = smoothstep(0, 0.18, local);
                const retreat = 1 - smoothstep(0.7, 1, local);
                const mixProgress = easeOutCubic(local);
                const x = bubble.x + bubble.drift * mixProgress + Math.sin(progress * Math.PI * 2 + bubble.pulse) * bubble.radius * bubble.sway * 0.12;
                const y = mix(bubble.startY, bubble.endY, mixProgress);
                const alpha = bubble.alpha * reveal * retreat * (0.78 + eased * 0.22);
                if (alpha <= 0.01) continue;
                this.drawBubble(x, y, bubble.radius, alpha, bubble.highlight * alpha);
            }

            if (progress < 1) {
                this.frame = window.requestAnimationFrame(this.animate);
                return;
            }

            const onComplete = this.onComplete;
            this.stop(true);
            onComplete?.();
        }
    }

    const menuBubbleTransition = new BubbleTransition('#menu-bubble-transition');

    function setMenuState(isOpen) {
        if (!menu || !toggle) return;
        menuIsOpen = isOpen;
        body.classList.toggle('menu-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        const icon = toggle.querySelector('.material-icons');
        if (icon) icon.textContent = isOpen ? 'close' : 'waves';

        if (isOpen) {
            menu.classList.remove('is-open');
            menuBubbleTransition.start(1, {
                coverAt: 0.84,
                duration: 4000,
                onCovered: () => {
                    menuBubbleTransition.canvas?.classList.add('is-settled');
                    if (!menu.hidden) return;
                    menu.hidden = false;
                    window.requestAnimationFrame(() => {
                        menu.classList.add('is-open');
                    });
                },
                onComplete: () => {
                    menuBubbleTransition.canvas?.classList.remove('is-settled');
                    if (menu.hidden) {
                        menu.hidden = false;
                        window.requestAnimationFrame(() => {
                            menu.classList.add('is-open');
                        });
                    }
                }
            });
            return;
        }

        menu.classList.remove('is-open');
        menuBubbleTransition.start(-1, {
            coverAt: 0.84,
            duration: 4000,
            onCovered: () => {
                menuBubbleTransition.canvas?.classList.add('is-settled');
                menu.hidden = true;
                body.classList.remove('menu-open');
            },
            onComplete: () => {
                menuBubbleTransition.canvas?.classList.remove('is-settled');
                body.classList.remove('menu-open');
            }
        });
    }

    if (toggle && menu) {
        toggle.addEventListener('click', () => setMenuState(!menuIsOpen));
        menu.addEventListener('click', (event) => {
            if (event.target === menu) setMenuState(false);
        });
        menuLinks.forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.16 });

    revealTargets.forEach((target) => revealObserver.observe(target));

    function getSectionProfile(index) {
        const id = sections[index]?.id || 'depth-hero';
        return sectionProfiles[id] || sectionProfiles['depth-hero'];
    }

    function mixProfile(index, blend) {
        const current = getSectionProfile(index);
        const next = getSectionProfile(Math.min(index + 1, sections.length - 1));
        const amount = clamp(blend * 1.45, 0, 1);

        return {
            beam: mix(current.beam, next.beam, amount),
            sideGlow: mix(current.sideGlow, next.sideGlow, amount),
            abyssGlow: mix(current.abyssGlow, next.abyssGlow, amount),
            fog: mix(current.fog, next.fog, amount),
            nearBoost: mix(current.nearBoost, next.nearBoost, amount),
            column: mix(current.column, next.column, amount),
            camera: mix(current.camera, next.camera, amount)
        };
    }

    function setCharacterState(state) {
        stageStates.forEach((element) => {
            element.classList.toggle('is-active', element.dataset.stageState === state);
        });
    }

    function getCharacterStateBySection(index) {
        if (index <= 1) return 'close';
        if (index <= 3) return 'mid';
        return 'wide';
    }

    function setActiveSection(id) {
        body.dataset.currentSection = id;
        const sectionIndex = Math.max(sections.findIndex((section) => section.id === id), 0);
        const profile = getSectionProfile(sectionIndex);

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', isActive);
        });

        if (depthValue) {
            const depth = -8 - sectionIndex * 72;
            depthValue.textContent = `${String(depth).padStart(4, '0')} m`;
        }

        if (depthStatus) {
            depthStatus.textContent = profile.status;
        }

        setCharacterState(getCharacterStateBySection(sectionIndex));
    }

    function setDesktopSectionStyles(metrics) {
        const floatIndex = metrics.floatIndex;
        const baseIndex = Math.floor(floatIndex);
        const nextIndex = Math.min(baseIndex + 1, sections.length - 1);
        const blend = clamp(floatIndex - baseIndex, 0, 1);
        const transitionBlend = clamp((blend - desktopTransitionStart) / (1 - desktopTransitionStart), 0, 1);
        const direction = metrics.scrollDirection || 1;
        const transitionActive = nextIndex !== baseIndex && transitionBlend > 0.001;
        const reverseTransitionBlend = clamp((1 - blend) / (1 - desktopTransitionStart), 0, 1);

        sections.forEach((section, index) => {
            const isCurrent = direction >= 0 ? index === baseIndex : index === nextIndex && blend > desktopTransitionStart;
            const isActive = index === metrics.sectionIndex;
            let opacity = 0;
            let scale = 0.992;
            let shiftY = 12;
            let shiftZ = -140;
            let blur = 1.8;

            if (isCurrent) {
                const fadeAmount = direction >= 0 ? transitionBlend : reverseTransitionBlend;
                const fadeDistance = direction >= 0 ? transitionBlend : reverseTransitionBlend;
                const shiftDirection = direction >= 0 ? 1 : -1;
                opacity = transitionActive ? Math.max(1 - fadeAmount * 1.08, 0) : 1;
                scale = 1 - fadeDistance * 0.026;
                shiftY = fadeDistance * 34 * shiftDirection;
                shiftZ = -fadeDistance * 132;
                blur = fadeDistance * 4.8;
            } else if (isActive) {
                opacity = 1;
                scale = 1;
                shiftY = 0;
                shiftZ = 0;
                blur = 0;
            }

            section.style.setProperty('--section-opacity', opacity.toFixed(3));
            section.style.setProperty('--section-shift-y', `${shiftY.toFixed(1)}px`);
            section.style.setProperty('--section-scale', scale.toFixed(3));
            section.style.setProperty('--section-blur', `${blur.toFixed(2)}px`);
            section.style.setProperty('--section-z', `${shiftZ.toFixed(1)}px`);
            section.style.zIndex = isActive ? '110' : isCurrent ? '100' : '0';
            section.classList.toggle('is-active', isActive);
            section.classList.toggle('is-visible', isCurrent || isActive);
            section.classList.toggle('is-transitioning', isCurrent && !isActive && transitionActive);
        });
    }

    function resetSectionStyles() {
        sections.forEach((section) => {
            section.style.removeProperty('--section-opacity');
            section.style.removeProperty('--section-shift-y');
            section.style.removeProperty('--section-scale');
            section.style.removeProperty('--section-blur');
            section.style.removeProperty('--section-z');
            section.style.removeProperty('z-index');
            section.classList.remove('is-visible');
            section.classList.remove('is-transitioning');
        });
    }

    function getScrollState() {
        const desktop = desktopMedia.matches;
        if (desktop && shell && viewport && track) {
            const viewportHeight = window.innerHeight || 1;
            const shellRect = shell.getBoundingClientRect();
            const total = Math.max(track.offsetHeight - viewportHeight, 1);
            const localScroll = clamp(-shellRect.top, 0, total);
            const progress = clamp(localScroll / total, 0, 1);
            const floatIndex = progress * Math.max(sections.length - 1, 1);
            const baseIndex = Math.floor(floatIndex);
            const blend = floatIndex - baseIndex;
            const transitionBlend = clamp((blend - desktopTransitionStart) / (1 - desktopTransitionStart), 0, 1);
            const delta = lastDesktopFloatIndex === null ? 0 : floatIndex - lastDesktopFloatIndex;
            if (Math.abs(delta) > 0.0005) {
                lastDesktopDirection = delta > 0 ? 1 : -1;
            }
            lastDesktopVelocity = clamp(Math.abs(delta) * 8.5, 0, 1);
            lastDesktopFloatIndex = floatIndex;
            const activeIndex = lastDesktopDirection >= 0
                ? baseIndex
                : blend > desktopTransitionStart
                    ? Math.min(baseIndex + 1, sections.length - 1)
                    : baseIndex;

            return {
                desktop,
                progress,
                floatIndex,
                sectionIndex: clamp(activeIndex, 0, sections.length - 1),
                sectionBlend: clamp(blend, 0, 1),
                heroStickProgress: clamp(progress * 2.2, 0, 1),
                scrollDirection: lastDesktopDirection,
                scrollVelocity: lastDesktopVelocity,
                pointerX: pointer.x,
                pointerY: pointer.y
            };
        }

        const viewportHeight = window.innerHeight || 1;
        const maxScroll = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);
        const progress = clamp(window.scrollY / maxScroll, 0, 1);
        let activeIndex = 0;
        let bestRatio = -1;
        let blend = 0;
        let heroStickProgress = 0;

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            const heroTravel = Math.max(heroRect.height - viewportHeight * 0.72, 1);
            heroStickProgress = clamp((-heroRect.top) / heroTravel, 0, 1);
        }

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const visibleTop = Math.max(rect.top, 0);
            const visibleBottom = Math.min(rect.bottom, viewportHeight);
            const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
            const ratio = visibleHeight / Math.max(Math.min(rect.height, viewportHeight), 1);

            if (ratio > bestRatio) {
                bestRatio = ratio;
                activeIndex = index;
                const centerDistance = clamp((viewportHeight * 0.5 - (rect.top + rect.height * 0.5)) / viewportHeight, -1, 1);
                blend = Math.abs(centerDistance);
            }
        });

        return {
            desktop,
            progress,
            floatIndex: activeIndex,
            sectionIndex: activeIndex,
            sectionBlend: clamp(blend, 0, 1),
            heroStickProgress,
            scrollDirection: 1,
            scrollVelocity: 0,
            pointerX: pointer.x,
            pointerY: pointer.y
        };
    }

    function applyDepthVariables(metrics) {
        const { progress, sectionIndex, sectionBlend, heroStickProgress = 0, pointerX = 0, pointerY = 0, floatIndex = 0, desktop = false } = metrics;
        const stageState = getCharacterStateBySection(sectionIndex);
        const sectionDepth = sectionIndex / Math.max(sections.length - 1, 1);
        const profile = mixProfile(sectionIndex, sectionBlend);
        const heroTransition = desktop ? clamp(floatIndex, 0, 1) : heroStickProgress;
        const heroTransitionSoft = clamp((heroTransition - 0.02) / 0.96, 0, 1);
        const heroEase = heroTransitionSoft * heroTransitionSoft * (3 - 2 * heroTransitionSoft);
        const stageScaleBase = stageState === 'close' ? 1.03 : stageState === 'mid' ? 0.96 : 0.88;
        const stageScale = stageScaleBase - sectionBlend * 0.04 - heroStickProgress * 0.05;
        const stageLift = mix(0, -76, progress) - heroStickProgress * 92;
        const stageDrift = mix(0, 34, progress) + pointerX * 12 + heroStickProgress * 12;
        const orbitScale = mix(1, 1.18, progress);
        const shellGlow = mix(0.22, 0.62, progress);
        const shellPulse = 0.95 + Math.sin(progress * Math.PI * 8) * 0.04;
        const blur = mix(0, 2.2, Math.max(progress - 0.16, 0)) + heroStickProgress * 0.45;
        const panelLift = mix(0, -18, sectionDepth);
        const panelGlow = mix(0.18, 0.48, sectionDepth);
        const gradientShift = mix(0, 28, progress);
        const gradientOpacity = mix(1, 0.74, progress);
        const fogAlpha = mix(0.18, 0.08, progress);
        const noiseDrift = mix(0, 120, progress);

        body.dataset.depthBand = stageState;
        root.style.setProperty('--depth-glow-strength', `${(0.3 + sectionIndex * 0.09).toFixed(3)}`);
        root.style.setProperty('--stage-scale', stageScale.toFixed(3));
        root.style.setProperty('--stage-shift-y', `${stageLift.toFixed(1)}px`);
        root.style.setProperty('--stage-shift-x', `${stageDrift.toFixed(1)}px`);
        root.style.setProperty('--stage-rotate', `${mix(0, -5.5, progress) + pointerY * 2.4}deg`);
        root.style.setProperty('--stage-blur', `${blur.toFixed(2)}px`);
        root.style.setProperty('--orbit-scale', `${orbitScale.toFixed(3)}`);
        root.style.setProperty('--shell-glow', shellGlow.toFixed(3));
        root.style.setProperty('--shell-pulse', shellPulse.toFixed(3));
        root.style.setProperty('--core-close-scale', mix(1.18, 1.03, heroEase).toFixed(3));
        root.style.setProperty('--core-mid-scale', mix(1.01, 0.95, heroEase).toFixed(3));
        root.style.setProperty('--core-wide-scale', mix(0.93, 0.87, heroEase).toFixed(3));
        root.style.setProperty('--core-close-glow', mix(1.18, 0.94, heroEase).toFixed(3));
        root.style.setProperty('--core-mid-glow', mix(1.04, 0.9, heroEase).toFixed(3));
        root.style.setProperty('--core-wide-glow', mix(0.96, 0.82, heroEase).toFixed(3));
        root.style.setProperty('--core-shell-visibility', mix(0.74, 1.02, heroEase).toFixed(3));
        root.style.setProperty('--core-shell-softness', mix(0.88, 1.08, heroEase).toFixed(3));
        root.style.setProperty('--core-rim-opacity', mix(0.56, 0.82, heroEase).toFixed(3));
        root.style.setProperty('--core-base-width', `${mix(34, 48, heroEase).toFixed(1)}%`);
        root.style.setProperty('--core-base-opacity', mix(0.64, 0.92, heroEase).toFixed(3));
        root.style.setProperty('--core-column-opacity', mix(0.92, 0.72, heroEase).toFixed(3));
        root.style.setProperty('--panel-lift', `${panelLift.toFixed(1)}px`);
        root.style.setProperty('--panel-glow', panelGlow.toFixed(3));
        root.style.setProperty('--gradient-shift', `${gradientShift.toFixed(1)}%`);
        root.style.setProperty('--gradient-opacity', `${gradientOpacity.toFixed(3)}`);
        root.style.setProperty('--fog-alpha', `${fogAlpha.toFixed(3)}`);
        root.style.setProperty('--beam-alpha', `${profile.beam.toFixed(3)}`);
        root.style.setProperty('--side-glow-alpha', `${profile.sideGlow.toFixed(3)}`);
        root.style.setProperty('--abyss-glow-alpha', `${profile.abyssGlow.toFixed(3)}`);
        root.style.setProperty('--depth-density', `${profile.nearBoost.toFixed(3)}`);
        root.style.setProperty('--column-alpha', `${profile.column.toFixed(3)}`);
        root.style.setProperty('--noise-drift', `${noiseDrift.toFixed(1)}px`);
        root.style.setProperty('--hero-stick-progress', `${heroStickProgress.toFixed(3)}`);
        root.style.setProperty('--hero-copy-opacity', `${mix(1, 0.14, heroEase).toFixed(3)}`);
        root.style.setProperty('--hero-copy-shift', `${mix(0, -18, heroEase).toFixed(1)}px`);
        root.style.setProperty('--hero-copy-blur', `${mix(0, 1.2, heroEase).toFixed(2)}px`);
        root.style.setProperty('--hero-stage-opacity', `${mix(1, 0.88, heroEase).toFixed(3)}`);

        const mobileMotion = desktop ? 0 : clamp(0.28 + progress * 0.34 + sectionBlend * 0.24 + heroStickProgress * 0.16, 0.26, 1);
        const mobileShift = desktop ? 0 : mix(0, 10, clamp(progress * 0.74 + sectionBlend * 0.42, 0, 1));
        const mobileCoreGlow = desktop ? 0 : mix(0.34, 0.72, clamp(heroStickProgress * 0.78 + sectionBlend * 0.18, 0, 1));

        root.style.setProperty('--mobile-motion', mobileMotion.toFixed(3));
        root.style.setProperty('--mobile-section-shift', `${mobileShift.toFixed(1)}px`);
        root.style.setProperty('--mobile-core-glow', mobileCoreGlow.toFixed(3));
    }

    function updateStageParallax(metrics) {
        const state = metrics || getScrollState();
        applyDepthVariables(state);
        stageLayers.forEach((layer) => {
            const speed = Number(layer.dataset.speed || '0');
            const offsetY = mix(-20, 28, state.progress) * speed * 3.4 + pointer.y * speed * 36;
            const offsetX = pointer.x * speed * 58;
            layer.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
        });
    }

    let depthScene = null;
    let ticking = false;

    function scheduleSync() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            syncScene();
            ticking = false;
        });
    }

    function syncScene() {
        const state = getScrollState();
        body.classList.toggle('fixed-camera-mode', state.desktop);

        if (state.desktop) {
            setDesktopSectionStyles(state);
        } else {
            resetSectionStyles();
        }

        updateStageParallax(state);
        setActiveSection(sections[state.sectionIndex]?.id || sections[0]?.id || 'depth-hero');
        depthScene?.updateByScroll(state);
    }

    function onScroll() {
        scheduleSync();
    }

    class DepthScene {
        constructor(selector) {
            if (!THREE) return;

            this.canvas = document.querySelector(selector);
            if (!this.canvas) {
                this.renderer = null;
                return;
            }

            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2(0x031422, 0.038);
            this.camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
            this.camera.position.set(0, 0, 16);

            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true
            });
            this.renderer.setPixelRatio(this.getTargetPixelRatio());
            this.renderer.setClearColor(0x000000, 0);

            this.clock = new THREE.Clock();
            this.pointer = { x: 0, y: 0 };
            this.depthProgress = 0;
            this.sectionIndex = 0;
            this.sectionBlend = 0;
              this.sectionProfile = getSectionProfile(0);
              this.scrollDirection = 1;
              this.scrollVelocity = 0;
              this.lastFrameTime = performance.now();
            this.lastBubbleSeedAt = 0;
            this.lastRenderAt = 0;
            this.renderIntervalMs = 16;
            this.sceneActivity = 1;

            this.layers = [];
            this.particleSprite = this.createSoftParticleTexture();
            this.bubbleSprite = this.createBubbleTexture();
            this.beamSprite = this.createBeamTexture();
            this.glowSprite = this.createScatterGlowTexture();
            this.createParticleLayer({ key: 'far', count: 248, spreadX: 36, spreadY: 52, spreadZ: 48, size: 0.12, opacity: 0.14, hue: 0.56, saturation: 0.3, lightness: 0.58 });
            this.createParticleLayer({ key: 'mid', count: 196, spreadX: 28, spreadY: 36, spreadZ: 26, size: 0.16, opacity: 0.2, hue: 0.53, saturation: 0.36, lightness: 0.68 });
            this.createParticleLayer({ key: 'near', count: 82, spreadX: 20, spreadY: 28, spreadZ: 12, size: 0.22, opacity: 0.24, hue: 0.5, saturation: 0.42, lightness: 0.76 });
            this.createBubbleLayer();
            this.createLightColumns();
            this.createAmbientGlow();
            this.resize();

            this.onPointerMove = this.onPointerMove.bind(this);
            this.resize = this.resize.bind(this);
            this.animate = this.animate.bind(this);

            window.addEventListener('pointermove', this.onPointerMove, { passive: true });
            window.addEventListener('resize', this.resize);

            this.updateByScroll(getScrollState());
            this.animate();
        }

        createSoftParticleTexture() {
            const size = 128;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d');

            if (!context) return null;

            context.clearRect(0, 0, size, size);

            const centerX = size * 0.5;
            const centerY = size * 0.5;
            const haze = context.createRadialGradient(
                centerX - size * 0.05,
                centerY - size * 0.03,
                size * 0.02,
                centerX,
                centerY,
                size * 0.46
            );
            haze.addColorStop(0, 'rgba(248, 254, 255, 1)');
            haze.addColorStop(0.24, 'rgba(220, 242, 252, 0.66)');
            haze.addColorStop(0.64, 'rgba(154, 210, 236, 0.28)');
            haze.addColorStop(1, 'rgba(120, 184, 214, 0)');
            context.fillStyle = haze;
            context.beginPath();
            context.ellipse(centerX, centerY, size * 0.36, size * 0.29, -0.34, 0, Math.PI * 2);
            context.fill();

            const dust = [
                { x: 0.38, y: 0.32, r: 0.08, a: 0.48 },
                { x: 0.56, y: 0.48, r: 0.06, a: 0.32 },
                { x: 0.46, y: 0.6, r: 0.05, a: 0.24 }
            ];

            dust.forEach((spec) => {
                const bloom = context.createRadialGradient(
                    size * spec.x,
                    size * spec.y,
                    size * 0.01,
                    size * spec.x,
                    size * spec.y,
                    size * spec.r
                );
                bloom.addColorStop(0, `rgba(246, 252, 255, ${spec.a})`);
                bloom.addColorStop(0.55, `rgba(198, 228, 242, ${spec.a * 0.42})`);
                bloom.addColorStop(1, 'rgba(198, 228, 242, 0)');
                context.fillStyle = bloom;
                context.beginPath();
                context.arc(size * spec.x, size * spec.y, size * spec.r, 0, Math.PI * 2);
                context.fill();
            });

            context.save();
            context.globalAlpha = 0.32;
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.beginPath();
            context.ellipse(centerX + size * 0.04, centerY - size * 0.02, size * 0.16, size * 0.11, 0.28, 0, Math.PI * 2);
            context.fill();
            context.restore();

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        createBubbleTexture() {
            const size = 192;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d');

            if (!context) return null;

            context.clearRect(0, 0, size, size);

            const centerX = size * 0.5;
            const centerY = size * 0.5;
            const radius = size * 0.31;

            const bodyGlow = context.createRadialGradient(
                centerX - size * 0.06,
                centerY - size * 0.08,
                size * 0.02,
                centerX,
                centerY,
                radius
            );
            bodyGlow.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
            bodyGlow.addColorStop(0.45, 'rgba(172, 226, 255, 0.08)');
            bodyGlow.addColorStop(1, 'rgba(172, 226, 255, 0)');
            context.fillStyle = bodyGlow;
            context.beginPath();
            context.arc(centerX, centerY, radius * 0.98, 0, Math.PI * 2);
            context.fill();

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, Math.PI * 2);
            context.strokeStyle = 'rgba(232, 248, 255, 0.72)';
            context.lineWidth = size * 0.028;
            context.shadowColor = 'rgba(128, 214, 255, 0.14)';
            context.shadowBlur = size * 0.04;
            context.stroke();

            context.shadowBlur = 0;
            const innerRim = context.createRadialGradient(
                centerX + size * 0.08,
                centerY + size * 0.1,
                size * 0.06,
                centerX,
                centerY,
                radius
            );
            innerRim.addColorStop(0, 'rgba(255, 255, 255, 0)');
            innerRim.addColorStop(0.64, 'rgba(255, 255, 255, 0)');
            innerRim.addColorStop(0.84, 'rgba(180, 226, 255, 0.12)');
            innerRim.addColorStop(1, 'rgba(255, 255, 255, 0.28)');
            context.strokeStyle = innerRim;
            context.beginPath();
            context.arc(centerX, centerY, radius * 0.96, 0, Math.PI * 2);
            context.lineWidth = size * 0.018;
            context.stroke();

            const highlight = context.createRadialGradient(
                centerX - size * 0.11,
                centerY - size * 0.12,
                size * 0.006,
                centerX - size * 0.11,
                centerY - size * 0.12,
                size * 0.14
            );
            highlight.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
            highlight.addColorStop(0.35, 'rgba(236, 248, 255, 0.38)');
            highlight.addColorStop(1, 'rgba(236, 248, 255, 0)');
            context.fillStyle = highlight;
            context.beginPath();
            context.arc(centerX - size * 0.11, centerY - size * 0.12, size * 0.12, 0, Math.PI * 2);
            context.fill();

            const crescent = context.createLinearGradient(
                centerX - radius,
                centerY - radius,
                centerX + radius,
                centerY + radius
            );
            crescent.addColorStop(0, 'rgba(255, 255, 255, 0)');
            crescent.addColorStop(0.35, 'rgba(255, 255, 255, 0)');
            crescent.addColorStop(0.78, 'rgba(186, 232, 255, 0.12)');
            crescent.addColorStop(1, 'rgba(255, 255, 255, 0.22)');
            context.strokeStyle = crescent;
            context.lineWidth = size * 0.016;
            context.beginPath();
            context.arc(centerX, centerY, radius * 0.82, Math.PI * 0.16, Math.PI * 0.96);
            context.stroke();

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        createBeamTexture() {
            const width = 160;
            const height = 460;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');

            if (!context) return null;

            const vertical = context.createLinearGradient(width * 0.5, 0, width * 0.5, height);
            vertical.addColorStop(0, 'rgba(236, 250, 255, 0)');
            vertical.addColorStop(0.05, 'rgba(236, 250, 255, 0.86)');
            vertical.addColorStop(0.18, 'rgba(198, 240, 255, 0.54)');
            vertical.addColorStop(0.44, 'rgba(126, 214, 255, 0.24)');
            vertical.addColorStop(0.74, 'rgba(84, 176, 255, 0.09)');
            vertical.addColorStop(1, 'rgba(84, 176, 255, 0)');

            const spread = context.createRadialGradient(width * 0.5, height * 0.18, width * 0.08, width * 0.5, height * 0.44, width * 0.56);
            spread.addColorStop(0, 'rgba(220, 246, 255, 0.28)');
            spread.addColorStop(0.24, 'rgba(170, 232, 255, 0.16)');
            spread.addColorStop(0.52, 'rgba(96, 198, 255, 0.08)');
            spread.addColorStop(1, 'rgba(96, 198, 255, 0)');

            context.save();
            context.filter = 'blur(4px)';
            context.fillStyle = vertical;
            context.fillRect(width * 0.24, 0, width * 0.52, height);
            context.restore();

            context.save();
            context.filter = 'blur(10px)';
            context.fillStyle = spread;
            context.fillRect(0, 0, width, height);
            context.restore();

            context.globalCompositeOperation = 'screen';
            context.fillStyle = 'rgba(255, 255, 255, 0.08)';
            context.fillRect(width * 0.42, height * 0.04, width * 0.16, height * 0.78);
            context.globalCompositeOperation = 'source-over';

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        createScatterGlowTexture() {
            const size = 256;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d');

            if (!context) return null;

            const base = context.createRadialGradient(size * 0.5, size * 0.5, size * 0.04, size * 0.5, size * 0.5, size * 0.5);
            base.addColorStop(0, 'rgba(242, 251, 255, 0.36)');
            base.addColorStop(0.2, 'rgba(162, 232, 255, 0.28)');
            base.addColorStop(0.52, 'rgba(76, 170, 255, 0.12)');
            base.addColorStop(1, 'rgba(76, 170, 255, 0)');
            context.fillStyle = base;
            context.beginPath();
            context.arc(size * 0.5, size * 0.5, size * 0.5, 0, Math.PI * 2);
            context.fill();

            const bloom = context.createRadialGradient(size * 0.38, size * 0.32, size * 0.01, size * 0.38, size * 0.32, size * 0.22);
            bloom.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
            bloom.addColorStop(0.42, 'rgba(208, 246, 255, 0.18)');
            bloom.addColorStop(1, 'rgba(208, 246, 255, 0)');
            context.fillStyle = bloom;
            context.beginPath();
            context.arc(size * 0.38, size * 0.32, size * 0.22, 0, Math.PI * 2);
            context.fill();

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        createParticleLayer(config) {
            const positions = new Float32Array(config.count * 3);
            const colors = new Float32Array(config.count * 3);
            const color = new THREE.Color();

            for (let i = 0; i < config.count; i += 1) {
                const index = i * 3;
                positions[index] = (Math.random() - 0.5) * config.spreadX;
                positions[index + 1] = (Math.random() - 0.5) * config.spreadY;
                positions[index + 2] = (Math.random() - 0.5) * config.spreadZ;
                color.setHSL(config.hue + (Math.random() - 0.5) * 0.06, config.saturation, config.lightness + (Math.random() - 0.5) * 0.18);
                colors[index] = color.r;
                colors[index + 1] = color.g;
                colors[index + 2] = color.b;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: config.size,
                transparent: true,
                opacity: config.opacity,
                vertexColors: true,
                map: this.particleSprite,
                alphaMap: this.particleSprite,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                depthTest: false
            });

            const points = new THREE.Points(geometry, material);
            this.scene.add(points);
            this.layers.push({ config, material, points });
        }

            createBubbleLayer() {
              const count = desktopMedia.matches ? 154 : 92;
              const positions = new Float32Array(count * 3);
              const colors = new Float32Array(count * 3);
              const sizes = new Float32Array(count);
              const alpha = new Float32Array(count);
              const age = new Float32Array(count);
              const life = new Float32Array(count);
              const startSpeed = new Float32Array(count);
              const endSpeed = new Float32Array(count);
              const direction = new Float32Array(count);
              const active = new Float32Array(count);
              const color = new THREE.Color();

              for (let i = 0; i < count; i += 1) {
                  const index = i * 3;
                  positions[index] = 0;
                  positions[index + 1] = -999;
                  positions[index + 2] = -4.4;
                  sizes[i] = 12 + Math.pow(Math.random(), 0.64) * 18;
                  alpha[i] = 0;
                  age[i] = 0;
                  life[i] = 0;
                  startSpeed[i] = 0;
                  endSpeed[i] = 0;
                  direction[i] = 1;
                  active[i] = 0;
                  color.setHSL(0.53 + Math.random() * 0.04, 0.38, 0.82 + Math.random() * 0.1);
                  colors[index] = color.r;
                  colors[index + 1] = color.g;
                  colors[index + 2] = color.b;
              }

              const geometry = new THREE.BufferGeometry();
              geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
              geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
              geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
              geometry.setAttribute('alpha', new THREE.BufferAttribute(alpha, 1));

              const material = new THREE.ShaderMaterial({
                  uniforms: {
                      pointTexture: { value: this.bubbleSprite }
                  },
                  vertexShader: `
                      attribute float size;
                      attribute float alpha;
                      varying vec3 vColor;
                      varying float vAlpha;

                      void main() {
                          vColor = color;
                          vAlpha = alpha;
                          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                          gl_PointSize = size * (58.0 / max(1.0, -mvPosition.z));
                          gl_Position = projectionMatrix * mvPosition;
                      }
                  `,
                  fragmentShader: `
                      uniform sampler2D pointTexture;
                      varying vec3 vColor;
                      varying float vAlpha;

                      void main() {
                          vec4 tex = texture2D(pointTexture, gl_PointCoord);
                          vec2 centered = gl_PointCoord - vec2(0.5);
                          float dist = length(centered);
                          float rim = smoothstep(0.42, 0.18, abs(dist - 0.29));
                          float core = smoothstep(0.31, 0.0, 0.31 - dist);
                          float highlight = smoothstep(0.18, 0.0, length(gl_PointCoord - vec2(0.34, 0.3)));
                          float alpha = tex.a * vAlpha * (0.24 + rim * 0.9 + core * 0.16 + highlight * 0.22);
                          vec3 color = mix(vColor * 0.84, vec3(0.97, 0.995, 1.0), highlight * 0.42 + rim * 0.24);
                          gl_FragColor = vec4(color, alpha);
                      }
                  `,
                  transparent: true,
                  vertexColors: true,
                  blending: THREE.NormalBlending,
                  depthWrite: false,
                  depthTest: false
              });

              const points = new THREE.Points(geometry, material);
              this.scene.add(points);
              this.bubbles = {
                  geometry,
                  material,
                  points,
                  size: geometry.attributes.size,
                  alpha,
                  age,
                  life,
                  startSpeed,
                  endSpeed,
                  direction,
                  active,
                  baseCount: count
              };
          }

        createLightColumns() {
            this.columns = [];
            const plane = new THREE.PlaneGeometry(5.8, 34, 1, 1);
            const beamConfigs = [
                { x: -3.1, y: 3.6, z: -12.2, width: 0.32, height: 1.48, rotation: -0.2, color: 0x8fdfff, opacity: 0.054, sway: 0.1 },
                { x: -0.95, y: 3.9, z: -11.2, width: 0.22, height: 1.62, rotation: -0.07, color: 0xcdf6ff, opacity: 0.066, sway: 0.08 },
                { x: 1.08, y: 4.15, z: -10.8, width: 0.38, height: 1.74, rotation: 0.03, color: 0xf7ffff, opacity: 0.074, sway: 0.07 },
                { x: 3.12, y: 3.54, z: -11.7, width: 0.28, height: 1.54, rotation: 0.16, color: 0xa9ebff, opacity: 0.058, sway: 0.1 }
            ];

            for (let i = 0; i < beamConfigs.length; i += 1) {
                const beam = beamConfigs[i];
                const material = new THREE.MeshBasicMaterial({
                    color: beam.color,
                    transparent: true,
                    opacity: beam.opacity,
                    map: this.beamSprite,
                    alphaMap: this.beamSprite,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                    depthTest: false
                });
                const mesh = new THREE.Mesh(plane, material);
                mesh.position.set(beam.x, beam.y, beam.z);
                mesh.rotation.z = beam.rotation;
                mesh.scale.set(beam.width, beam.height, 1);
                this.scene.add(mesh);
                this.columns.push({ mesh, beam });
            }
        }

        createAmbientGlow() {
            const glowPlane = new THREE.PlaneGeometry(10, 10, 1, 1);
            const largeMaterial = new THREE.MeshBasicMaterial({
                color: 0x59d7ff,
                transparent: true,
                opacity: 0.12,
                map: this.glowSprite,
                alphaMap: this.glowSprite,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                depthTest: false
            });
            this.glowPrimary = new THREE.Mesh(glowPlane, largeMaterial);
            this.glowPrimary.position.set(0.7, 4.6, -11.8);
            this.glowPrimary.scale.set(2.4, 1.16, 1);
            this.scene.add(this.glowPrimary);

            const smallMaterial = new THREE.MeshBasicMaterial({
                color: 0x98f1dc,
                transparent: true,
                opacity: 0.08,
                map: this.glowSprite,
                alphaMap: this.glowSprite,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                depthTest: false
            });
            this.glowSecondary = new THREE.Mesh(glowPlane, smallMaterial);
            this.glowSecondary.position.set(-2.3, 2.5, -10.2);
            this.glowSecondary.scale.set(1.18, 0.82, 1);
            this.scene.add(this.glowSecondary);
        }

        onPointerMove(event) {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
        }

        getTargetPixelRatio() {
            const dpr = window.devicePixelRatio || 1;

            if (!desktopMedia.matches) {
                return Math.min(dpr, 1.15);
            }

            if (window.innerWidth >= 1600) {
                return Math.min(dpr, 1.3);
            }

            return Math.min(dpr, 1.45);
        }

        resize() {
            if (!this.renderer) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setPixelRatio(this.getTargetPixelRatio());
            this.renderer.setSize(width, height, false);
        }

          updateByScroll(metrics) {
              this.depthProgress = metrics.progress;
              this.sectionIndex = metrics.sectionIndex;
              this.sectionBlend = metrics.sectionBlend;
              this.sectionProfile = mixProfile(metrics.sectionIndex, metrics.sectionBlend);
              this.scrollDirection = metrics.scrollDirection || 1;
              this.scrollVelocity = metrics.scrollVelocity || 0;
              this.sceneActivity = clamp(1 - Math.max(this.sectionIndex - 1, 0) * 0.22, 0.34, 1);
              this.renderIntervalMs = !desktopMedia.matches
                  ? 26
                  : this.sectionIndex <= 1
                      ? 16
                      : this.sectionIndex <= 3
                          ? 22
                          : 30;

              if (this.scrollVelocity > 0.02) {
                  const now = performance.now();
                  if (this.scrollVelocity > 0.04 && now - this.lastBubbleSeedAt > 90) {
                      this.emitBubbles(this.scrollDirection >= 0 ? 1 : -1, this.scrollVelocity);
                      this.lastBubbleSeedAt = now;
                  }
              }
          }

          emitBubbles(direction, intensity) {
              if (!this.bubbles) return;

              const { geometry, baseCount, active } = this.bubbles;
              const positionArray = geometry.attributes.position.array;
              const emitCount = Math.min(baseCount, 28 + Math.round(clamp(intensity, 0, 1) * 48));
              let emitted = 0;

              for (let i = 0; i < baseCount && emitted < emitCount; i += 1) {
                  if (active[i] > 0.5) continue;
                  this.initializeBubble(positionArray, i, direction, intensity);
                  emitted += 1;
              }

              for (let i = 0; i < baseCount && emitted < emitCount; i += 1) {
                  this.initializeBubble(positionArray, i, direction, intensity);
                  emitted += 1;
              }

              geometry.attributes.position.needsUpdate = true;
              geometry.attributes.alpha.needsUpdate = true;
              geometry.attributes.size.needsUpdate = true;
          }

          getBubbleSpawnRange() {
              const viewportWidth = window.innerWidth || 1440;
              const aspect = viewportWidth / Math.max(window.innerHeight || 1, 1);
              return clamp(11.8 * aspect, 13.2, 23.5);
          }

          initializeBubble(positionArray, bubbleIndex, direction, intensity = 0.5) {
              if (!this.bubbles) return;

              const index = bubbleIndex * 3;
              const spawnRange = this.getBubbleSpawnRange();
              const strength = clamp(intensity, 0, 1);
              positionArray[index] = (Math.random() - 0.5) * spawnRange;
              positionArray[index + 1] = direction >= 0
                  ? -14.6 - Math.random() * 6.4
                  : 14.6 + Math.random() * 6.4;
              positionArray[index + 2] = -2.8 - Math.random() * 4.8;
              this.bubbles.size.array[bubbleIndex] = 10 + Math.pow(Math.random(), 0.62) * 20;
              this.bubbles.alpha[bubbleIndex] = 0.28 + Math.random() * 0.26;
              this.bubbles.age[bubbleIndex] = 0;
              this.bubbles.life[bubbleIndex] = 1.8 + Math.random() * 1.2;
              this.bubbles.startSpeed[bubbleIndex] = 7.2 + strength * 6.4 + Math.random() * 2.6;
              this.bubbles.endSpeed[bubbleIndex] = 1.1 + Math.random() * 1.5;
              this.bubbles.direction[bubbleIndex] = direction >= 0 ? 1 : -1;
              this.bubbles.active[bubbleIndex] = 1;
          }

        animate() {
            if (!this.renderer) return;

            const now = performance.now();
            if (this.lastRenderAt > 0 && now - this.lastRenderAt < this.renderIntervalMs) {
                requestAnimationFrame(this.animate);
                return;
            }

            const frameDelta = clamp((now - this.lastFrameTime) / 1000, 0.008, 0.05);
            this.lastFrameTime = now;
            this.lastRenderAt = now;
            const elapsed = this.clock.getElapsedTime();
            const sectionDepth = this.sectionIndex / Math.max(sections.length - 1, 1);
            const focusDepth = this.depthProgress * 15;
            const profile = this.sectionProfile || getSectionProfile(this.sectionIndex);
            const sceneActivity = this.sceneActivity || 1;

                this.layers.forEach(({ config, material, points }, index) => {
                    const depthFactor = index === 0 ? 0.4 : index === 1 ? 1 : 1.65;
                    const profileBoost = index === 0 ? 0.02 : index === 1 ? profile.nearBoost * 0.4 : profile.nearBoost;
                    const driftPhase = elapsed * (0.028 + depthFactor * 0.012) + index * 0.9;
                    points.rotation.z = Math.sin(driftPhase) * 0.014 * depthFactor * sceneActivity;
                    points.rotation.x = (this.pointer.y * 0.012 * depthFactor + this.depthProgress * 0.16 * depthFactor) * (0.76 + sceneActivity * 0.24);
                    points.position.x = this.pointer.x * 0.42 * depthFactor + Math.sin(driftPhase) * 0.14 * depthFactor * sceneActivity;
                    points.position.y = -focusDepth * (0.08 + depthFactor * 0.18) + Math.cos(driftPhase * 0.8) * 0.1 * depthFactor * sceneActivity;
                    points.position.z = -focusDepth * (0.48 + depthFactor * 0.18);
                    material.opacity = (config.opacity + profileBoost * (index === 2 ? 0.34 : 0.18) + sectionDepth * (index === 2 ? 0.06 : 0.03)) * (0.82 + sceneActivity * 0.18);
                    material.size = config.size + profileBoost * (index === 2 ? 0.16 : 0.06);
                });

              if (this.bubbles) {
                  const { geometry, points, baseCount, age, life, startSpeed, endSpeed, direction, active, alpha } = this.bubbles;
                  const positionArray = geometry.attributes.position.array;
                  const bubbleDepth = 0.12 + sectionDepth * 0.12;
                  let activeCount = 0;
                  points.position.x = 0;
                  points.position.y = 0;
                  points.position.z = -1.35 - sectionDepth * 0.45;
                  points.rotation.z = 0;

                  for (let i = 0; i < baseCount; i += 1) {
                      if (active[i] < 0.5) {
                          alpha[i] = 0;
                          continue;
                      }

                      const index = i * 3;
                      age[i] += frameDelta;
                      const progress = clamp(age[i] / Math.max(life[i], 0.001), 0, 1);
                      const eased = 1 - Math.pow(progress, 0.62);
                      const speed = mix(endSpeed[i], startSpeed[i], eased);
                      positionArray[index + 1] += speed * frameDelta * direction[i];
                      positionArray[index + 2] += Math.sin(elapsed * 1.6 + i * 0.7) * 0.008;
                      alpha[i] = (1 - progress) * (0.42 + bubbleDepth * 0.34);

                      const boundaryTop = 15.2;
                      const boundaryBottom = -15.2;
                      if (progress >= 1 || (direction[i] >= 0 && positionArray[index + 1] > boundaryTop) || (direction[i] < 0 && positionArray[index + 1] < boundaryBottom)) {
                          active[i] = 0;
                          alpha[i] = 0;
                          positionArray[index + 1] = -999;
                      } else {
                          activeCount += 1;
                      }
                  }

                  geometry.attributes.position.needsUpdate = true;
                  geometry.attributes.alpha.needsUpdate = true;
                  geometry.attributes.size.needsUpdate = true;
                  points.visible = activeCount > 0;
              }

            const heroRayStrength = Math.max(1 - sectionDepth * 0.88, 0.08) * (0.72 + sceneActivity * 0.28);

            this.columns.forEach(({ mesh, beam }, index) => {
                const beamPhase = elapsed * 0.18 + index * 0.9;
                mesh.position.y = beam.y + Math.sin(beamPhase) * 0.16 * sceneActivity - sectionDepth * 1.2;
                mesh.position.x = beam.x + this.pointer.x * beam.sway;
                mesh.rotation.z = beam.rotation + this.pointer.x * 0.012 * sceneActivity;
                mesh.material.opacity = beam.opacity * heroRayStrength + Math.sin(beamPhase) * 0.003 * sceneActivity;
                mesh.scale.set(
                    beam.width * (1 + heroRayStrength * 0.03),
                    beam.height + heroRayStrength * 0.04,
                    1
                );
            });

            this.glowPrimary.position.x = 0.7 + this.pointer.x * 0.4;
            this.glowPrimary.position.y = 4.6 + this.pointer.y * 0.18 - sectionDepth * 1.7;
            this.glowPrimary.scale.set(2.4 - sectionDepth * 0.28, 1.16 - sectionDepth * 0.08, 1);
            this.glowPrimary.material.opacity = (0.084 * heroRayStrength + 0.01) * (0.8 + sceneActivity * 0.2);

            this.glowSecondary.position.x = -2.3 - this.pointer.x * 0.28;
            this.glowSecondary.position.y = 2.5 + this.pointer.y * 0.14 - sectionDepth * 0.8;
            this.glowSecondary.scale.set(1.18 - sectionDepth * 0.12, 0.82 - sectionDepth * 0.04, 1);
            this.glowSecondary.material.opacity = (0.046 * heroRayStrength + 0.006) * (0.78 + sceneActivity * 0.22);

            this.scene.fog.density = profile.fog + this.depthProgress * 0.01;
            this.camera.position.z = 16 - profile.camera - this.depthProgress * 1.4;
            this.camera.position.x = this.pointer.x * 0.5;
            this.camera.position.y = this.pointer.y * 0.35 - sectionDepth * 1;
            this.camera.lookAt(this.pointer.x * 1.2, -sectionDepth * 1.7, -7 - sectionDepth * 10);

            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        }
    }

    depthScene = reduceMotion ? null : new DepthScene('#depth-field');

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const id = link.getAttribute('href')?.replace('#', '');
            if (!id) return;

            if (desktopMedia.matches && shell && track) {
                event.preventDefault();
                const index = Math.max(sections.findIndex((section) => section.id === id), 0);
                const total = Math.max(track.offsetHeight - window.innerHeight, 1);
                const progress = index / Math.max(sections.length - 1, 1);
                const target = shell.offsetTop + progress * total;
                window.scrollTo({ top: target, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', syncScene);
    desktopMedia.addEventListener('change', syncScene);
    window.addEventListener('pointermove', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
        scheduleSync();
    }, { passive: true });

    syncScene();
});
