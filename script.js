/* ========================================
   MEGHA SARBAT - JavaScript
   Animations, Interactivity, Scroll Effects
   ======================================== */

'use strict';

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => loader.remove(), 600);
    initPage();
  }, 800);
});

// ===== INIT ALL SCRIPTS =====
function initPage() {
  initAOS();
  initNavbar();
  initHamburger();
  initGSAPAnimations();
  initContactForm();
  initBackToTop();
  initNavActiveLinks();
  initMenuHoverEffects();
}

// ===== AOS INIT =====
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
    });
  }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('active');
    // Lock background scroll (both html+body for iOS Safari support)
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on nav link click — overflow cleared BEFORE smooth scroll fires
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !hamburger.contains(e.target) &&
        !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
}

// ===== ACTIVE NAV LINKS ON SCROLL =====
function initNavActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// ===== GSAP ANIMATIONS =====
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero parallax
  const heroBlobs = document.querySelectorAll('.blob');
  if (heroBlobs.length) {
    gsap.to(heroBlobs, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  // Stats counter animation
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(num => {
    const rawText = num.textContent.trim();
    const match = rawText.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    gsap.fromTo(num,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: num,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          num.textContent = Math.round(num.textContent) + suffix;
        },
      }
    );
  });

  // Menu cards stagger reveal
  const menuCards = document.querySelectorAll('.menu-card');
  if (menuCards.length) {
    gsap.fromTo(menuCards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.menu-grid',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // Gallery grid reveal
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    gsap.fromTo(galleryItems,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // Story cards
  const storyCards = document.querySelectorAll('.story-card');
  if (storyCards.length) {
    gsap.fromTo(storyCards,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-text',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    gsap.fromTo(timelineItems,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // Order section cards
  const orderCards = document.querySelectorAll('.order-card');
  if (orderCards.length) {
    gsap.fromTo(orderCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.order-cards',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // Hero text entrance (runs immediately)
  gsap.fromTo('.hero-text',
    { opacity: 0, x: -60 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
  );

  gsap.fromTo('.hero-image',
    { opacity: 0, scale: 0.85 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.2)', delay: 0.4 }
  );
}

// ===== MENU HOVER EFFECTS =====
function initMenuHoverEffects() {
  const menuCards = document.querySelectorAll('.menu-card');

  menuCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, { y: -8, duration: 0.3, ease: 'power2.out' });
      }
    });

    card.addEventListener('mouseleave', function () {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, { y: 0, duration: 0.35, ease: 'power2.inOut' });
      }
    });
  });

  // Flavor tags pop on hover
  const flavorTags = document.querySelectorAll('.flavor-tag');
  flavorTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, { scale: 1.1, duration: 0.2, ease: 'back.out(2.5)' });
      }
    });

    tag.addEventListener('mouseleave', function () {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, { scale: 1, duration: 0.2, ease: 'power2.out' });
      }
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !phone || !message) {
      shakeForm(form);
      return;
    }

    // Simulate submission (no backend)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      if (success) {
        success.classList.add('show');
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(success, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
        }
      }
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        if (success) success.classList.remove('show');
      }, 5000);
    }, 1200);
  });
}

function shakeForm(form) {
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)', clearProps: 'x' });
  }
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX on hero gola on mouse move =====
const heroSection = document.querySelector('.hero');
const golaImg = document.querySelector('.gola-img');

if (heroSection && golaImg) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;

    if (typeof gsap !== 'undefined') {
      gsap.to(golaImg, {
        rotateY: dx * 8,
        rotateX: -dy * 5,
        duration: 0.7,
        ease: 'power1.out',
      });
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(golaImg, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  });
}

// ===== CURSOR GLOW EFFECT (desktop) =====
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(255,71,87,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    top: 0;
    left: 0;
  `;
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
  });
}

// ===== GALLERY LIGHTBOX (simple) =====
const galleryItems = document.querySelectorAll('.gallery-item');

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 9000;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: zoom-out;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 16px;
  object-fit: contain;
  width: auto;
  height: auto;
  box-shadow: 0 20px 80px rgba(0,0,0,0.8);
`;

const lightboxClose = document.createElement('button');
lightboxClose.innerHTML = '&times;';
lightboxClose.style.cssText = `
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
`;

lightbox.appendChild(lightboxImg);
lightbox.appendChild(lightboxClose);
document.body.appendChild(lightbox);

galleryItems.forEach(item => {
  item.addEventListener('click', function () {
    const img = this.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(lightboxImg, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' });
    }
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ===== FSSAI CERTIFICATE LIGHTBOX =====
// Wire FSSAI certificate image to reuse the same gallery lightbox
const fssaiCertWrap = document.querySelector('.fssai-cert-image-wrap');
if (fssaiCertWrap) {
  fssaiCertWrap.addEventListener('click', function () {
    const img = this.querySelector('.fssai-cert-img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(lightboxImg,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' }
      );
    }
  });
}

// ===== FSSAI PILLARS STAGGER ANIMATION =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  const fssaiPillars = document.querySelectorAll('.fssai-pillar');
  if (fssaiPillars.length) {
    gsap.fromTo(fssaiPillars,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fssai-pillars',
          start: 'top 82%',
          once: true,
        },
      }
    );
  }
}
