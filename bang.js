(function () {

    console.log("Protection script loaded");

    // =========================
    // REMOVE WATERMARK
    // =========================
    function killWatermark() {

        const selectors = [
            '.user-overlay',
            '#watermarkOverlay',
            '.watermark',
            '.overlay',
            '.vjs-secure-watermark-canvas'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.remove();
            });
        });
    }

    // =========================
    // BLOCK AUTO LOGOUT
    // =========================

    // Fake user activity
    function keepSessionAlive() {

        try {

            document.dispatchEvent(new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                view: window
            }));

            document.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'Shift'
            }));

            window.dispatchEvent(new Event('focus'));
            window.dispatchEvent(new Event('mousemove'));

            console.log("Session kept alive");

        } catch (e) {
            console.log("Keep alive error:", e);
        }
    }

    // Run every 20 seconds
    setInterval(keepSessionAlive, 20000);

    // =========================
    // BLOCK REFRESH / RELOAD
    // =========================

    window.onbeforeunload = null;

    // Remove meta refresh
    document.querySelectorAll('meta[http-equiv="refresh"]').forEach(el => {
        el.remove();
    });

    // Safe reload block
    try {

        const originalReload = window.location.reload;

        Object.defineProperty(window.location, 'reload', {
            configurable: false,
            writable: false,
            value: function () {
                console.log("Reload blocked");
            }
        });

    } catch (e) {
        console.log("Reload protection fallback active");
    }

    // =========================
    // BLOCK LOGOUT REDIRECTS
    // =========================

    const originalAssign = window.location.assign;
    const originalReplace = window.location.replace;

    window.location.assign = function (url) {

        if (
            url.includes("logout") ||
            url.includes("session") ||
            url.includes("expired") ||
            url.includes("login")
        ) {

            console.log("Logout redirect blocked:", url);
            return;
        }

        return originalAssign.call(window.location, url);
    };

    window.location.replace = function (url) {

        if (
            url.includes("logout") ||
            url.includes("session") ||
            url.includes("expired") ||
            url.includes("login")
        ) {

            console.log("Logout replace blocked:", url);
            return;
        }

        return originalReplace.call(window.location, url);
    };

    // =========================
    // BLOCK REFRESH INTERVALS
    // =========================

    const originalSetInterval = window.setInterval;

    window.setInterval = function (fn, time) {

        try {

            const fnText = fn.toString();

            if (
                fnText.includes("reload") ||
                fnText.includes("logout") ||
                fnText.includes("location")
            ) {

                console.log("Blocked suspicious interval");
                return null;
            }

        } catch (e) {}

        return originalSetInterval(fn, time);
    };

    // =========================
    // CONTINUOUS PROTECTION
    // =========================

    killWatermark();

    setInterval(() => {
        killWatermark();
        keepSessionAlive();
    }, 500);

    // =========================
    // DOM OBSERVER
    // =========================

    const observer = new MutationObserver(() => {
        killWatermark();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
