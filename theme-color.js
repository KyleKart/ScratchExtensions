    class themecolor {
        getInfo() {
          return {
            id: 'themecolor',
            name: 'Theme Color',
            blocks: [
              {
                opcode: 'themecolorset',
                blockType: Scratch.BlockType.COMMAND,
                text: 'set theme color [theme] to [color]',
                arguments: {
                  theme: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "any",
                    menu: "themeMenu"

                  },
                color: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: "",
                  },
                },
              }
            ],
            menus: {
              options1: {
                  acceptReporters: true,
                  themeMenu: ["any", "light", "dark"]
              }, 
          } 
        }
    
        }
        themecolorset(args) {
        eval(args.code)
        }
    
      }
      Scratch.extensions.register(new themecolor());