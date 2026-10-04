// ==UserScript==
// @name         Live.rhpsl.com - Picture in Picture
// @namespace    https://github.com/
// @version      1.0.0
// @description  Add a Picture-in-Picture button to the live video player
// @match        https://live.rhpsl.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    function addPiPButton() {

        const video = document.querySelector('video');

        if (!video) {
            return;
        }

        // Don't create duplicate buttons
        if (document.getElementById('custom-pip-button')) {
            return;
        }

        const btn = document.createElement('button');

        btn.id = 'custom-pip-button';
        btn.textContent = '📺 PiP';

        btn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            padding: 10px 16px;
            background: black;
            color: white;
            border: 1px solid white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-family: Arial, sans-serif;
        `;

        btn.onclick = async () => {

            try {

                if (document.pictureInPictureElement) {

                    await document.exitPictureInPicture();
                    btn.textContent = '📺 PiP';

                } else {

                    await video.requestPictureInPicture();
                    btn.textContent = '❌ Exit PiP';

                }

            } catch (e) {

                console.error('PiP error:', e);

            }

        };

        document.body.appendChild(btn);

        console.log('PiP button added');
    }

    // Initial attempt
    addPiPButton();

    // Player may load dynamically, so keep checking
    const observer = new MutationObserver(() => {
        addPiPButton();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
