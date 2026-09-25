const revealElements = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("visible")) {
      element.classList.add("reveal-pending");
      revealObserver.observe(element);
    }
  });
}

const canUseCustomCursor =
  window.matchMedia("(pointer: fine)").matches &&
  !prefersReducedMotion;

if (canUseCustomCursor && window.MouseFollower && window.gsap) {
  window.MouseFollower.registerGSAP(window.gsap);
  const cursor = new window.MouseFollower({
    container: document.body,
    speed: 0.48,
    skewing: 2.2,
    skewingDelta: 0.001,
    skewingDeltaMax: 0.22,
    stickDelta: 0.2,
  });

  const cursorElement = document.querySelector(".mf-cursor");
  const updateCursorVisibility = () => {
    document.documentElement.classList.toggle(
      "has-custom-cursor",
      Boolean(cursorElement && getComputedStyle(cursorElement).position === "fixed")
    );
  };
  updateCursorVisibility();
  window.addEventListener("load", updateCursorVisibility, { once: true });

  document.querySelectorAll(".cta-row a").forEach((button) => {
    button.setAttribute("data-cursor-stick", "");
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.setAttribute("data-cursor", "-opaque");
  });

  // Keep a stable reference for potential future interactions.
  window.__mfCursor = cursor;
}
