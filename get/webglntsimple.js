function removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) element.remove();
    return !!element;
}

const selector = '.ReactModal__Overlay';
const interval = setInterval(() => {
    if (removeElement(selector)) clearInterval(interval);
}, 100);

class WebGLnt {
    getInfo() {
        return {
            id: 'webglnt',
            name: 'WebGLn\'t Loader',
        };
    }
}

Scratch.extensions.register(new WebGLnt());