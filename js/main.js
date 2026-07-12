// =============================================================================
// Stats Counter
// =============================================================================
const statsSection = document.querySelector(".stats");
if (statsSection) {
  const targets = [60, 34, 5, 5];
  const ids = ["s1", "s2", "s3", "s4"];
  let done = false;
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        targets.forEach((t, i) => {
          let c = 0;
          const step = Math.ceil(t / 40);
          const iv = setInterval(() => {
            c = Math.min(c + step, t);
            const el = document.getElementById(ids[i]);
            if (el) el.textContent = c + "+";
            if (c >= t) clearInterval(iv);
          }, 40);
        });
      }
    },
    { threshold: 0.3 },
  );
  obs.observe(statsSection);
}
