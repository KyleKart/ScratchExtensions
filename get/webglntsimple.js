function removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) element.remove();
    return !!element;
}

const selector = '.ReactModal__Overlay.ReactModal__Overlay--after-open.browser-modal_modal-overlay_3TDyF';
const interval = setInterval(() => {
    if (removeElement(selector)) clearInterval(interval);
}, 100);