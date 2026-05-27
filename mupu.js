(function () {

    function hideOverlay() {

        const el = document.getElementById('playernew');

        if (el) {
            el.style.cssText = `
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            `;
        }

        requestAnimationFrame(hideOverlay);
    }

    hideOverlay();

})();
