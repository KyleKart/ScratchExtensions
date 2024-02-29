    class themecolor {
        getInfo() {
          return {
            id: 'themecolor',
            name: 'Theme Color',
            blocks: [
              {
                opcode: 'JS',
                blockType: Scratch.BlockType.COMMAND,
                text: 'set theme color [theme] to [color]',
                arguments: {
                color: {
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
      Scratch.extensions.register(new themecolor());