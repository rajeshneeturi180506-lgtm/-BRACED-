/* =========================================================
   BRACED WEBSITE
   app.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("BRACED Website Loaded");

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /* ===========================
       NAVBAR SHADOW
    =========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 50){

            header.style.boxShadow="0 10px 30px rgba(0,0,0,.12)";

        }

        else{

            header.style.boxShadow="0 2px 10px rgba(0,0,0,.05)";

        }

    });

    /* ===========================
       PREMIUM CALCULATOR
    =========================== */

    const calculatorForm=document.querySelector(".premium-calculator form");

    if(calculatorForm){

        calculatorForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const brand=calculatorForm.querySelectorAll("input")[0].value;

            const model=calculatorForm.querySelectorAll("input")[1].value;

            const price=parseFloat(calculatorForm.querySelectorAll("input")[2].value);

            if(brand==="" || model==="" || isNaN(price)){

                alert("Please fill all fields.");

                return;

            }

            const premium=(price*0.05).toFixed(2);

            alert(

                "Estimated Monthly Premium: ₹"+premium

            );

        });

    }

    /* ===========================
       CONTACT FORM
    =========================== */

    const contactForm=document.querySelector(".contact form");

    if(contactForm){

        contactForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const name=contactForm.querySelector('input[type="text"]').value;

            const email=contactForm.querySelector('input[type="email"]').value;

            const message=contactForm.querySelector("textarea").value;

            if(name==="" || email==="" || message===""){

                alert("Please complete all fields.");

                return;

            }

            alert("Thank you! Your message has been sent.");

            contactForm.reset();

        });

    }

});

/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector("h3");
    const answer = item.querySelector("p");

    if(answer){

        answer.style.display = "none";

        question.style.cursor = "pointer";

        question.addEventListener("click", () => {

            const isOpen = answer.style.display === "block";

            faqItems.forEach(faq => {

                const p = faq.querySelector("p");

                if(p){

                    p.style.display = "none";

                }

            });

            if(!isOpen){

                answer.style.display = "block";

            }

        });

    }

});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".feature-card, .testimonial-card, .faq-item"
);

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if(top < windowHeight - 100){

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all .6s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================================================
   BUTTON CLICK EFFECT
========================================================= */

document.querySelectorAll(".btn-primary, .btn-secondary").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.96)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        },150);

    });

});

/* =========================================================
   HERO IMAGE FLOAT
========================================================= */

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

    let up = true;

    setInterval(() => {

        heroImage.style.transform = up
            ? "translateY(-10px)"
            : "translateY(10px)";

        up = !up;

    },1500);

}
// about.js
// Complete vanilla JavaScript for BRACED About page
// Features:
// - Smooth scrolling with sticky header offset
// - Mobile nav toggle (accessible)
// - On-scroll reveal animations (fade-in, slide-up) via IntersectionObserver
// - Animated counters with thousands separators and suffix handling
// - Contact form lightweight validation + simulated submit with status feedback
// - Respect prefers-reduced-motion
// - Clean, well-commented and dependency-free

/* =========================
   Cached DOM nodes & config
   ========================= */
const doc = document;
const header = doc.querySelector('.site-header');
const revealEls = Array.from(doc.querySelectorAll('.reveal'));
const counters = Array.from(doc.querySelectorAll('.counter'));
const navToggle = doc.querySelector('.nav-toggle');
const nav = doc.querySelector('.nav');
const contactForm = doc.getElementById('contact-form');
const contactStatus = doc.getElementById('contact-status');
const resetBtn = doc.getElementById('contact-reset');
const yearEl = doc.getElementById('year');

const REVEAL_ROOT_MARGIN = '0px 0px -10% 0px';
const REVEAL_THRESHOLD = 0.12;

/* =========================
   Utilities
   ========================= */
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function numberWithCommas(value) {
  // Use toLocaleString for proper grouping
  return value.toLocaleString();
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

/* =========================
   Set current year (footer)
   ========================= */
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================
   Mobile Nav Toggle (accessible)
   - toggles .open on .nav and manages inline styles for small screens
   ========================= */
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      // Inline styles for simple mobile popover (keeps CSS minimal)
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = `${header ? header.offsetHeight : 64}px`;
      nav.style.right = '20px';
      nav.style.background = '#fff';
      nav.style.padding = '12px';
      nav.style.borderRadius = '12px';
      nav.style.boxShadow = '0 12px 30px rgba(16,24,40,0.08)';
    } else {
      nav.removeAttribute('style');
    }
  });
}

/* =========================
   Reveal on scroll + Counters using IntersectionObserver
   - Single observer used to improve performance
   ========================= */
function onReveal(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('active');

      // Animate any counters inside this revealed element
      const innerCounters = Array.from(el.querySelectorAll('.counter'));
      innerCounters.forEach(animateCounter);

      // If we don't want repeated animations, unobserve
      observer.unobserve(el);
    }
  });
}

if (!prefersReducedMotion && supportsIntersectionObserver) {
  const observer = new IntersectionObserver(onReveal, {
    root: null,
    rootMargin: REVEAL_ROOT_MARGIN,
    threshold: REVEAL_THRESHOLD
  });
  revealEls.forEach(el => observer.observe(el));
} else {
  // Reduced motion or no observer support: reveal everything and set counters to final
  revealEls.forEach(el => el.classList.add('active'));
  counters.forEach(c => {
    const targetRaw = c.getAttribute('data-target') || c.textContent || '0';
    const numeric = Number(String(targetRaw).replace(/[^\d.-]/g, '')) || 0;
    c.textContent = numberWithCommas(numeric) + (String(c.textContent).replace(/[\d,.\s+-]/g, '') || '');
    c.dataset.animated = 'true';
  });
}

/* =========================
   Counter animation
   - Supports integer counters and keeps suffixes (e.g., "%", "/7")
   - Uses ease-out cubic for a smooth finish
   ========================= */
function animateCounter(el) {
  if (!el || el.dataset.animated) return;
  el.dataset.animated = 'true';

  // Read target from data-target (preferred) or current text
  const rawTarget = el.getAttribute('data-target') || el.textContent || '0';
  const targetNum = Number(String(rawTarget).replace(/[^\d.-]/g, '')) || 0;

  // Detect suffix/prefix (non-digit characters)
  // We'll preserve trailing non-digit characters (like '%' or '/7') and leading non-digits
  const text = el.textContent.trim();
  const leading = text.match(/^[^\d]*/)[0] || '';
  const trailing = text.match(/[^\d]*$/)[0] || '';

  // Animation settings
  const duration = clamp(1000 + Math.abs(targetNum) * 0.6, 900, 2200); // ms, scale with value but bounded
  const fps = 60;
  const totalFrames = Math.round((duration / 1000) * fps);
  let frame = 0;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const tick = () => {
    frame++;
    const progress = easeOutCubic(frame / totalFrames);
    const current = Math.round(targetNum * progress);
    el.textContent = leading + numberWithCommas(current) + trailing;
    if (frame < totalFrames) {
      requestAnimationFrame(tick);
    } else {
      // Final exact value
      el.textContent = leading + numberWithCommas(targetNum) + trailing;
    }
  };

  requestAnimationFrame(tick);
}

/* Animate counters already visible on initial load (in case not observed) */
counters.forEach(c => {
  const r = c.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom >= 0 && !prefersReducedMotion) {
    animateCounter(c);
  }
});

/* =========================
   Smooth internal link scrolling that accounts for sticky header
   - intercepts clicks on anchor links and scrolls with offset
   ========================= */
doc.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href || href === '#' || href === '#0') return;

  const targetId = href.slice(1);
  const targetEl = doc.getElementById(targetId);
  if (!targetEl) return;

  e.preventDefault();

  const headerOffset = header ? header.offsetHeight + 8 : 72; // small extra spacing
  const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
  const scrollTo = Math.max(targetPosition - headerOffset, 0);

  window.scrollTo({
    top: scrollTo,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });

  // If the mobile nav is open, close it for a clean UX
  if (nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    nav.removeAttribute('style');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* =========================
   Contact form: simple validation and simulated submit
   - Uses Constraint Validation API where available
   - Shows status to user, resets on success
   ========================= */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactStatus) return;

    // Basic validity check
    if (!contactForm.checkValidity()) {
      contactStatus.textContent = 'Please complete the required fields.';
      contactStatus.style.color = 'crimson';
      // Trigger browser validation UI
      contactForm.reportValidity?.();
      return;
    }

    // Collect form data (we'll simulate submission)
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    // UI feedback
    contactStatus.style.color = '';
    contactStatus.textContent = 'Sending your request…';
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.setAttribute('disabled', 'true');

    // Simulate network latency / server processing
    setTimeout(() => {
      // Simulated success response
      contactStatus.style.color = '';
      contactStatus.textContent = 'Thanks — we received your request! We’ll be in touch within one business day.';
      // Reset form (but keep consent unchecked for privacy)
      contactForm.reset();
      if (submitBtn) submitBtn.removeAttribute('disabled');

      // Optionally, animate a tiny reveal or focus to status for assistive tech
      contactStatus.focus?.();
    }, 900 + Math.random() * 800);
  });

  // Reset button support
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      contactForm.reset();
      if (contactStatus) {
        contactStatus.textContent = 'Form reset.';
        contactStatus.style.color = '';
      }
    });
  }
}

/* =========================
   Ensure hero reveals on load if visible
   - Allows a nicer entrance for above-the-fold content
   ========================= */
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('#hero .reveal');
  heroReveals.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) el.classList.add('active');
  });
});

/* =========================
   Resize/Orientation handling
   - Recompute mobile nav top offset in case header height changed
   ========================= */
window.addEventListener('resize', () => {
  if (nav && nav.classList.contains('open') && header) {
    nav.style.top = `${header.offsetHeight}px`;
  }
});

/* =========================
   Final notes:
   - The code prioritizes accessibility: respects prefers-reduced-motion,
     uses ARIA attributes already present in the HTML (aria-expanded),
     and leverages native validation where possible.
   - No third-party dependencies; everything is in vanilla JS.
   ========================= */