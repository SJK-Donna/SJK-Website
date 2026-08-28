/* SJK Guahan — Golf carts, course equipment & turf solutions
   Header and footer are loaded from header.html and footer.html.
*/

async function loadPartial(targetId, fileName) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(fileName);

    if (!response.ok) {
      throw new Error(
        `Failed to load ${fileName}: ${response.status}`
      );
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= HERO CAROUSEL ================= */

const HERO_SLIDES = [
  {
    eyebrow: "SJK Guahan",
    headline: "Powering Every Round. Maintaining Every Course.",
    subtitle: "Golf carts, course equipment, turf solutions, and professional golf services — all in one place.",
    ctaPrimary: { label: "Explore Solutions", href: "#find-solution" },
    ctaSecondary: { label: "Our Services", href: "#course-care" },
    img: "images/carousel/slide-1.jpg",
    alt: "Row of golf carts parked on a misty golf course at dawn"
  },
  {
    eyebrow: "Golf Carts PH",
    headline: "Ride The Fairway.",
    subtitle: "Reliable transportation solutions built for golf courses, resorts, communities, and businesses.",
    ctaPrimary: { label: "Explore Golf Carts", href: "#fairway" },
    ctaSecondary: { label: "Request A Quote", href: "#quote" },
    img: "images/carousel/slide-2.jpg",
    alt: "White golf cart parked beneath large trees on a lush fairway"
  },
  {
    eyebrow: "Jacobsen",
    headline: "Precision For Every Inch Of Turf.",
    subtitle: "Advanced turf care technology engineered for exceptional cut quality and consistent, tournament-ready results.",
    ctaPrimary: { label: "Explore Course Equipment", href: "#course-equipment" },
    ctaSecondary: { label: "Request A Quote", href: "#quote" },
    img: "images/carousel/slide-3.jpg",
    alt: "Jacobsen fairway mower with operator cutting a golf course under cloudy skies"
  },
  {
    eyebrow: "Wacker Neuson",
    headline: "Built To Conquer Every Job.",
    subtitle: "Powerful, dependable machines engineered to perform wherever the work takes you — from tight sites to heavy terrain.",
    ctaPrimary: { label: "Explore Course Equipment", href: "#course-equipment" },
    ctaSecondary: { label: "Our Services", href: "#course-care" },
    img: "images/carousel/slide-4.jpg",
    alt: "Wacker Neuson mini excavator digging at a construction site"
  }
];

function buildHeroSlidesHTML() {
  return HERO_SLIDES.map((s, i) => {
    const words = s.headline.split(" ").map((w, wi) => `<span class="hc-word" style="--wi:${wi}">${w}</span>`).join(" ");
    return `
    <div class="hc-slide" data-index="${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${HERO_SLIDES.length}">
      <div class="hc-media"><img src="${s.img}" alt="${s.alt}" draggable="false" loading="${i === 0 ? "eager" : "lazy"}" fetchpriority="${i === 0 ? "high" : "auto"}"></div>
      <div class="hc-scrim"></div>
      <div class="hc-glow" aria-hidden="true"></div>
      <div class="hc-content">
        <span class="hc-eyebrow">${s.eyebrow}</span>
        <h1 class="hc-headline">${words}</h1>
        <p class="hc-subtitle">${s.subtitle}</p>
        <div class="hc-cta">
          <a href="${s.ctaPrimary.href}" class="btn btn-primary">${s.ctaPrimary.label} <span class="arrow">→</span></a>
          <a href="${s.ctaSecondary.href}" class="btn btn-outline-light">${s.ctaSecondary.label}</a>
        </div>
      </div>
    </div>`;
  }).join("");
}

function buildHeroDotsHTML() {
  return HERO_SLIDES.map((_, i) =>
    `<button type="button" class="hc-dot${i === 0 ? " active" : ""}" data-goto="${i}" aria-label="Go to slide ${i + 1}" aria-current="${i === 0}"><span class="hc-dot-fill"></span></button>`
  ).join("");
}

function initHeroCarousel() {
  const root = document.getElementById("heroCarousel");
  if (!root) return;

  document.getElementById("hcTrack").innerHTML = buildHeroSlidesHTML();
  document.getElementById("hcDots").innerHTML = buildHeroDotsHTML();
  document.getElementById("hcTotal").textContent = String(HERO_SLIDES.length).padStart(2, "0");

  const track = document.getElementById("hcTrack");
  const slides = Array.from(root.querySelectorAll(".hc-slide"));
  const dots = Array.from(root.querySelectorAll(".hc-dot"));
  const curEl = document.getElementById("hcCur");
  const liveRegion = document.getElementById("hcLiveRegion");
  const prevBtn = root.querySelector(".hc-arrow.prev");
  const nextBtn = root.querySelector(".hc-arrow.next");
  const total = slides.length;
  const canHoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const AUTOPLAY_MS = 7000;
  root.style.setProperty("--autoplay-ms", `${AUTOPLAY_MS}ms`);

  let index = 0;
  let autoplayTimer = null;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-current", i === index ? "true" : "false");
    });
    curEl.textContent = String(index + 1).padStart(2, "0");
    liveRegion.textContent = `Slide ${index + 1} of ${total}: ${HERO_SLIDES[index].headline}`;
  }

  function goTo(i, userInitiated) {
    index = (i + total) % total;
    render();
    if (userInitiated) restartAutoplay();
  }
  function next(userInitiated) { goTo(index + 1, userInitiated); }
  function prev(userInitiated) { goTo(index - 1, userInitiated); }

  function startAutoplay() {
    root.classList.remove("paused");
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    if (reduceMotion) return;
    autoplayTimer = setInterval(() => next(false), AUTOPLAY_MS);
  }
  function stopAutoplay() {
    root.classList.add("paused");
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function restartAutoplay() { startAutoplay(); }

  prevBtn.addEventListener("click", () => prev(true));
  nextBtn.addEventListener("click", () => next(true));
  dots.forEach((d) => d.addEventListener("click", () => goTo(Number(d.dataset.goto), true)));

  // The carousel fills the entire viewport, so a canvas-wide mouseenter/mouseleave
  // pause would trigger the moment the page loads under a stationary cursor and
  // never resume. Pause on hover only over the interactive controls instead.
  function isHoverPauseTarget(el) {
    return !!(el && el.closest && el.closest(".hc-arrow, .hc-footer, .btn"));
  }
  root.addEventListener("pointerover", (e) => {
    if (isHoverPauseTarget(e.target)) stopAutoplay();
  });
  root.addEventListener("pointerout", (e) => {
    if (isHoverPauseTarget(e.target) && !isHoverPauseTarget(e.relatedTarget)) startAutoplay();
  });
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", (e) => {
    if (!root.contains(e.relatedTarget)) startAutoplay();
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next(true); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { prev(true); e.preventDefault(); }
  });

  // Pointer drag / swipe (mouse drag on desktop, touch swipe on mobile).
  let dragging = false, dragStartX = 0, dragDeltaX = 0, dragStartTime = 0;
  const SWIPE_THRESHOLD = 0.15;

  root.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest(".hc-arrow, .hc-dot, .btn")) return;
    dragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    dragStartTime = performance.now();
    root.classList.add("dragging");
    track.style.transitionDuration = "0s";
    stopAutoplay();
    if (root.setPointerCapture) { try { root.setPointerCapture(e.pointerId); } catch (err) {} }
  });

  root.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dragDeltaX = e.clientX - dragStartX;
    const pct = (dragDeltaX / root.clientWidth) * 100;
    track.style.transform = `translateX(calc(-${index * 100}% + ${pct}%))`;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    root.classList.remove("dragging");
    track.style.transitionDuration = "";
    const pct = dragDeltaX / root.clientWidth;
    const elapsed = performance.now() - dragStartTime;
    const fastFlick = Math.abs(dragDeltaX) > 60 && elapsed < 300;
    if (pct <= -SWIPE_THRESHOLD || (fastFlick && dragDeltaX < 0)) next(true);
    else if (pct >= SWIPE_THRESHOLD || (fastFlick && dragDeltaX > 0)) prev(true);
    else render();
    restartAutoplay();
  }
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);

  // Subtle hover depth/tilt on the active image (desktop, fine pointer only).
  if (canHoverFine && !reduceMotion) {
    root.addEventListener("mousemove", (e) => {
      if (dragging) return;
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const media = slides[index].querySelector(".hc-media");
      media.style.setProperty("--tiltX", `${(nx * -14).toFixed(1)}px`);
      media.style.setProperty("--tiltY", `${(ny * -8).toFixed(1)}px`);
    });
    root.addEventListener("mouseleave", () => {
      const media = slides[index].querySelector(".hc-media");
      media.style.removeProperty("--tiltX");
      media.style.removeProperty("--tiltY");
    });
  }

  render();
  startAutoplay();
}

/* ================= FLOATING NAV ================= */

function initNav() {
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    function closeMenu() {
      toggle.classList.remove("is-open");
      mobile.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function toggleMenu() {
      const open = toggle.classList.toggle("is-open");
      mobile.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", toggleMenu);
    mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }
}

/* ================= SCROLL-REVEAL ================= */

function initRevealAnimations() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  els.forEach((el) => observer.observe(el));
}

/* ================= JOURNEY PROGRESS RAIL ================= */

function initJourneyRail() {
  const rail = document.getElementById("journeyRail");
  const hero = document.getElementById("hero");
  if (!rail || !hero) return;

  const items = Array.from(rail.querySelectorAll("li"));
  // "tee" points at the Tee Off section rather than the hero itself: jumping back to
  // the hero would re-trigger heroObserver below and hide/disable the rail again,
  // leaving it stuck unclickable until the user manually scrolled past the hero.
  const stageTargets = { tee: "#tee-off", fairway: "#fairway", green: "#course-equipment", care: "#course-care", clubhouse: "#brands" };
  const sections = Array.from(document.querySelectorAll("[data-stage]"));

  items.forEach((li) => {
    li.addEventListener("click", () => {
      const target = document.querySelector(stageTargets[li.dataset.stage]);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  function setActiveStage(stage) {
    items.forEach((li) => li.classList.toggle("is-active", li.dataset.stage === stage));
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      rail.classList.toggle("is-visible", !entry.isIntersecting);
    });
  }, { threshold: 0.1 });
  heroObserver.observe(hero);

  if ("IntersectionObserver" in window) {
    // A fixed 50%-of-target-height threshold breaks down for very tall sections
    // (e.g. the 420vh scroll-driven Course Care track): 50% of a huge element is
    // more screen space than the viewport has, so it would never "activate" near
    // its own top or bottom. Watch a thin band at the vertical center of the
    // viewport instead — whichever section currently crosses that line is active,
    // regardless of how tall or short it is.
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveStage(entry.target.dataset.stage);
      });
    }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });
    sections.forEach((s) => sectionObserver.observe(s));
  }
}

/* ================= COURSE CARE — SERVICE JOURNEY ================= */

function initServiceJourney() {
  const root = document.getElementById("serviceJourney");
  if (!root) return;

  const steps = Array.from(root.querySelectorAll(".sj-step"));
  const panels = Array.from(root.querySelectorAll(".sj-panel"));
  const fill = document.getElementById("sjRailFill");
  const total = steps.length;
  const desktopQuery = window.matchMedia("(min-width:901px)");
  let activeIndex = 0;
  let scrollDriven = false;

  function setActive(i) {
    activeIndex = Math.max(0, Math.min(total - 1, i));
    steps.forEach((s, idx) => s.classList.toggle("is-active", idx === activeIndex));
    panels.forEach((p, idx) => p.classList.toggle("is-active", idx === activeIndex));
    fill.style.width = `${((activeIndex + 1) / total) * 100}%`;
  }

  steps.forEach((step, i) => {
    step.addEventListener("click", () => {
      setActive(i);
      if (desktopQuery.matches && !reduceMotion) {
        const rect = root.getBoundingClientRect();
        const scrollable = root.offsetHeight - window.innerHeight;
        if (scrollable > 0) {
          const targetY = window.scrollY + rect.top + (i / total) * scrollable + 1;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    });
  });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (!scrollDriven) return;
      const rect = root.getBoundingClientRect();
      const scrollable = root.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActive(Math.min(total - 1, Math.floor(progress * total)));
    });
  }

  function syncMode() {
    scrollDriven = desktopQuery.matches && !reduceMotion;
  }
  syncMode();
  desktopQuery.addEventListener("change", syncMode);
  window.addEventListener("scroll", onScroll, { passive: true });

  setActive(0);
}

/* ================= FIND YOUR SOLUTION ================= */

const SOLUTIONS = [
  {
    eyebrow: "Move Players",
    title: "Golf Carts",
    description: "Premium passenger and utility golf carts for courses, resorts, and communities.",
    img: "images/carousel/slide-1.jpg",
    alt: "Row of golf carts on a golf course",
    ctaHref: "#fairway"
  },
  {
    eyebrow: "Maintain Turf",
    title: "Turf Equipment",
    description: "Precision mowing and turf care technology for tournament-ready results.",
    img: "images/carousel/slide-3.jpg",
    alt: "Fairway mower cutting turf",
    ctaHref: "#course-equipment"
  },
  {
    eyebrow: "Maintain The Course",
    title: "Utility & Maintenance Equipment",
    description: "Dependable utility vehicles and maintenance equipment to keep every corner of your course in shape.",
    img: "images/carousel/slide-2.jpg",
    alt: "Utility golf cart on course grounds",
    ctaHref: "#course-equipment"
  },
  {
    eyebrow: "Build Or Improve",
    title: "Construction Equipment",
    description: "Powerful, dependable machines built to conquer every job — from tight sites to heavy terrain.",
    img: "images/carousel/slide-4.jpg",
    alt: "Mini excavator at a construction site",
    ctaHref: "#course-equipment"
  },
  {
    eyebrow: "Service Equipment",
    title: "Service & Support",
    description: "Preventive maintenance, repair, parts, and after-sales support to keep your equipment running.",
    img: "images/carousel/slide-3.jpg",
    alt: "Technician operating turf equipment",
    ctaHref: "#course-care"
  }
];

function buildSolutionResultHTML(s) {
  return `
    <div class="sf-result-media"><img src="${s.img}" alt="${s.alt}" loading="lazy"></div>
    <div class="sf-result-copy">
      <span class="eyebrow">${s.eyebrow}</span>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <a href="${s.ctaHref}" class="btn btn-primary">Explore <span class="arrow">→</span></a>
    </div>`;
}

function initSolutionFinder() {
  const root = document.getElementById("solutionFinder");
  if (!root) return;

  const options = Array.from(root.querySelectorAll(".sf-option"));
  const result = document.getElementById("sfResult");
  let current = -1;
  let swapping = false;

  function select(i, animate) {
    if (i === current || swapping) return;
    current = i;
    options.forEach((o, idx) => {
      o.classList.toggle("is-active", idx === i);
      o.setAttribute("aria-selected", String(idx === i));
    });

    if (!animate || reduceMotion) {
      result.innerHTML = buildSolutionResultHTML(SOLUTIONS[i]);
      return;
    }

    swapping = true;
    result.classList.add("is-swapping");
    setTimeout(() => {
      result.innerHTML = buildSolutionResultHTML(SOLUTIONS[i]);
      requestAnimationFrame(() => {
        result.classList.remove("is-swapping");
        swapping = false;
      });
    }, 280);
  }

  options.forEach((opt, i) => opt.addEventListener("click", () => select(i, true)));
  select(0, false);
}

/* ================= REQUEST A QUOTE ================= */

function initQuoteForm() {
  const form = document.getElementById("quoteForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Front-end only for now — no backend is wired up yet.
    status.classList.add("show");
    form.reset();
    status.setAttribute("tabindex", "-1");
    status.focus({ preventScroll: true });
  });
}

/* ================= OUR PARTNERS — 3D DIGITAL SHOWCASE ================= */

const PARTNERS = [
  { src: "images/partners/8.png", name: "Manila Golf", cat: "Golf Club" },
  { src: "images/partners/1.png", name: "Amanpulo", cat: "Luxury Resort" },
  { src: "images/partners/6.png", name: "Forest Hills Golf & Country Club", cat: "Golf & Country Club" },
  { src: "images/partners/2.png", name: "FedEx", cat: "Logistics Partner" },
  { src: "images/partners/4.png", name: "Anvaya Cove Golf & Sports Club", cat: "Golf & Sports Club" },
  { src: "images/partners/3.png", name: "The Farm at San Benito", cat: "Wellness Resort" },
  { src: "images/partners/5.png", name: "Valley Golf", cat: "Golf Course" },
  { src: "images/partners/7.png", name: "Mimosa Plus Golf Course", cat: "Golf Course" }
];

function buildPartnerPanelsHTML() {
  return PARTNERS.map((p, i) => `
    <li class="ps-panel" style="--i:${i};">
      <a class="ps-panel-face" href="#quote" aria-label="${p.name} — ${p.cat}. Request a quote.">
        <img src="${p.src}" alt="${p.name}" loading="lazy">
        <span class="ps-info">
          <span class="ps-cat">${p.cat}</span>
          <span class="ps-name">${p.name}</span>
          <span class="ps-cta">Explore <span class="arrow">→</span></span>
        </span>
      </a>
    </li>`).join("");
}

// The showcase is a single shared 3D space (see .ps-scene / .ps-panels in
// style.css, both transform-style:preserve-3d): the central structure sits
// fixed at translateZ(0), and every panel continuously orbits it on an
// elliptical path in the X/Z plane. Because they share one 3D context the
// browser depth-sorts them for real — a panel with a more negative Z than
// the structure actually renders behind it, and apparent size comes from
// CSS perspective doing its job on translateZ, not a manually keyframed
// scale. This is one continuous slow loop, not a carousel: there is no
// "current slide," just orbit phase.
function initPartnerShowcase() {
  const showcase = document.getElementById("partnerShowcase");
  const scene = document.getElementById("psScene");
  const panelsList = document.getElementById("psPanels");
  if (!showcase || !scene || !panelsList) return;

  panelsList.innerHTML = buildPartnerPanelsHTML();
  const panels = Array.from(panelsList.children);

  // Entrance choreography: structure and panels fade in once scrolled into view.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showcase.classList.add("is-active");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    io.observe(showcase);
  } else {
    showcase.classList.add("is-active");
  }

  // Each card travels its own Lissajous-like path through the shared space —
  // distinct period, starting phase, per-axis radii and a secondary wobble
  // frequency — instead of every card riding one shared orbit at one shared
  // speed. A single shared orbit is what read as "everything rotating
  // together as one object" (a carousel); independent paths are what make
  // cards drift apart, cross in front of and behind each other and the
  // structure, and settle into the foreground/background at different times.
  const RADIUS_X = 250;
  const RADIUS_Z = 190;
  const RADIUS_Y = 40;
  const MAX_TILT_Y = 9; // degrees of self-rotation — kept small so logos never distort
  const MAX_TILT_X = 5;

  function seededRandom(seed) {
    return function next() {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Deterministic per-card variety (stable across reloads, no layout jank).
  const cardParams = panels.map((_, i) => {
    const rand = seededRandom(1000 + i * 97);
    return {
      periodMs: 24000 + rand() * 20000, // 24s–44s: every card laps at its own speed
      freqRatio: 1.35 + rand() * 0.5, // secondary wobble, a non-integer ratio so the path doesn't close into a simple loop
      phase: rand() * Math.PI * 2,
      rx: RADIUS_X * (0.7 + rand() * 0.6),
      rz: RADIUS_Z * (0.65 + rand() * 0.75),
      ry: RADIUS_Y * (0.5 + rand() * 1.1),
      wobble: 0.2 + rand() * 0.25,
      baseScale: 0.86 + rand() * 0.3,
      tilt: 0.6 + rand() * 0.8
    };
  });

  // Tablet gets a tighter, calmer scene so it stays coherent inside a
  // narrower section width, without changing the composition itself.
  const tabletQuery = window.matchMedia("(max-width:1099px)");
  let sceneScale = tabletQuery.matches ? 0.72 : 1;
  tabletQuery.addEventListener("change", (e) => { sceneScale = e.matches ? 0.72 : 1; });

  let hoverIndex = -1;
  const frozenT = panels.map(() => null); // per-card local-time snapshot while hovered/focused

  function placePanel(li, i, tMs) {
    const p = cardParams[i];
    const isHot = i === hoverIndex;
    const a1 = (tMs / p.periodMs) * Math.PI * 2 + p.phase;
    const a2 = a1 * p.freqRatio + p.phase * 0.5;

    const x = (Math.cos(a1) * p.rx + Math.cos(a2 * 0.85) * p.rx * p.wobble * 0.5) * sceneScale;
    const z = (Math.sin(a1) * p.rz + Math.sin(a2 * 0.7) * p.rz * p.wobble) * sceneScale + (isHot ? 90 : 0);
    const y = (Math.sin(a1 * 1.3 + p.phase) * p.ry + Math.sin(a2) * p.ry * 0.3) * sceneScale;

    // A gentle turn toward/away from the viewer based on where the card
    // currently sits, not a spin — capped low so the logo stays legible.
    const rotY = Math.max(-MAX_TILT_Y, Math.min(MAX_TILT_Y, (x / (p.rx * 1.4 || 1)) * MAX_TILT_Y * p.tilt));
    const rotX = Math.max(-MAX_TILT_X, Math.min(MAX_TILT_X, (-y / (p.ry * 1.4 || 1)) * MAX_TILT_X * p.tilt));
    const scale = p.baseScale * (isHot ? 1.12 : 1);

    li.style.transform = `translate3d(-50%,-50%,0) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    li.classList.toggle("is-hot", isHot);
  }

  panels.forEach((li, i) => {
    li.addEventListener("mouseenter", () => { hoverIndex = i; });
    li.addEventListener("mouseleave", () => { hoverIndex = -1; frozenT[i] = null; });
    li.addEventListener("focusin", () => { hoverIndex = i; });
    li.addEventListener("focusout", () => { hoverIndex = -1; frozenT[i] = null; });
  });

  if (reduceMotion) {
    // Static arrangement: one frame per card, no ongoing motion.
    panels.forEach((li, i) => placePanel(li, i, 0));
  } else {
    let rafId;
    let startTime = null;
    function frame(now) {
      if (startTime === null) startTime = now;
      const t = now - startTime;
      panels.forEach((li, i) => {
        // A hovered/focused card holds its position instead of continuing to
        // travel, so the "lift toward viewer" reads clearly rather than
        // fighting the ongoing motion.
        if (i === hoverIndex) {
          if (frozenT[i] === null) frozenT[i] = t;
        } else {
          frozenT[i] = null;
        }
        placePanel(li, i, frozenT[i] !== null ? frozenT[i] : t);
      });
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    // Subtle scroll-linked rotation of the whole scene, plus a light mouse parallax tilt.
    const desktopQuery = window.matchMedia("(min-width:700px)");
    let scrollRot = 0;
    let mouseRotX = 0;
    let mouseRotY = 0;
    let ticking = false;

    function applySceneTransform() {
      scene.style.transform = `rotateY(${(scrollRot + mouseRotY).toFixed(2)}deg) rotateX(${(-mouseRotX).toFixed(2)}deg)`;
    }

    function onScroll() {
      if (!desktopQuery.matches || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = showcase.getBoundingClientRect();
        const progress = 1 - Math.min(1, Math.max(0, rect.top / window.innerHeight));
        scrollRot = (progress - 0.5) * 12 * sceneScale; // -6deg .. 6deg across the section's scroll range, tighter on tablet
        applySceneTransform();
      });
    }

    showcase.addEventListener("mousemove", (e) => {
      if (!desktopQuery.matches) return;
      const rect = showcase.getBoundingClientRect();
      mouseRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 8 * sceneScale;
      mouseRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 8 * sceneScale;
      applySceneTransform();
    });
    showcase.addEventListener("mouseleave", () => {
      mouseRotX = 0;
      mouseRotY = 0;
      applySceneTransform();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}

function initPartnerMobile() {
  const root = document.getElementById("partnerMobile");
  if (!root) return;

  const img = document.getElementById("pmImg");
  const nameEl = document.getElementById("pmName");
  const catEl = document.getElementById("pmCat");
  const curEl = document.getElementById("pmCur");
  const totalEl = document.getElementById("pmTotal");
  const prevBtn = root.querySelector(".pm-prev");
  const nextBtn = root.querySelector(".pm-next");
  const dotsRoot = document.getElementById("pmDots");

  let index = 0;
  totalEl.textContent = String(PARTNERS.length).padStart(2, "0");

  if (dotsRoot) {
    dotsRoot.innerHTML = PARTNERS.map((p, i) =>
      `<button type="button" class="pm-dot" role="tab" aria-label="Go to ${p.name}" aria-selected="${i === 0 ? "true" : "false"}"></button>`
    ).join("");
  }
  const dots = dotsRoot ? Array.from(dotsRoot.children) : [];

  function render() {
    const p = PARTNERS[index];
    img.src = p.src;
    img.alt = p.name;
    nameEl.textContent = p.name;
    catEl.textContent = p.cat;
    curEl.textContent = String(index + 1).padStart(2, "0");
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
  }
  function go(delta) {
    index = (index + delta + PARTNERS.length) % PARTNERS.length;
    render();
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => { index = i; render(); }));
  render();
}

async function initSite() {
  await Promise.all([
    loadPartial("site-header", "header.html"),
    loadPartial("site-footer", "footer.html")
  ]);

  initNav();
  initHeroCarousel();
  initJourneyRail();
  initRevealAnimations();
  initServiceJourney();
  initSolutionFinder();
  initPartnerShowcase();
  initPartnerMobile();
  initQuoteForm();
}

document.addEventListener("DOMContentLoaded", initSite);
