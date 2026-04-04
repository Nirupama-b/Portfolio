const revealElements = document.querySelectorAll("[data-reveal]");

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
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  if (!element.classList.contains("visible")) {
    revealObserver.observe(element);
  }
});

const canUseCustomCursor =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  document.querySelectorAll(".cta-row a").forEach((button) => {
    button.setAttribute("data-cursor-stick", "");
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.setAttribute("data-cursor", "-opaque");
  });

  // Keep a stable reference for potential future interactions.
  window.__mfCursor = cursor;
}
