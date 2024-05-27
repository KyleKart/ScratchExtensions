class webglnt {
    getInfo() {
        return {
            id: 'webglnt',
            name: 'WebGL Modal Removed!',
            blocks: [
                {
                    blockType: 'label',
                    text: "Use this for permanent removal!"
                  },
                {
                    opcode: "removeModal",
                    blockType: "reporter",
                    text: "WebGLn\'t",
                }
            ]
        };
    }
}
Scratch.extensions.register(new webglnt());
function removeElement(selector) {
    const element = document.querySelector(selector);
    return element && (element.outerHTML = '', !0);
}
const selectors = ['.scratchCategoryMenuItem.scratchCategoryId-webglnt', '.ReactModal__Overlay.ReactModal__Overlay--after-open.browser-modal_modal-overlay_3TDyF'];
selectors.forEach(selector => {
    const interval = setInterval(() => {
        removeElement(selector) && clearInterval(interval);
    }, 100);
});
