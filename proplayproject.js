// ==UserScript==
// @name         Hide RWITC Watermark
// @match        https://play.rwitc.com/*
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // Inject CSS immediately
    const style = document.createElement("style");
    style.textContent = `
        #wm {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
    `;
    document.documentElement.appendChild(style);

    // Keep hiding if the site recreates it
    const hide = () => {
        const wm = document.getElementById("wm");
        if (wm) {
            wm.style.display = "none";
            wm.style.visibility = "hidden";
            wm.style.opacity = "0";
        }
    };

    hide();
    new MutationObserver(hide).observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
