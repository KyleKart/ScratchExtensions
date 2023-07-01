(function (Scratch) {
  'use strict';

if (!Scratch.extensions.unsandboxed) {
  throw new Error('The Legacy Blocks extension needs to be run unsandboxed!');
}
const makeLabel = (text) => ({
    blockType: 'label',
    text: text
  });

class ScratchBetaBlocks {
    getInfo() {
      return {
        id: 'scratchbeta',
        name: 'Legacy Blocks',
        color1: '#63b5ce',
        blocks: [
          makeLabel('Control'),       
          {
            opcode: 'whenReceived',
            blockType: Scratch.BlockType.HAT,
            text: 'when I receive message [EVENT_OPTION]',
            isEdgeActivated: false,
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Event 1',
                menu: 'EVENT_FIELD'
              }
            }
          },
          {
            opcode: 'broadcast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast message [EVENT]',
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'go',
                menu: 'EVENT_FIELD'

              }
            }
          },

          makeLabel('Looks'),       
          {
            opcode: 'costumebyone',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change costume by [numero]',
            color1: '#63b9ee',
            color: '#63b9ee',
            arguments: {
              numero: {
                type: 'number',
                defaultValue: '1',
              },
            },
          },
          {
            opcode: 'sayNothing',
            blockType: Scratch.BlockType.COMMAND,
            text: 'say nothing',
          },
          makeLabel('Media'),   
          {
            opcode: 'beep',
            blockType: Scratch.BlockType.COMMAND,
            text: 'beep',
          },
          makeLabel('Unfinished'),       
         {
            opcode: 'rewindSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'rewind sound [SOUND_MENU]',
            arguments: {
              SOUND_MENU: {
                type: 'string',
                defaultValue: 'pop',
              },
            },
          },
        ],   
        menus: {
          EVENT_FIELD: {
            acceptReporters: false,
            items: [
              'go',
              'Event 1',
              'Event 2',
              'Event 3'
            ]
          },
        }
      };
    }
    beep() {
      const sound = new Audio('https://kylekart.github.io/ScratchExtensions/beta_blocks/beep.mp3');
      sound.play();
    }
    costumebyone(args, util) {
        const amount = Math.floor(Number(args.numero));
        console.log(amount);
        const targetSprite = util.target;
      
        if (!isNaN(amount) && targetSprite) {
            targetSprite.setCostume(targetSprite.currentCostume + amount);
            console.log("Current Costume Index:", targetSprite.currentCostume);
console.log("New Costume Index:", targetSprite.currentCostume + amount);
        }
    }
      
    rewindSound(args) {
        const soundName = args.SOUND_MENU;
        const sound = this.getSoundByName(soundName);
      
        if (sound) {
          const reversedData = sound.data.slice().reverse();
          sound.stop();
          sound.data = reversedData;
          sound.play();
        }
      }
      
      getSoundByName(name) {
        const soundIndex = this.getSoundBank().sounds.findIndex(sound => sound.name === name);
        return this.getSoundBank().sounds[soundIndex];
      }

      sayNothing(args, util) {
        const message = '';
        Scratch.vm.runtime.emit('SAY', util.target, 'say', message);
      }

    broadcast({EVENT}, util) {
      if (EVENT === 'go') {
        Scratch.vm.runtime.greenFlag();
        util.startHats('scratchbeta_whenReceived', {
          EVENT_OPTION: EVENT
        });
      }      
      else {
        util.startHats('scratchbeta_whenReceived', {
          EVENT_OPTION: EVENT
        });
           }
    }
  
    }
  
  Scratch.extensions.register(new ScratchBetaBlocks());

})(window.Scratch);