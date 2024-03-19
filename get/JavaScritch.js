function spriteName() {
  const currentTarget = vm.runtime.getEditingTarget();
  if (currentTarget && currentTarget.isOriginal) {
    return currentTarget.sprite.name;
  } else {
    return null;
  }
}

function goToXY(X, Y, name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const xy = { X: X, Y: Y };
  console.log(xy);
  console.log(target);
  target.setXY(value.x, value.y);
}

class SpriteReference {
  constructor(spriteName) {
    const sprite = vm.runtime.getSpriteTargetByName(spriteName);
    if (!sprite) throw new Error('sprite does not exist');

    this.sprite = sprite;
  }

  set position(value) {
    if (Array.isArray(value) && value.length === 2) {
      this.sprite.setXY(value[0], value[1]);
    } else if (typeof value === 'object' && 'x' in value && 'y' in value) {
      this.sprite.setXY(value.x, value.y);
    }
  }
  set pos(value) {
    // Reuse the position setter by calling it with the provided value
    this.position = value;
  }
  get position() {
    return { x: this.sprite.x, y: this.sprite.y };
  }
  get pos() {
    return { x: this.sprite.x, y: this.sprite.y };
  }
  set size(value) {
    if (Array.isArray(value) && value.length === 1) {
      this.sprite.setXY(value[0]);
    } else if (typeof value === 'object' && 'size' in value) {
      this.sprite.setSize(value.size);
    } else {
    this.sprite.setSize(value);
  }
  }
  get size() {
    return Math.round(this.sprite.size);
  }
  set direction(value) {
    if (Array.isArray(value) && value.length === 1) {
      this.sprite.setDirection(value[0]);
    } else if (typeof value === 'object' && 'direction' in value) {
      this.sprite.setDirection(value.direction);
    } else {
    this.sprite.setDirection(value);
  }
  }
  set dir(value) {
    this.direction = value;
  }
  get direction() {
    return this.sprite.direction;
  }
  get dir() {
    return this.sprite.direction;
  }
  set visible(value) {
    if (Array.isArray(value) && value.length === 1) {
      this.sprite.setVisible(value[0]);
    } else if (typeof value === 'object' && 'visible' in value) {
      this.sprite.setVisible(value.visible);
    } else {
    this.sprite.setVisible(value);
  }
  }
  get visible() {
    return this.sprite.visible;
  }
  
  set volume (value) {
    this.sprite.volume = value;
}

get volume() {
  return this.sprite.volume;
}
set vol (value) {
  this.sprite.volume = value;
}

get vol() {
return this.sprite.volume;
}

touching(value) {
  return this.sprite.isTouchingObject(value);
}
key (value) {
  return util.ioQuery('keyboard', 'getKeyIsDown', [value]);
}

  set dead(value) {
    if (Array.isArray(value) && value.length === 1 && value[0]) {
        vm.runtime.targets.forEach(target => {
            if (target.sprite === this.sprite) {
              vm.deleteSprite(target.id); 
            }
        });
    } 
    else if (typeof value === 'object' && 'dead' in value && value.dead) {
        vm.runtime.targets.forEach(target => {
            if (target.sprite === this.sprite) {
              vm.deleteSprite(target.id);;
            }
        });
    } 
    else if (value) {
        vm.runtime.targets.forEach(target => {
            if (target.id === this.sprite.id) {
              vm.deleteSprite(target.id);
            }
        });
    }
}

  ext(extID, funcName, args) {
    if (vm.runtime['ext_' + extID] && typeof vm.runtime['ext_' + extID][funcName] === 'function') {
      // Call the extension function with the provided arguments and target sprite
      vm.runtime['ext_' + extID][funcName](args, { target: this.sprite });
    } else {
      console.error(`Invalid extension ID or function name: "${extID}" or "${funcName}"`);
    }
  }
}

function stageClicked(callback) {
  const canvas = document.querySelector("canvas");
  canvas.addEventListener("click", () => {
    callback();
  });
}


function sprite(spriteName) {
  return new SpriteReference(spriteName);
}

function changeX(X, name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const xChange = { DX: X };
  console.log(xChange);
  console.log(target);
  vm.runtime.ext_scratch3_motion.changeX(xChange, { target });
}

function changeY(Y, name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const yChange = { DY: Y };
  console.log(yChange);
  console.log(target);
  vm.runtime.ext_scratch3_motion.changeY(yChange, { target });
}

function sayforsecs(say, secs, name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const sayParams = { MESSAGE: say, SECS: secs };
  console.log(sayParams);
  console.log(target);
  vm.runtime.ext_scratch3_looks.sayforsecs(sayParams, { target });
}

function setRotationStyle(style, name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const rotationParams = { STYLE: style };
  console.log(rotationParams);
  console.log(target);
  vm.runtime.ext_scratch3_motion.setRotationStyle(rotationParams, { target });
}

function playSound(sound, name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const soundParams = { SOUND_MENU: sound };
  console.log(soundParams);
  console.log(target);
  vm.runtime.ext_scratch3_sound.playSound(soundParams, { target });
}

function stopAllSounds(name) {
  const targetName = name || spriteName();
  const target = vm.runtime.getSpriteTargetByName(targetName);
  const emptyParams = {};
  console.log(emptyParams);
  console.log(target);
  vm.runtime.ext_scratch3_sound.stopAllSounds(emptyParams, { target });
}

    // Load scripts
    const aceScript = document.createElement('script');
    aceScript.src = 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.7/src-min-noconflict/ace.js';
    document.head.appendChild(aceScript);
    const consoleScript = document.createElement('script');
    consoleScript.src = 'https://raw.githubusercontent.com/y21/embedded-console/master/console.js';
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
        .blocklyToolboxDiv {
          display: none;
        }
        .blocklyFlyout {
          display: none;
        }
        .blocklyWorkspace {
          display: none;
        }
        .blocklyFlyoutScrollbar {
          display: none;
        }
         /* Style for the custom console */
        #console-container {
            width: 300px;
            height: 100%;
            background-color: var(--ui-secondary);
            overflow: auto;
            padding: 10px;
            font-size: 12px;
        }

        /* Style for the Ace Editor container */
        #editor-container {
            width: calc(100% - 300px);
            height: 100%;
            float: left;
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

        // Create a new container for the Ace Editor
        const container = document.createElement('div');
        container.id = 'editor-container';
        existingDiv.appendChild(container);

        const container2 = document.createElement('div');
        container2.id = 'console-container';
        existingDiv.appendChild(container2);

        // Original console reference
const originalConsole = window.console;

// Custom console object
const customConsole = {
    log: function (message) {
        // Log to the custom console
        const logElement = document.createElement('div');
        logElement.textContent = JSON.stringify(message);
        container2.appendChild(logElement);

        // Log to the original console
        originalConsole.log(message);
    },
    error: function (message) {
      // Log to the custom console
      const logElement = document.createElement('div');
      logElement.textContent = JSON.stringify(message);
      container2.appendChild(logElement);

      // Log to the original console
      originalConsole.error(message);
  },
    // You can add other console methods like warn, error, etc.
};

// Redirect global console to your custom console
window.console = customConsole;


        const editor = ace.edit(container);
        // Get the theme from Redux store
        const theme = ReduxStore.getState().scratchGui.theme.theme.gui;

                // Define a mapping to store code for each sprite
const spriteCodeMap = {};

// Function to set code for a sprite
function setSpriteCode(spriteName, code) {
  spriteCodeMap[spriteName] = code;
}

// Function to get code for a sprite
function getSpriteCode(spriteName) {
  return spriteCodeMap[spriteName] || ''; // Return code or an empty string if not found
}

let currentSpriteName = spriteName(); // Initialize with the initial sprite name

// Create an interval to check for sprite changes
//setInterval(function () {
  //const newSpriteName = spriteName();

  // Check if the sprite has changed
  // if (newSpriteName !== currentSpriteName) {
    // Save the current code for the previous sprite
    //setSpriteCode(currentSpriteName, editor.getValue());

    // Update the current sprite name
    //currentSpriteName = newSpriteName;

    // Get and set the code for the new sprite
   // const codeForNewSprite = getSpriteCode(currentSpriteName);
   // editor.setValue(codeForNewSprite, 1); // The second parameter is the cursor position (1 for the start)
 // }
//}, 100); // Adjust the interval duration as needed (e.g., check every second)

// Function to update Ace Editor theme based on Redux store theme
function updateAceEditorTheme() {
  // Get the theme from Redux store
  const theme = ReduxStore.getState().scratchGui.theme.theme.gui;

  // Set the Ace Editor theme based on the theme obtained from the Redux store
  const editorTheme = theme === "dark" ? "ace/theme/monokai" : "ace/theme/chrome";
  editor.setTheme(editorTheme);
}

vm.runtime.on('PROJECT_LOADED', () => {
  const storedData = vm.runtime.extensionStorage['javascritch'];

  if (storedData && storedData.editorContent) {
    // Set the Ace Editor content to the stored data
    editor.setValue(storedData.editorContent);
    console.log(storedData.editorContent);
  } else {
    console.log("no existy");
    console.log(storedData);
  }
});
editor.getSession().on('change', function () {
  vm.runtime.extensionStorage['javascritch'] = {
    editorContent: editor.getValue()
  };
});

function pause(seconds) {
  // Convert seconds to milliseconds
  const milliseconds = seconds * 1000;
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
// Set up a periodic check (e.g., every 1000 milliseconds)
const checkThemeInterval = setInterval(updateAceEditorTheme, 1000);
        editor.session.setMode("ace/mode/javascript");

        // Function to get text from Ace Editor and evaluate it
        async function evaluateCode() {
          const code = editor.getValue();
      
          // Wrap the code in an async function
          const asyncWrapper = `(async () => { ${code} })();`;
      
          // Evaluate the code
          eval(asyncWrapper);
      }


        // Function to get text from Ace Editor and evaluate it for every sprite
async function evaluateCodeForAllSprites() {
  const spriteEvaluations = [];

  // Iterate through all sprites
  for (const target of vm.runtime.targets) {
    if (target.isOriginal) {
      const spriteName = target.sprite.name;

      // Get the code for the current sprite
      const codeForSprite = getSpriteCode(spriteName);

      // Create a Promise for evaluating the code for the current sprite
      const evaluationPromise = new Promise((resolve) => {
        setTimeout(() => {
          // Evaluate the code for the current sprite after a delay (adjust as needed)
          eval(codeForSprite);

          // Resolve the Promise
          resolve();
        }, 0); // Set a minimal delay
      });

      // Add the Promise to the array
      spriteEvaluations.push(evaluationPromise);
    }
  }

  // Use Promise.all to wait for all evaluations to complete
  await Promise.all(spriteEvaluations);
}


        // Create a new img tag with the added CSS class
        const newImg = document.createElement('img');
        newImg.className = 'green-go';
        newImg.draggable = false;
        newImg.src = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNS4yNzU1MyIgaGVpZ2h0PSIxOC4yMTYzMiIgdmlld0JveD0iMCwwLDE1LjI3NTUzLDE4LjIxNjMyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM0LjA4MzM5LC0xNzEuMTYzMzQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiM0N2IzMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMzM4MDAwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjQ4LjM4MjYxLDE4MC4yNzE1bC0xMy43OTkyMiw4LjIyNzg5di0xNi40NTU3OXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjUuOTE2NjA5OTk5OTk5OTkxNTo4LjgzNjY2NDAzNTI0NjM3Mi0tPg==';
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