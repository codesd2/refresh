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
