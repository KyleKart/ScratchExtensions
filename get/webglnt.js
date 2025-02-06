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
                    hideFromPalette: false,
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

if (targetDiv) {
    const canvas = document.createElement('canvas');
    canvas.id = 'scratchCanvas';
    canvas.width = 480;
    canvas.height = 360;
    canvas.style.border = '1px solid black';

    targetDiv.parentNode.insertBefore(canvas, targetDiv.nextSibling);
}

function drawSprites() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sprites = Scratch.vm.runtime.targets.filter(target => !target.isStage);

    sprites.forEach(sprite => {
        const x = canvas.width / 2 + sprite.x;
        const y = canvas.height / 2 - sprite.y;
        const size = sprite.size;
        const angle = (90 - sprite.direction) * (Math.PI / 180);

        const costume = sprite.getCurrentCostume().asset.encodeDataURI();
        if (!costume) return;
        const img = new Image();
        img.src = costume;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-angle);

            const width = img.width * size / 100;
            const height = img.height * size / 100;
            ctx.drawImage(img, -width / 2, -height / 2, width, height);

            ctx.restore();

    });

    requestAnimationFrame(drawSprites);
}

drawSprites();