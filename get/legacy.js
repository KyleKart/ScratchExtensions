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
        color1: '#60b0c8',
        blocks: [
          makeLabel('Control'),       
          {
            opcode: 'whenReceived',
            blockType: Scratch.BlockType.EVENT,
            text: 'when [EVENT_OPTION] shouted',
            isEdgeActivated: false,
            hideFromPalette: false,
            color1: '#9800c8',
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'go',
                menu: 'EVENT_FIELD'
              }
            }
          },
          {
            opcode: 'broadcast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'shout [EVENT]',
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'go',
                menu: 'EVENT_FIELD',
              }
            }
          },
          {
            opcode: 'whenWaves',
            blockType: Scratch.BlockType.EVENT,
            text: 'when [EVENT_OPTION] waves',
            isEdgeActivated: false,
            hideFromPalette: false,
            color1: '#9800c8',
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '🟦',
                menu: 'FLAG_FIELD'
              }
            }
          },
          {
            opcode: 'flagwave',
            blockType: Scratch.BlockType.COMMAND,
            text: 'wave [EVENT]',
            arguments: {
              EVENT: {
                type: 'string',
                defaultValue: '🟦',
                menu: 'FLAG_FIELD',
              },
            },
          },

          makeLabel('Looks'),       
          {
            opcode: 'costumebyone',
            blockType: Scratch.BlockType.COMMAND,
            text: (vm.editingTarget?.isStage) ? "change background by [numero]" : "change costume by [numero]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              numero: {
                type: 'number',
                defaultValue: '1',
              },
            },
          },
          {
            opcode: 'backgroundbyone',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change background by [numero]',
            filter: [Scratch.TargetType.STAGE],
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
            filter: [Scratch.TargetType.SPRITE],
            text: 'say nothing',
          },
          makeLabel('Media'),   
          {
            opcode: 'beep',
            blockType: Scratch.BlockType.COMMAND,
            text: 'beep',
          },
         {
            opcode: 'rewindSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'rewind sound [SOUND_MENU]',
            hideFromPalette: true,
            arguments: {
              SOUND_MENU: {
                type: 'string',
                defaultValue: 'pop',
              },
            },
          },
          makeLabel('Sensing'),   
          {
            opcode: "bisClone",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is clone?",
            color1: '#6088b0',
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
          },
        ],   
        menus: {
          EVENT_FIELD: {
            acceptReporters: false,
            items: [
              'go',
              'setup',
            ]
          },
          FLAG_FIELD: {
            acceptReporters: false,
            items: [
              '🟥',
              '🟧',
              '🟨',
              '🟩',
              '🟪',
              '🟦',
              '🏳️',
              '🏴',
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
    backgroundbyone(args, util) {
      const amount = Math.floor(Number(args.numero));
      console.log(amount);
      const targetSprite = util.target;
    
      if (!isNaN(amount) && targetSprite) {
          targetSprite.setCostume(targetSprite.currentCostume + amount);
          console.log("Current Background Index:", targetSprite.currentCostume);
console.log("New Background Index:", targetSprite.currentCostume + amount);
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
        util.startHats("event_whenbroadcastreceived", {
          BROADCAST_OPTION: EVENT
      });
      }      
      else {
        util.startHats('scratchbeta_whenReceived', {
          EVENT_OPTION: EVENT
        });
        util.startHats("event_whenbroadcastreceived", {
          BROADCAST_OPTION: EVENT
      });
           }
    }

    flagwave({EVENT}, util) {
        util.startHats('scratchbeta_whenWaves', {
          EVENT_OPTION: EVENT
        });
    }
  
    bisClone(args, util) {
      return !util.target.isOriginal;
    }

    }
  
  Scratch.extensions.register(new ScratchBetaBlocks());

})(window.Scratch);