/* SJK Guahan — Course Map
   Main application logic extracted from the original single-file page.
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

const BASE_W = 2752;
const BASE_H = 1536;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

let zoom = 1;
let mapInitialized = false;

/* ================= HOME HERO CAROUSEL ================= */

const HERO_SLIDES = [
  {
    eyebrow: "SJK Guahan",
    headline: "Powering Outdoor Excellence",
    subtitle: "Dependable equipment and innovative solutions engineered to perform — from golf and turf care to construction, delivered across the Philippines.",
    cta: "Explore Our Brands",
    target: "brands",
    img: "images/carousel/slide-1.jpg",
    alt: "Row of Club Car golf carts parked on a misty golf course at dawn"
  },
  {
    eyebrow: "Golf Carts PH",
    headline: "Ride Beyond the Ordinary",
    subtitle: "Comfort, style, and performance in every journey — premium golf carts built for the course and beyond.",
    cta: "Discover Golf Carts PH",
    target: "brands",
    img: "images/carousel/slide-2.jpg",
    alt: "White golf cart parked beneath large trees on a lush fairway"
  },
  {
    eyebrow: "Jacobsen",
    headline: "Precision That Perfects Every Turf",
    subtitle: "Advanced turf care technology engineered for exceptional cut quality and consistent, tournament-ready results.",
    cta: "See Jacobsen Equipment",
    target: "brands",
    img: "images/carousel/slide-3.jpg",
    alt: "Jacobsen fairway mower with operator cutting a golf course under cloudy skies"
  },
  {
    eyebrow: "Wacker Neuson",
    headline: "Built to Conquer Every Job",
    subtitle: "Powerful, dependable machines engineered to perform wherever the work takes you — from tight sites to heavy terrain.",
    cta: "View Wacker Neuson",
    target: "brands",
    img: "images/carousel/slide-4.jpg",
    alt: "Wacker Neuson mini excavator digging at a construction site"
  }
];

function buildHeroCarouselHTML() {
  const total = HERO_SLIDES.length;

  const slides = HERO_SLIDES.map((s, i) => `
    <div class="hc-slide" data-index="${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${total}">
      <div class="hc-media"><img src="${s.img}" alt="${s.alt}" draggable="false" loading="${i === 0 ? "eager" : "lazy"}"></div>
      <div class="hc-scrim"></div>
      <div class="hc-content">
        <span class="hc-eyebrow">${s.eyebrow}</span>
        <h2 class="hc-headline">${s.headline}</h2>
        <p class="hc-subtitle">${s.subtitle}</p>
        <div class="hc-cta">
          <button type="button" class="hc-btn" data-target-hole="${s.target}">
            ${s.cta}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </div>`).join("");

  const dots = HERO_SLIDES.map((_, i) =>
    `<button type="button" class="hc-dot${i === 0 ? " active" : ""}" data-goto="${i}" aria-label="Go to slide ${i + 1}" aria-current="${i === 0}"></button>`
  ).join("");

  return `
    <div class="hero-carousel" id="heroCarousel" role="region" aria-roledescription="carousel" aria-label="SJK Guahan highlights">
      <div class="hc-track" id="hcTrack">${slides}</div>
      <button type="button" class="hc-arrow prev" aria-label="Previous slide">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <button type="button" class="hc-arrow next" aria-label="Next slide">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      <div class="hc-footer">
        <div class="hc-dots" id="hcDots">${dots}</div>
        <div class="hc-counter"><span class="cur" id="hcCur">01</span><span class="sep">/</span><span>${String(total).padStart(2, "0")}</span></div>
      </div>
      <span class="sr-only" aria-live="polite" id="hcLiveRegion"></span>
    </div>`;
}

function initHeroCarousel() {
  const root = document.getElementById("heroCarousel");
  if (!root) return;

  const track = document.getElementById("hcTrack");
  const slides = Array.from(root.querySelectorAll(".hc-slide"));
  const dots = Array.from(root.querySelectorAll(".hc-dot"));
  const curEl = document.getElementById("hcCur");
  const liveRegion = document.getElementById("hcLiveRegion");
  const prevBtn = root.querySelector(".hc-arrow.prev");
  const nextBtn = root.querySelector(".hc-arrow.next");
  const total = slides.length;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const AUTOPLAY_MS = 6500;

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
    if (reduceMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => next(false), AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function restartAutoplay() { startAutoplay(); }

  prevBtn.addEventListener("click", () => prev(true));
  nextBtn.addEventListener("click", () => next(true));
  dots.forEach((d) => d.addEventListener("click", () => goTo(Number(d.dataset.goto), true)));

  root.querySelectorAll(".hc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hole = btn.dataset.targetHole;
      if (hole && window.goToHole) window.goToHole(hole);
    });
  });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
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
    if (e.target.closest(".hc-arrow, .hc-dot, .hc-btn")) return;
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

function initLanding() {
  const landingPage = document.getElementById("landingPage");
  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", () => {
    landingPage.classList.add("parting");
    setTimeout(() => landingPage.classList.add("leaving"), 250);
    setTimeout(() => {
      document.body.classList.remove("pre-start");
      document.body.classList.add("started");
      if (!mapInitialized) {
        initMap();
        mapInitialized = true;
      }
    }, 700);
  });
}

function initMap() {
  const viewport = document.getElementById("mapViewport");
  const wrap = document.getElementById("courseWrap");

  function setZoom(newZoom, anchorX, anchorY) {
    const rect = viewport.getBoundingClientRect();
    const minCoverZoom = Math.max(rect.width / BASE_W, rect.height / BASE_H);
    const effectiveMin = Math.max(MIN_ZOOM, minCoverZoom);
    newZoom = Math.min(MAX_ZOOM, Math.max(effectiveMin, newZoom));
    if (anchorX === undefined) {
      anchorX = rect.left + rect.width / 2;
      anchorY = rect.top + rect.height / 2;
    }

    const contentX = viewport.scrollLeft + (anchorX - rect.left);
    const contentY = viewport.scrollTop + (anchorY - rect.top);
    const ratioX = contentX / (BASE_W * zoom);
    const ratioY = contentY / (BASE_H * zoom);

    zoom = newZoom;
    wrap.style.width = BASE_W * zoom + "px";
    wrap.style.height = BASE_H * zoom + "px";

    const maxScrollLeft = BASE_W * zoom - rect.width;
    const maxScrollTop = BASE_H * zoom - rect.height;
    const nextScrollLeft = ratioX * (BASE_W * zoom) - (anchorX - rect.left);
    const nextScrollTop = ratioY * (BASE_H * zoom) - (anchorY - rect.top);
    viewport.scrollLeft = Math.min(Math.max(nextScrollLeft, 0), Math.max(maxScrollLeft, 0));
    viewport.scrollTop = Math.min(Math.max(nextScrollTop, 0), Math.max(maxScrollTop, 0));
  }

  // Mouse wheel zoom, centered on the cursor.
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    setZoom(zoom * factor, e.clientX, e.clientY);
  }, { passive: false });

  // Click-and-drag panning (mouse).
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0, scrollStartX = 0, scrollStartY = 0;

  viewport.addEventListener("mousedown", (e) => {
    if (e.target.closest(".flag-btn")) return;
    e.preventDefault();
    isDragging = true;
    viewport.classList.add("grabbing");
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    scrollStartX = viewport.scrollLeft;
    scrollStartY = viewport.scrollTop;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    viewport.scrollLeft = scrollStartX - (e.clientX - dragStartX);
    viewport.scrollTop = scrollStartY - (e.clientY - dragStartY);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    viewport.classList.remove("grabbing");
  });

  // Touch: one-finger pan, two-finger pinch zoom.
  let touchMode = null;
  let pinchStartDist = 0;
  let pinchStartZoom = 1;
  let panStartX = 0, panStartY = 0, panScrollX = 0, panScrollY = 0;

  function touchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1 && !e.target.closest(".flag-btn")) {
      touchMode = "pan";
      panStartX = e.touches[0].clientX;
      panStartY = e.touches[0].clientY;
      panScrollX = viewport.scrollLeft;
      panScrollY = viewport.scrollTop;
    } else if (e.touches.length === 2) {
      touchMode = "pinch";
      pinchStartDist = touchDist(e.touches);
      pinchStartZoom = zoom;
    }
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    if (touchMode === "pan" && e.touches.length === 1) {
      e.preventDefault();
      viewport.scrollLeft = panScrollX - (e.touches[0].clientX - panStartX);
      viewport.scrollTop = panScrollY - (e.touches[0].clientY - panStartY);
    } else if (touchMode === "pinch" && e.touches.length === 2) {
      e.preventDefault();
      const dist = touchDist(e.touches);
      const mid = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
      setZoom(pinchStartZoom * (dist / pinchStartDist), mid.x, mid.y);
    }
  }, { passive: false });

  viewport.addEventListener("touchend", () => {
    touchMode = null;
  });

  // Flags: minimal navigation feedback (highlight + HUD label + placeholder overlay).
  const overlayScrim = document.getElementById("overlayScrim");
  const contentCard = document.getElementById("contentCard");
  const cardBody = document.getElementById("cardBody");
  const closeCard = document.getElementById("closeCard");

  function openCard(label, hole) {
    contentCard.classList.toggle("wide", hole === "home");
    if (hole === "home") {
      cardBody.innerHTML = buildHeroCarouselHTML();
      initHeroCarousel();
    } else {
      cardBody.innerHTML = `<span class="eyebrow">${label}</span><h2>${label}</h2><p>Content for this page is coming soon.</p>`;
    }
    overlayScrim.classList.add("show");
    contentCard.classList.add("show");
  }

  function closeOverlay() {
    overlayScrim.classList.remove("show");
    contentCard.classList.remove("show");
  }

  function selectHole(hole) {
    const btn = document.querySelector(`.flag-btn[data-hole="${hole}"]`);
    if (btn) btn.click();
  }
  window.goToHole = selectHole;

  document.querySelectorAll(".flag-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".flag-btn.current").forEach((b) => b.classList.remove("current"));
      btn.classList.add("current");

      const label = btn.querySelector(".hint").textContent;
      const currentLabel = document.getElementById("currentLabel");
      if (currentLabel) currentLabel.textContent = label.toUpperCase();

      openCard(label, btn.dataset.hole);
    });
  });

  closeCard.addEventListener("click", closeOverlay);
  overlayScrim.addEventListener("click", closeOverlay);
}

async function initSite() {
  await Promise.all([
    loadPartial("site-header", "header.html"),
    loadPartial("site-footer", "footer.html")
  ]);

  initLanding();
}

document.addEventListener("DOMContentLoaded", initSite);
