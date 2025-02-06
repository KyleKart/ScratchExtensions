class WebGLnt {
    getInfo() {
        return {
            id: 'webglnt',
            name: "WebGLn’t Loader",
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

    hasWebgl() {
        try {
            const canvas = document.createElement("canvas");
            return !!window.WebGLRenderingContext && !!canvas.getContext("webgl");
        } catch (e) {
            return false;
        }
    }
}

Scratch.extensions.register(new WebGLnt());

// Remove WebGL Modal
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

// Create and Insert Canvas
const targetDiv = document.querySelector('.stage-wrapper_stage-wrapper_2bejr.stage-wrapper_offset-controls_1TSoY.box_box_2jjDp');

if (targetDiv) {
    const canvas = document.createElement('canvas');
    canvas.id = 'scratchCanvas';
    canvas.width = 480;
    canvas.height = 360;
    canvas.style.border = '1px solid black';

    targetDiv.parentNode.insertBefore(canvas, targetDiv.nextSibling);
}

// Draw Sprites with Costumes on Canvas
function drawSprites() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get sprites (ignore stage)
    const sprites = Scratch.vm.runtime.targets.filter(target => !target.isStage);

    sprites.forEach(sprite => {
        const x = canvas.width / 2 + sprite.x;
        const y = canvas.height / 2 - sprite.y; // Flip Y
        const size = sprite.size;
        const angle = sprite.direction * (Math.PI / 180);

        // Get the current costume
        const costume = sprite.getCostume();
        if (!costume || !costume.baseLayer) return;

        // Create a new Image element to draw the costume
        const img = new Image();
        img.src = costume.baseLayer.dataURI;  // Use the dataURI of the costume
        img.onload = () => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            // Draw the costume on the canvas with the correct size
            const width = costume.width * size / 100;
            const height = costume.height * size / 100;
            ctx.drawImage(img, -width / 2, -height / 2, width, height);

            ctx.restore();
        };
    });

    requestAnimationFrame(drawSprites);
}

drawSprites(); // Start the loop