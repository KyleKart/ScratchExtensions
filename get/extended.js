class extension {
  getInfo() {
    return {
      id: "extended",
      name: "Extended",
      color1: "#ff5726",
      blocks: [
        {
          opcode: "setXY",
          blockType: Scratch.BlockType.COMMAND,
          text: "set x to [COORDS]",
          extensions: ["colours_motion"],
          switches: ["changeXY"],
          arguments: {
            COORDS: {
              type: Scratch.ArgumentType.EXTENDABLE,
              text: "[VAL]",
              maxInputs: 2,
              minInputs: 1,
              separator: "and y to ",
              arguments: {
                VAL: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0
                }
              }
            }
          }
        },
        {
          opcode: "changeXY",
          blockType: Scratch.BlockType.COMMAND,
          text: "change x by [COORDS]",
          extensions: ["colours_motion"],
          hideFromPalette: true,
          switches: ["setXY"],
          arguments: {
            COORDS: {
              type: Scratch.ArgumentType.EXTENDABLE,
              text: "[VAL]",
              maxInputs: 2,
              minInputs: 1,
              separator: "and y by ",
              arguments: {
                VAL: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0
                }
              }
            }
          }
        },
        {
          opcode: "mod",
          blockType: Scratch.BlockType.REPORTER,
          text: "[NUMS]",
          extensions: ["colours_operators"],
          disableMonitor: true,
          arguments: {
            NUMS: {
              type: Scratch.ArgumentType.EXTENDABLE,
              text: "[NUM]",
              separator: " mod ",
              minInputs: 2,
              arguments: {
                NUM: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 10
                }
              }
            }
          }
        },
        {
          opcode: "say",
          blockType: Scratch.BlockType.COMMAND,
          text: "say [TEXT][DURATION]",
          extensions: ["colours_looks"],
          switches: ["think"],
          arguments: {
            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello!" },
            DURATION: {
              type: Scratch.ArgumentType.EXTENDABLE,
              text: "for [VAL] seconds",
              maxInputs: 1,
              arguments: {
                VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
              }
            }
          }
        },
        {
          opcode: "think",
          blockType: Scratch.BlockType.COMMAND,
          text: "think [TEXT][DURATION]",
          extensions: ["colours_looks"],
          hideFromPalette: true,
          switches: ["say"],
          arguments: {
            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hmm..." },
            DURATION: {
              type: Scratch.ArgumentType.EXTENDABLE,
              text: "for [VAL] seconds",
              maxInputs: 1,
              arguments: {
                VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
              }
            }
          }
        }
      ]
    };
  }

  setXY(args, util) {
    const values = util.extendableToArray(args, "COORDS", "VAL");
    const x = Scratch.Cast.toNumber(values[0]);
    const y = values[1] !== undefined ? Scratch.Cast.toNumber(values[1]) : util.target.y;
    util.target.setXY(x, y);
  }

  changeXY(args, util) {
    const values = util.extendableToArray(args, "COORDS", "VAL");
    const dx = Scratch.Cast.toNumber(values[0]);
    const dy = values[1] !== undefined ? Scratch.Cast.toNumber(values[1]) : 0;
    util.target.setXY(util.target.x + dx, util.target.y + dy);
  }

  mod(args, util) {
    const arr = util.extendableToArray(args, 'NUMS', 'NUM');

    return arr.reduce((a, b) => {
      const numA = Scratch.Cast.toNumber(a);
      const numB = Scratch.Cast.toNumber(b);
      let res = numA % numB;
      if (res / numB < 0) res += numB;
      return res;
    });
  }

  say(args, util) {
    const target = util.target;
    const duration = util.extendableToArray(args, "DURATION", "VAL");
    if (duration.length > 0) {
      vm.runtime.ext_scratch3_looks.sayforsecs({ MESSAGE: Scratch.Cast.toString(args.TEXT), SECS: Scratch.Cast.toNumber(duration[0]) }, { target });
    } else {
      vm.runtime.ext_scratch3_looks.say({ MESSAGE: Scratch.Cast.toString(args.TEXT) }, { target });
    }
  }

  think(args, util) {
    const target = util.target;
    const duration = util.extendableToArray(args, "DURATION", "VAL");
    if (duration.length > 0) {
      vm.runtime.ext_scratch3_looks.thinkforsecs({ MESSAGE: Scratch.Cast.toString(args.TEXT), SECS: Scratch.Cast.toNumber(duration[0]) }, { target });
    } else {
      vm.runtime.ext_scratch3_looks.think({ MESSAGE: Scratch.Cast.toString(args.TEXT) }, { target });
    }
  }
}

Scratch.extensions.register(new extension());