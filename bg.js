(() => {
  const background = document.getElementById("landscape-bg");

  if (!background) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let scheduled = false;

  function updateBackground() {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      maxScroll > 0
        ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
        : 0;

    const travel = Math.max(
      0,
      background.getBoundingClientRect().width - window.innerWidth
    );

    const offset = reducedMotion.matches
      ? travel / 2
      : progress * travel;

    background.style.transform = `translateX(${-offset}px)`;

    scheduled = false;
  }

  function requestUpdate() {
    if (scheduled) return;

    scheduled = true;
    window.requestAnimationFrame(updateBackground);
  }

  window.addEventListener("scroll", requestUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate);

  reducedMotion.addEventListener("change", requestUpdate);

  updateBackground();
})();
