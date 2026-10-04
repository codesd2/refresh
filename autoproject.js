const video = document.querySelector('video');

const btn = document.createElement('button');
btn.textContent = '📺DISABLE📺';
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
`;

btn.onclick = async () => {
    try {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            await video.requestPictureInPicture();
        }
    } catch (e) {
        console.error('PiP error:', e);
    }
};

document.body.appendChild(btn);
