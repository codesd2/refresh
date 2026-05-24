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

(function () {

    console.log("Auto logout blocker active");

    // =========================
    // KEEP SESSION ALIVE
    // =========================

    function keepSessionAlive() {

        try {

            // Simulate mouse movement
            document.dispatchEvent(new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                view: window
            }));

            // Simulate keyboard activity
            document.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'Shift'
            }));

            // Trigger focus event
            window.dispatchEvent(new Event('focus'));

            console.log("Session refreshed");

        } catch (e) {
            console.log("Keep alive error:", e);
        }
    }

    // Run every 20 seconds
    setInterval(keepSessionAlive, 20000);

    // =========================
    // BLOCK LOGOUT REDIRECTS
    // =========================

    const originalAssign = window.location.assign;
    const originalReplace = window.location.replace;

    window.location.assign = function (url) {

        if (
            url.includes("logout") ||
            url.includes("expired") ||
            url.includes("session")
        ) {

            console.log("Logout redirect blocked:", url);
            return;
        }

        return originalAssign.call(window.location, url);
    };

    window.location.replace = function (url) {

        if (
            url.includes("logout") ||
            url.includes("expired") ||
            url.includes("session")
        ) {

            console.log("Logout replace blocked:", url);
            return;
        }

        return originalReplace.call(window.location, url);
    };

})();
