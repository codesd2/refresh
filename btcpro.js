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
