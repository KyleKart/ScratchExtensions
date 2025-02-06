class WebGLnt {
    getInfo() {
        return {
            id: 'webglnt',
            name: 'WebGLn\'t Loader',
            blocks: [
                {
                    blockType: 'label',
                    text: "WebGL Modal removed!"
                },
                {
                    opcode: "hasWebgl",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "has WebGL?",
                    hideFromPalette: true,
                },
                {
                    opcode: "noWebgl",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "save WebGL loader",
                    hideFromPalette: false,
                }
            ]
        };
    }
}

Scratch.extensions.register(new WebGLnt());

function removeElement(selector) {
    const element = document.querySelector(selector);
    return element && (element.outerHTML = '', true);
}

const selectors = ['.ReactModal__Overlay.ReactModal__Overlay--after-open.browser-modal_modal-overlay_3TDyF'];
selectors.forEach(selector => {
    const interval = setInterval(() => {
        removeElement(selector) && clearInterval(interval);
    }, 100);
});

const targetDiv = document.querySelector('.stage-wrapper_stage-wrapper_2bejr.stage-wrapper_offset-controls_1TSoY.box_box_2jjDp');

const newElement = document.createElement('div');
newElement.textContent = 'This is a new element';
newElement.classList.add('new-class'); // Add a class if needed

if (targetDiv) {
    targetDiv.parentNode.insertBefore(newElement, targetDiv.nextSibling);
}