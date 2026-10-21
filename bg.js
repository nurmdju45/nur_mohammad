// Animated terrain-contour background (Earth-surface / topographic feel)
(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, t = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const LINES = 36, STEP = 14;
  function elevation(x, i, t) {
    return Math.sin(x * 0.004 + i * 0.35 + t * 0.6) * 22 +
           Math.sin(x * 0.011 - i * 0.2 + t * 0.9) * 12 +
           Math.sin(x * 0.0025 + t * 0.3) * 30;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const gap = h / (LINES - 4);
    for (let i = 0; i < LINES; i++) {
      const baseY = i * gap;
      ctx.beginPath();
      for (let x = 0; x <= w + STEP; x += STEP) {
        const y = baseY + elevation(x, i, t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const green = i % 5 === 0;
      ctx.strokeStyle = green ? 'rgba(46,139,110,0.28)' : 'rgba(31,74,168,0.14)';
      ctx.lineWidth = green ? 1.6 : 1;
      ctx.stroke();
    }
    t += 0.008;
    if (!reduce) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); if (reduce) draw(); });
  resize();
  draw();
})();
