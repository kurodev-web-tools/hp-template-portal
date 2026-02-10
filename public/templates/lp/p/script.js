/**
 * Template P - Portfolio Theme JavaScript
 * Modern minimalist portfolio with Masonry grid and modal
 */

(function () {
    'use strict';

    // Project Data for Modal
    const projectsData = {
        1: {
            title: 'Lumina Brand Identity',
            category: 'Branding',
            description: 'サステナブル照明ブランド「Lumina」のトータルブランディング。ロゴ、カラーシステム、タイポグラフィ、ガイドライン策定まで包括的に担当しました。',
            image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80',
            year: '2025',
            client: '株式会社ルミナ',
            role: 'Creative Director'
        },
        2: {
            title: 'TechFlow Corporate',
            category: 'Web Design',
            description: 'TechFlow社のコーポレートサイトリニューアル。クリーンな美学とUXの向上に焦点を当て、エンゲージメントを40%向上させました。',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
            year: '2025',
            client: 'テックフロー株式会社',
            role: 'Lead Designer'
        },
        3: {
            title: 'Finance App Redesign',
            category: 'UI/UX',
            description: '資産管理アプリのUX刷新プロジェクト。複雑なワークフローを簡素化し、アクセシビリティを大幅に改善しました。',
            image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80',
            year: '2024',
            client: 'MoneyWise',
            role: 'UX Designer'
        },
        4: {
            title: 'Abstract Series 01',
            category: 'Illustration',
            description: 'テクノロジーと自然の融合を探求した、抽象的デジタルイラストレーションシリーズ。',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
            year: '2024',
            client: 'Personal Project',
            role: 'Illustrator'
        },
        5: {
            title: 'Nordic Coffee Co.',
            category: 'Branding',
            description: '北欧ミニマリズムにインスパイアされた、職人気質のコーヒーブランドのアイデンティティデザイン。',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
            year: '2024',
            client: 'Nordic Coffee',
            role: 'Brand Designer'
        },
        6: {
            title: 'Minimal Shop',
            category: 'Web Design',
            description: '厳選されたライフスタイルブランドのEコマースプラットフォーム。プロダクトフォトグラフィーを際立たせるデザイン。',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80',
            year: '2025',
            client: 'Minimal Studio',
            role: 'Web Designer'
        },
        7: {
            title: 'Analytics Dashboard',
            category: 'UI/UX',
            description: 'エンタープライズクライアント向けのデータ可視化ダッシュボード。複雑なデータを直感的に理解できるよう設計。',
            image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&q=80',
            year: '2024',
            client: 'DataCorp',
            role: 'UI Designer'
        },
        8: {
            title: 'Color Study 2024',
            category: 'Illustration',
            description: '色彩がもたらす感情的な影響を探求した、実験的なカラースタディ作品群。',
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
            year: '2024',
            client: 'Personal Project',
            role: 'Digital Artist'
        },
        9: {
            title: 'Apex Architecture',
            category: 'Branding',
            description: '革新的な建築設計事務所のブランドアイデンティティ。幾何学的かつ先進的なイメージを表現。',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80',
            year: '2025',
            client: 'Apex Architecture',
            role: 'Creative Director'
        },
        10: {
            title: 'Startup Launch',
            category: 'Web Design',
            description: 'テック系スタートアップのローンチ用ランディングページ。CVRを意識した構成とデザイン。',
            image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=80',
            year: '2025',
            client: 'LaunchPad',
            role: 'Web Designer'
        },
        11: {
            title: 'Health Tracker App',
            category: 'UI/UX',
            description: '健康・フィットネス追跡アプリのモバイルUIデザイン。ユーザーの継続率を高めるゲーミフィケーション要素を統合。',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
            year: '2025',
            client: 'FitLife',
            role: 'Product Designer'
        },
        12: {
            title: 'Geometric Forms',
            category: 'Illustration',
            description: 'フォルムと光の関係性を探求した、3D幾何学イラストレーションシリーズ。',
            image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80',
            year: '2025',
            client: 'Personal Project',
            role: '3D Artist'
        }
    };

    // ==================================================================
    // Theme Toggle
    // ==================================================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        if (!themeToggle) return;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ==================================================================
    // Mobile Menu
    // ==================================================================
    function initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileLinks = document.querySelectorAll('.mobile-nav__link');

        if (!navToggle || !mobileNav) return;

        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('is-active');
            mobileNav.classList.toggle('is-active');

            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
                mobileNav.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================================================================
    // Filter Functionality
    // ==================================================================
    function initFilter() {
        const filterBtns = document.querySelectorAll('.filter__btn');
        const masonryItems = document.querySelectorAll('.masonry__item');

        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');

                const filterValue = btn.getAttribute('data-filter');

                masonryItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('is-hidden');
                        setTimeout(() => {
                            item.style.display = 'block';
                        }, 10);
                    } else {
                        item.classList.add('is-hidden');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ==================================================================
    // Modal Functionality
    // ==================================================================
    function initModal() {
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = modal.querySelector('.modal__overlay');
        const viewButtons = document.querySelectorAll('.work-card__view');

        if (!modal || !viewButtons.length) return;

        // Open modal
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = btn.getAttribute('data-project');
                openModal(projectId);
            });
        });

        // Close modal
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                closeModal();
            }
        });

        function openModal(projectId) {
            const project = projectsData[projectId];
            if (!project) return;

            // Populate modal content
            document.getElementById('modalImage').src = project.image;
            document.getElementById('modalImage').alt = project.title;
            document.getElementById('modalCategory').textContent = project.category;
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalYear').textContent = project.year;
            document.getElementById('modalClient').textContent = project.client;
            document.getElementById('modalRole').textContent = project.role;

            // Show modal
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    }

    // ==================================================================
    // Scroll Animations
    // ==================================================================
    function initScrollAnimations() {
        const workCards = document.querySelectorAll('.work-card');

        if (!workCards.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        workCards.forEach(card => {
            observer.observe(card);
        });
    }

    // ==================================================================
    // Back to Top
    // ==================================================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');

        if (!backToTop) return;

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================================================================
    // Smooth Scroll Navigation
    // ==================================================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================================================================
    // Initialize Everything
    // ==================================================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runInit);
        } else {
            runInit();
        }
    }

    function runInit() {
        initThemeToggle();
        initMobileMenu();
        initFilter();
        initModal();
        initScrollAnimations();
        initBackToTop();
        initSmoothScroll();

        console.log('Template P (Portfolio) initialized successfully');
    }

    // Start initialization
    init();
})();
