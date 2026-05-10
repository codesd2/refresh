(function() {
  function killWatermark() {
    const canvas = document.querySelector('.vjs-secure-watermark-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.drawImage = () => {};
      ctx.fillText = () => {};
      ctx.fillRect = () => {};
      ctx.strokeText = () => {};
      ctx.stroke = () => {};
      ctx.fill = () => {};
      console.log('[watermark] Canvas found and neutered.');
      return true;
    }
    return false;
  }

  // Try immediately
  if (!killWatermark()) {
    // If not found, watch for it
    const observer = new MutationObserver(() => {
      if (killWatermark()) {
        observer.disconnect(); // stop watching once done
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    console.log('[watermark] Watching for canvas...');
  }
})();

const killWatermark = () => {
    const el = document.getElementById("watermarkOverlay");
    if (el) el.remove();
};

killWatermark(); // Kill immediately if it exists on page load

const observer = new MutationObserver(killWatermark);
observer.observe(document.body, { childList: true, subtree: true });

(() => {
    // force visibility
    Object.defineProperty(document, 'hidden', { get: () => false });
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible' });
    document.hasFocus = () => true;

    // block visibility events
    ['visibilitychange', 'blur', 'focus'].forEach(event => {
        window.addEventListener(event, e => {
            e.stopImmediatePropagation();
        }, true);
    });

    // keep videos playing
    setInterval(() => {
        document.querySelectorAll('video').forEach(v => {
            if (v.paused) {
                v.play().catch(()=>{});
            }
        });
    }, 500);

    // override pause
    HTMLMediaElement.prototype.pause = function() {
        console.log("Pause blocked");
    };

    console.log("Background play hack active");
})();

const style = document.createElement("style");
style.innerHTML = `.user-overlay { display: none !important; }`;
document.head.appendChild(style);

(function () {

    // Kill watermark
    function killWatermark() {
        document.querySelectorAll('.user-overlay').forEach(el => {
            el.remove();
        });
    }

    // Stop page refresh/reload
    window.onbeforeunload = null;

    // Block meta refresh tags
    document.querySelectorAll('meta[http-equiv="refresh"]').forEach(el => {
        el.remove();
    });

    // Block location reload
    const originalReload = window.location.reload;
    window.location.reload = function () {
        console.log("Reload blocked");
    };

    // Block refresh intervals
    const originalSetInterval = window.setInterval;
    window.setInterval = function (fn, time) {
        if (typeof fn === "string" && fn.includes("reload")) {
            return null;
        }
        return originalSetInterval(fn, time);
    };

    // Run continuously
    killWatermark();
    setInterval(killWatermark, 300);

    // Watch dynamic DOM changes
    const observer = new MutationObserver(() => {
        killWatermark();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
