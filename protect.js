const killPlayer = () => {
const el = document.getElementById("playernew");
if (el) el.remove();
};

killPlayer();

const observer = new MutationObserver(killPlayer);
observer.observe(document.body, { childList: true, subtree: true });
