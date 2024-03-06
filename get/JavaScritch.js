function goToXY (X, Y, name) {
const target = vm.runtime.getSpriteTargetByName(name);
const xy = { X: X, Y: Y };
console.log(xy);
console.log(target);
vm.runtime.ext_scratch3_motion.goToXY(xy, { target} );
    }
    function changeX (X, name) {
const target = vm.runtime.getSpriteTargetByName(name);
const xy = { X: X };
console.log(xy);
console.log(target);
vm.runtime.ext_scratch3_motion.changeX(xy, { target} );
    }

   function setX (args, util) {

    }

   function changeY (args, util) {

    }

   function setY (args, util) {

    }

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