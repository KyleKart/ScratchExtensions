(function (Scratch) {
    'use strict';
  
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Pitchano needs to be run unsandboxed!');
  }
  const makeLabel = (text) => ({
      blockType: 'label',
      text: text
    });
  
  class Pitchano {
    getInfo() {
    const bubble = document.querySelector('.scratchCategoryId-sound .scratchCategoryItemBubble');  
    const styles = window.getComputedStyle(bubble);
    const backgroundColor = styles.backgroundColor; // Returns "rgb(75, 130, 234)"
    const borderColor = styles.borderColor; // Returns "rgb(60, 104, 187)"

    // Convert RGB to HEX
    function rgbToHex(rgb) {
      const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (match) {
        return "#" + match.slice(1).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
      }
      return rgb;
    }

    return {
        id: 'pitchano',
        name: 'Pitchano',
      color1: rgbToHex(backgroundColor),
      color2: rgbToHex(borderColor),
          blocks: [
              {
                opcode: 'pitchanoReporter',
                blockType: Scratch.BlockType.REPORTER,
                text: 'note [NOTE] to [OPTION]',
                arguments: {
                  NOTE: {
                    type: Scratch.ArgumentType.NOTE,
                    defaultValue: '60',
                  },
                  OPTION: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'pitch',
                    menu: "options"
                  }
                }
              },
            ],
            menus: {
                options: {
                  acceptReporters: false,
                  items: [
                    'note',
                    'pitch',
                  ]
                },
            }
        }
    }

      pitchanoReporter(args){
        if (args.OPTION === "pitch") {
        const convertedNumber = ((args.NOTE - 60) / 36) * 360;
        return convertedNumber;
        } else if (args.OPTION === "note") {
            return args.NOTE;
      }
      }
    }
  
    
  Scratch.extensions.register(new Pitchano());

})(window.Scratch);