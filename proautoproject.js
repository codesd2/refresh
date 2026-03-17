const killWatermark = () => {
    const el = document.getElementById("watermarkOverlay");
    if (el) el.remove();
};

killWatermark(); // Kill immediately if it exists on page load

const observer = new MutationObserver(killWatermark);
observer.observe(document.body, { childList: true, subtree: true });
