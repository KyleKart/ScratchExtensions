(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Key Remote must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  let activeKey = "", keyState = {};

  class KeyRemoteExtension {
    constructor() {
      runtime.on("BEFORE_EXECUTE", () => {
        runtime.startHats("KeyRemoteEB_onKeyPress");
        Object.keys(keyState).forEach(k => { keyState[k] += 0.1 });
      });

      window.addEventListener("keydown", (event) => {
        const formattedKey = this.formatKeyName(event.key, false);
        if (keyState[formattedKey] === undefined) keyState[formattedKey] = 0;
        activeKey = formattedKey;
      });

      window.addEventListener("keyup", (event) => {
        delete keyState[this.formatKeyName(event.key, false)];
        activeKey = Object.keys(keyState).pop() || "";
      });
    }

    getInfo() {
      return {
        id: "KeyRemoteEB",
        name: "Key Remote",
        color1: "#0082FC",
        color2: "#0072D1",
        color3: "#0062A0",
        blocks: [
          {
            opcode: "onKeyPress",
            blockType: Scratch.BlockType.HAT,
            text: "when [KEY] hit",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "availableKeys" }
            }
          },
          {
            opcode: "isKeyPressedOnce",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [KEY] hit?",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "availableKeys" }
            }
          },
          "---",
          {
            opcode: "whileKeyPressed",
            blockType: Scratch.BlockType.HAT,
            text: "when [KEY] pressed",
            isEdgeActivated: false,
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "availableKeys", defaultValue: "Enter" }
            }
          },
          {
            opcode: "isKeyHeld",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [KEY] pressed?",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "availableKeys", defaultValue: "Enter" }
            },
          },
          "---",
          {
            opcode: "getActiveKey",
            blockType: Scratch.BlockType.REPORTER,
            text: "current key pressed"
          }
        ],
        menus: {
          availableKeys: {
            acceptReporters: true,
            items: [
              "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
              "Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow",
              "Enter",
              "Play/Pause", "Track Next", "Track Previous", "Stop",
              "Mute", "Volume Up", "Volume Down",
              "Search", "Home", "Back",
              "Forward", "Refresh", "Favorites"
            ]
          }
        }
      };
    }

    formatKeyName(key, reverse) {
      if (reverse) {
        const reverseMapping = {
          " ": "Space",
          "ArrowUp": "Up Arrow",
          "ArrowDown": "Down Arrow",
          "ArrowLeft": "Left Arrow",
          "ArrowRight": "Right Arrow",
          "MediaPlayPause": "Play/Pause",
          "MediaTrackNext": "Track Next",
          "MediaTrackPrevious": "Track Previous",
          "MediaStop": "Stop",
          "AudioVolumeMute": "Mute",
          "AudioVolumeUp": "Volume Up",
          "AudioVolumeDown": "Volume Down",
          "Search": "Search",
          "Home": "Home",
          "Back": "Back",
          "Forward": "Forward",
          "Refresh": "Refresh",
          "Favorites": "Favorites"
        };
        return reverseMapping[key] || key;
      } else {
        const forwardMapping = {
          "Space": " ",
          "Up Arrow": "ArrowUp",
          "Down Arrow": "ArrowDown",
          "Left Arrow": "ArrowLeft",
          "Right Arrow": "ArrowRight",
          "Play/Pause": "MediaPlayPause",
          "Track Next": "MediaTrackNext",
          "Track Previous": "MediaTrackPrevious",
          "Stop": "MediaStop",
          "Mute": "AudioVolumeMute",
          "Volume Up": "AudioVolumeUp",
          "Volume Down": "AudioVolumeDown",
          "Search": "Search",
          "Home": "Home",
          "Back": "Back",
          "Forward": "Forward",
          "Refresh": "Refresh",
          "Favorites": "Favorites"
        };
        return forwardMapping[key] || key;
      }
    }

    detectKeyStatus(key, continuous) {
      key = this.formatKeyName(key, false);
      if (keyState[key]) {
        if (continuous) return true;
        return keyState[key] <= 0.1;
      }
      return false;
    }

    isKeyPressedOnce(args) { return this.detectKeyStatus(Scratch.Cast.toString(args.KEY), false); }
    onKeyPress(args) { return this.detectKeyStatus(Scratch.Cast.toString(args.KEY), false); }

    whileKeyPressed(args) { return this.detectKeyStatus(Scratch.Cast.toString(args.KEY), true); }
    isKeyHeld(args) { return this.detectKeyStatus(Scratch.Cast.toString(args.KEY), true); }

    getActiveKey() { return this.formatKeyName(activeKey, true); }
  }

  Scratch.extensions.register(new KeyRemoteExtension());
})(Scratch);