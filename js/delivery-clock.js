// Delivery clock: shows a countdown to today's dispatch cutoff (5 PM IST)
(function () {
  const targets = document.querySelectorAll("[data-delivery-clock]");
  if (!targets.length) return;

  function getTimeUntilCutoff() {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setHours(17, 0, 0, 0); // 5 PM
    if (now >= cutoff) {
      cutoff.setDate(cutoff.getDate() + 1);
    }
    const diff = cutoff - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function tick() {
    const timeStr = getTimeUntilCutoff();
    targets.forEach((el) => { el.textContent = timeStr; });
  }

  tick();
  setInterval(tick, 1000);
})();
