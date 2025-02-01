function waitForElement(selector, callback) {
    const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) element.remove();
}

const selector = '.ReactModal__Overlay';
waitForElement(selector, () => removeElement(selector));

class WebGLnt {
    getInfo() {
        return {
            id: 'webglnt',
            name: 'WebGLn\'t Loader',
        };
    }
}

Scratch.extensions.register(new WebGLnt());