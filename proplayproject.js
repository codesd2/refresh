// ==UserScript==
// @name         Hide WM
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://play.rwitc.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function hideWM() {
        const wm = document.getElementById('wm');
        if (wm) {
            wm.style.display = 'none';
        }
    }

    hideWM();

    // Keep hiding it if the page recreates it.
    const observer = new MutationObserver(hideWM);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
