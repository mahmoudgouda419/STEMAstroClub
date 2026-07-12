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

(function () {
  const tabs = document.querySelectorAll(".gtab");
  const indicator = document.querySelector(".gtab-indicator");
  if (!tabs.length || !indicator) return; // All panel ids in order — direction is determined by index comparison

  const panelOrder = ["workshops", "astrophoto"];
  let current = "workshops";
  let animating = false;

  function switchTab(next) {
    if (next === current || animating) return;
    animating = true;

    const fromIdx = panelOrder.indexOf(current);
    const toIdx = panelOrder.indexOf(next);
    const goRight = toIdx > fromIdx; // moving to a later panel = slide in from right

    const outPanel = document.getElementById("panel-" + current);
    const inPanel = document.getElementById("panel-" + next); // 1. Move indicator pill

    indicator.classList.toggle("slide-right", goRight); // 2. Active tab highlight

    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === next)); // 3. Position incoming panel just off-screen (no transition yet)

    inPanel.style.transition = "none";
    inPanel.style.transform = goRight
      ? "translateX(100%)"
      : "translateX(-100%)";
    inPanel.style.opacity = "0";
    inPanel.style.position = "absolute";
    inPanel.style.top = "0";
    inPanel.style.left = "0";
    inPanel.style.width = "100%";
    inPanel.style.pointerEvents = "none"; // Force reflow — makes the browser register the starting position

    void inPanel.offsetWidth; // 4. Slide both panels simultaneously

    const TRANSITION =
      "opacity 0.38s ease, transform 0.38s cubic-bezier(0.4,0,0.2,1)"; // outgoing slides away

    outPanel.style.transition = TRANSITION;
    outPanel.style.transform = goRight
      ? "translateX(-100%)"
      : "translateX(100%)";
    outPanel.style.opacity = "0";
    outPanel.style.position = "absolute";
    outPanel.style.top = "0";
    outPanel.style.left = "0";
    outPanel.style.width = "100%";
    outPanel.style.pointerEvents = "none"; // incoming slides in

    inPanel.style.transition = TRANSITION;
    inPanel.style.transform = "translateX(0)";
    inPanel.style.opacity = "1"; // 5. After transition: make inPanel the layout owner, clean up outPanel

    setTimeout(() => {
      // Reset outgoing to hidden default (off right so it enters correctly next time)
      outPanel.style.transition = "none";
      outPanel.style.transform = goRight
        ? "translateX(100%)"
        : "translateX(-100%)";
      outPanel.style.opacity = "0";
      outPanel.style.position = "absolute";
      outPanel.style.pointerEvents = "none";
      outPanel.classList.remove("active"); // Make incoming the flow element

      inPanel.style.transition = "";
      inPanel.style.transform = "";
      inPanel.style.opacity = "";
      inPanel.style.position = "relative";
      inPanel.style.top = "";
      inPanel.style.left = "";
      inPanel.style.width = "";
      inPanel.style.pointerEvents = "";
      inPanel.classList.add("active");

      current = next;
      animating = false;
    }, 420);
  } // Init: ensure only workshops is visible, astrophoto is hidden off-right

  const initOut = document.getElementById("panel-astrophoto");
  if (initOut) {
    initOut.style.transition = "none";
    initOut.style.transform = "translateX(100%)";
    initOut.style.opacity = "0";
    initOut.style.position = "absolute";
    initOut.style.pointerEvents = "none";
    initOut.classList.remove("active");
  }
  const initIn = document.getElementById("panel-workshops");
  if (initIn) {
    initIn.style.position = "relative";
    initIn.style.transform = "";
    initIn.style.opacity = "";
    initIn.style.pointerEvents = "";
    initIn.classList.add("active");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });
})();



// Smooth Scroll


document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id === "#") return;
    const t = document.querySelector(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// Navbar Shrink on Scroll

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (nav) nav.classList.toggle("nav-scrolled", window.scrollY > 50);
});
