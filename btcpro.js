(function () {

    // Kill watermark
    function killWatermark() {
        document.querySelectorAll('.user-overlay').forEach(el => {
            el.remove();
        });
    }

   
