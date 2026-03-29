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

const canvas = document.querySelector('.vjs-secure-watermark-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage = () => {};
  ctx.fillText = () => {};
  ctx.fillRect = () => {};
}
