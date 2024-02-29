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
                    defaultValue: "#8ba888",
                  },
                },
              }
            ],
            menus: {
              themeMenu: {
                  acceptReporters: true,
                  items: ["any", "light", "dark"]
              }, 
          } 
        }
    
        }
        themecolorset(args) {
          const theme = args.theme
          const color = args.color
        }
    
      }
      Scratch.extensions.register(new themecolor());