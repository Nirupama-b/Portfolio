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

const photoPreview = document.getElementById("experience-photo-preview");
const photoDialog = document.getElementById("experience-photo-dialog");
const photoRows = document.querySelectorAll(".experience-item[data-photo-caption]");
const canHoverPhotos = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");

if (photoPreview && photoDialog && typeof photoDialog.showModal === "function") {
  const previewImage = photoPreview.querySelector("img");
  const dialogImage = photoDialog.querySelector("img");
  let showTimer;
  let hideTimer;
  let photoOpener;

  const hidePreview = () => {
    window.clearTimeout(showTimer);
    window.clearTimeout(hideTimer);
    photoPreview.hidden = true;
  };

  const scheduleHide = () => {
    window.clearTimeout(showTimer);
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hidePreview, 180);
  };

  const showPreview = (row, pointerY) => {
    if (!canHoverPhotos.matches || photoDialog.open) return;
    previewImage.src = row.querySelector(".experience-photo-link").href;
    photoPreview.querySelector("p").textContent = row.dataset.photoCaption;
    photoPreview.hidden = false;

    const bounds = row.getBoundingClientRect();
    const spaceBesideRow = window.innerWidth - bounds.right - 32;
    const fitsBesideRow = spaceBesideRow >= 220;
    photoPreview.style.width = `${fitsBesideRow ? Math.floor(Math.min(260, spaceBesideRow)) : 260}px`;
    const width = photoPreview.offsetWidth;
    const height = photoPreview.offsetHeight;
    const right = bounds.right + 16;
    const left = fitsBesideRow ? right : bounds.right - width - 12;
    const top = Math.min(pointerY - 60, window.innerHeight - height - 16);
    photoPreview.style.left = `${Math.max(16, left)}px`;
    photoPreview.style.top = `${Math.max(16, top)}px`;
  };

  photoRows.forEach((row) => {
    const link = row.querySelector(".experience-photo-link");
    link.setAttribute("aria-haspopup", "dialog");
    link.setAttribute("aria-controls", photoDialog.id);

    row.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !canHoverPhotos.matches || photoDialog.open) return;
      hidePreview();
      showTimer = window.setTimeout(() => showPreview(row, event.clientY), 220);
    });
    row.addEventListener("pointerleave", scheduleHide);

    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      hidePreview();
      photoOpener = link;
      dialogImage.src = link.href;
      dialogImage.alt = row.dataset.photoAlt;
      document.getElementById("photo-dialog-title").textContent = row.dataset.photoCaption;
      photoDialog.showModal();
      document.body.classList.add("photo-open");
    });
  });

  photoPreview.addEventListener("pointerenter", () => window.clearTimeout(hideTimer));
  photoPreview.addEventListener("pointerleave", scheduleHide);
  previewImage.addEventListener("error", hidePreview);
  photoDialog.querySelector(".photo-close").addEventListener("click", () => photoDialog.close());
  photoDialog.addEventListener("click", (event) => {
    const bounds = photoDialog.getBoundingClientRect();
    if (event.target === photoDialog && (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    )) photoDialog.close();
  });
  photoDialog.addEventListener("close", () => {
    document.body.classList.remove("photo-open");
    photoOpener?.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hidePreview();
  });
  window.addEventListener("scroll", hidePreview, { passive: true });
  window.addEventListener("resize", hidePreview);
}
