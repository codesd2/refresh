(function () {

    // ===== Kill watermark overlays =====
    function killWatermark() {

        // Remove overlay elements
        document.querySelectorAll('.user-overlay').forEach(el => {
            el.remove();
        });

        // Hide overlays using CSS
        if (!document.getElementById("wm-style")) {
            const style = document.createElement("style");
            style.id = "wm-style";
            style.innerHTML = `
                .user-overlay,
                .vjs-secure-watermark-canvas {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Disable canvas watermark drawing
        const canvas = document.querySelector('.vjs-secure-watermark-canvas');

        if (canvas && !canvas.__patched) {

            canvas.__patched = true;

            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage = () => {};
                ctx.fillText = () => {};
                ctx.fillRect = () => {};
                ctx.strokeText = () => {};
                ctx.stroke = () => {};
                ctx.fill = () => {};
            }

            console.log("[watermark] canvas neutralized");
        }
    }

    // ===== Prevent refresh/reload =====

    // Disable before unload
    window.onbeforeunload = null;

    // Remove meta refresh tags
    document.querySelectorAll('meta[http-equiv="refresh"]').forEach(el => {
        el.remove();
    });

    // Block reload
    try {
        window.location.reload = function () {
            console.log("Reload blocked");
        };
    } catch (e) {}

    // Block reload intervals
    const originalSetInterval = window.setInterval;

    window.setInterval = function (fn, time) {

        if (
            typeof fn === "string" &&
            fn.toLowerCase().includes("reload")
        ) {
            console.log("Blocked reload interval");
            return null;
        }

        return originalSetInterval(fn, time);
    };

    // ===== Force page active =====

    try {

        Object.defineProperty(document, 'hidden', {
            get: () => false
        });

        Object.defineProperty(document, 'visibilityState', {
            get: () => 'visible'
        });

        document.hasFocus = () => true;

    } catch (e) {}

    // Block visibility events
    ['visibilitychange', 'blur', 'focus'].forEach(event => {

        window.addEventListener(event, e => {
            e.stopImmediatePropagation();
        }, true);

    });

    // ===== Keep video playing =====

    setInterval(() => {

        document.querySelectorAll('video').forEach(v => {

            if (v.paused) {
                v.play().catch(() => {});
            }

        });

    }, 1000);

    // Optional pause block
    const originalPause = HTMLMediaElement.prototype.pause;

    HTMLMediaElement.prototype.pause = function () {
        console.log("Pause blocked");
    };

    // ===== Initial run =====

    killWatermark();

    // ===== Continuous monitor =====

    setInterval(killWatermark, 500);

    const observer = new MutationObserver(() => {
        killWatermark();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    console.log("Protection bypass active");

})();
