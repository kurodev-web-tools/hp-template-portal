/**
 * Portfolio Common Scripts
 * 26テーマ共通のコア機能（軽量版）
 * 
 * 各テーマ独自のエフェクトは各フォルダの theme.js で実装
 */

// ========================================
// 1. Intersection Observer（スクロール表示）
// ========================================
const initReveal = () => {
  const elements = document.querySelectorAll('[data-reveal]');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // 子要素へのステガー効果
        const children = entry.target.querySelectorAll('[data-reveal-child]');
        children.forEach((child, i) => {
          const delay = child.dataset.stagger || (i * 100);
          setTimeout(() => child.classList.add('is-visible'), delay);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
};

// ========================================
// 2. ヘッダーのスクロール変化
// ========================================
const initHeader = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    // スクロール位置による背景変更
    if (current > 100) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    
    // 下スクロールで非表示、上スクロールで表示（オプション）
    if (header.dataset.autoHide !== 'false') {
      if (current > lastScroll && current > 500) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    }
    
    lastScroll = current;
  }, { passive: true });
};

// ========================================
// 3. スムーススクロール
// ========================================
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      
      // 固定ヘッダーの高さを考慮
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
};

// ========================================
// 4. モバイルナビトグル
// ========================================
const initMobileNav = () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-is-open', isOpen);
  });
  
  // リンククリックで閉じる（モバイル）
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-is-open');
    });
  });
};

// ========================================
// 5. 簡易パララックス（data-parallax属性）
// ========================================
const initParallax = () => {
  const elements = document.querySelectorAll('[data-parallax]');
  if (elements.length === 0) return;
  
  let ticking = false;
  
  const updateParallax = () => {
    const scrollY = window.scrollY;
    
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const offset = scrollY * speed * -1;
      el.style.transform = `translateY(${offset}px)`;
    });
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
};

// ========================================
// 6. アニメーション速度調整（prefers-reduced-motion対応）
// ========================================
const initMotionPreference = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  prefersReducedMotion.addEventListener('change', (e) => {
    document.documentElement.classList.toggle('reduced-motion', e.matches);
  });
};

// ========================================
// 初期化
// ========================================
const init = () => {
  initReveal();
  initHeader();
  initSmoothScroll();
  initMobileNav();
  initParagraph();
  initMotionPreference();
};

// DOM ready
document.addEventListener('DOMContentLoaded', init);
