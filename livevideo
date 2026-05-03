(function () {
  function removeWatermark() {
    const el = document.getElementById('watermark-layer');
    if (el) el.remove();
  }

  // Remove immediately on load
  removeWatermark();

  // Watch DOM changes and keep removing it
  const observer = new MutationObserver(() => {
    removeWatermark();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
