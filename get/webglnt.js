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
                    hideFromPalette: true,
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

// Draw Sprites on Canvas
function drawSprites() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get sprites (ignore stage)
    const sprites = Scratch.vm.runtime.targets.filter(target => !target.isStage);

    sprites.forEach(sprite => {
        // Check if the sprite is visible
        if (!sprite.visible) return; // Skip drawing if the sprite is hidden

        const x = canvas.width / 2 + sprite.x;
        const y = canvas.height / 2 - sprite.y; // Flip Y
        const size = sprite.size;
        const angle = sprite.direction * (Math.PI / 180);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = 'blue';  // Placeholder: Draw a blue square instead of the costume
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
    });

    requestAnimationFrame(drawSprites);
}

drawSprites(); // Start the loop