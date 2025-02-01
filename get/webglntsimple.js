function waitForElement(selector, callback, timeout = 5000) {
    const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
        observer.disconnect();
        if (!document.querySelector(selector)) {
            console.error(`Error: Element "${selector}" not found within ${timeout}ms`);
        }
    }, timeout);
}

function removeElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.remove();
        console.log(`Removed element: ${selector}`);
    } else {
        console.error(`Error: Failed to remove "${selector}" (not found)`);
    }
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