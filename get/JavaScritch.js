function goToXY(X, Y, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const xy = { X: X, Y: Y };
  console.log(xy);
  console.log(target);
  vm.runtime.ext_scratch3_motion.goToXY(xy, { target });
}

function changeX(X, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const xChange = { DX: X };
  console.log(xChange);
  console.log(target);
  vm.runtime.ext_scratch3_motion.changeX(xChange, { target });
}

function changeY(Y, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const yChange = { DY: Y };
  console.log(yChange);
  console.log(target);
  vm.runtime.ext_scratch3_motion.changeY(yChange, { target });
}

function sayforsecs(say, secs, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const sayParams = { MESSAGE: say, SECS: secs };
  console.log(sayParams);
  console.log(target);
  vm.runtime.ext_scratch3_looks.sayforsecs(sayParams, { target });
}

function setRotationStyle(style, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const rotationParams = { STYLE: style };
  console.log(rotationParams);
  console.log(target);
  vm.runtime.ext_scratch3_motion.setRotationStyle(rotationParams, { target });
}

function setSize(size, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const sizeParams = { SIZE: size };
  console.log(sizeParams);
  console.log(target);
  vm.runtime.ext_scratch3_looks.setSize(sizeParams, { target });
}

function playSound(sound, name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const soundParams = { SOUND_MENU: sound };
  console.log(soundParams);
  console.log(target);
  vm.runtime.ext_scratch3_sound.playSound(soundParams, { target });
}

function stopAllSounds(name) {
  const target = vm.runtime.getSpriteTargetByName(name);
  const emptyParams = {};
  console.log(emptyParams);
  console.log(target);
  vm.runtime.ext_scratch3_sound.stopAllSounds(emptyParams, { target });
}

    // Dynamically load Ace Editor library
    const aceScript = document.createElement('script');
    aceScript.src = 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.7/src-min-noconflict/ace.js';
    document.head.appendChild(aceScript);

    // Wait for Ace Editor library to load
    aceScript.onload = () => {
      // Dynamically load Ace Editor theme
      const themeScript = document.createElement('script');
      themeScript.src = 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.7/src-min-noconflict/theme-chrome.min.js';
      document.head.appendChild(themeScript);

      // Dynamically load Ace Editor CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.7/css/ace.min.css';
      document.head.appendChild(cssLink);

      // Apply additional CSS styles dynamically
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .green-go {
          width: 2rem;
          height: 2rem;
          padding: 0.375rem;
          border-radius: 0.25rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          user-drag: none;
          cursor: pointer;
        }
      `;
      document.head.appendChild(styleElement);

      // Wait for all scripts to load before creating the Ace Editor instance
      Promise.all([
        new Promise((resolve) => themeScript.onload = resolve),
        new Promise((resolve) => cssLink.onload = resolve)
      ]).then(() => {
        // Now you can safely create an Ace Editor instance
        const existingDiv = document.querySelector('.react-tabs_react-tabs__tab-panel_3p4DW');

        // Remove existing content
        existingDiv.innerHTML = '';

        // Create a new container for the Ace Editor
        const container = document.createElement('div');
        container.id = 'editor-container';
        container.style.height = '100%';
        container.style.width = '100%';
        existingDiv.appendChild(container);

        const editor = ace.edit(container);
        editor.setTheme("ace/theme/chrome");

        // Function to get text from Ace Editor and evaluate it
        function evaluateCode() {
          const code = editor.getValue();
          console.log("Text from Ace Editor:", code);

          try {
            // Use eval() (or Function) to execute the code
          eval(code);
          } catch (error) {
            console.error("Error evaluating code:", error);
          }
        }

        // Create a new img tag with the added CSS class
        const newImg = document.createElement('img');
        newImg.className = 'green-go';
        newImg.draggable = false;
        newImg.src = 'static/assets/e73c3c9d236267ba684bc3817e62ae5f.svg';
        newImg.title = 'Go';
        newImg.style.cursor = 'pointer';

        // Add onClick event to trigger evaluateCode()
        newImg.addEventListener('click', evaluateCode);

        // Append the new img tag to the controls container
        const controlsContainer = document.querySelector('.controls_controls-container_2xinB');

        // Remove existing content in controls container
        controlsContainer.innerHTML = '';

        // Append the new img tag to the controls container
        controlsContainer.appendChild(newImg);
      });
    };

class jscritch {
    getInfo() {
      return {
        id: 'javascritch',
        name: 'JavaScritch',
        blocks: [
          {
            opcode: 'JS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'JavaScritch [code]',
            arguments: {
            code: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          }
        ],
    }

    }
    JS(args) {
    eval(args.code)
    }

  }
  Scratch.extensions.register(new jscritch());