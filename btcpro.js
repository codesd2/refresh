(function () {

    // =========================
    // BLOCK PAGE REFRESH
    // =========================

    window.onbeforeunload = null;

    // Remove meta refresh tags
    document.querySelectorAll('meta[http-equiv="refresh"]').forEach(el => {
        el.remove();
    });

    // Block manual reload
    try {
        window.location.reload = function () {
            console.log("Reload blocked");
        };
    } catch (e) {}

    // Block reload intervals
    const originalSetInterval = window.setInterval;

    window.setInterval = function (fn, time) {

        try {

            const code = fn.toString();

            if (
                code.includes("reload") ||
                code.includes("location") ||
                code.includes("refresh")
            ) {
                console.log("Refresh interval blocked");
                return null;
            }

        } catch (e) {}

        return originalSetInterval(fn, time);
    };

    // =========================
    // HIDE OVERLAY
    // =========================

    function hideOverlay() {

        document.querySelectorAll('[class*="user-overlay"]').forEach(el => {

            el.style.cssText = `
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            `;

        });

        requestAnimationFrame(hideOverlay);
    }

    hideOverlay();

})();
