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
