let currentColor = "";

class themecolor {
  getInfo() {
      return {
          id: 'themecolor',
          name: 'Theme Color',
          blocks: [
              {
                  opcode: 'themecolorset',
                  blockType: Scratch.BlockType.COMMAND,
                  text: 'set theme-color [theme] to [color]',
                  arguments: {
                      theme: {
                          type: Scratch.ArgumentType.STRING,
                          defaultValue: "any",
                          menu: "themeMenu"
                      },
                      color: {
                          type: Scratch.ArgumentType.COLOR,
                      },
                  },
              },
              {
                opcode: 'currentColor',
                blockType: Scratch.BlockType.REPORTER,
                text: 'current theme-color',
              }
          ],
          menus: {
              themeMenu: {
                  acceptReporters: true,
                  items: ["any", "light", "dark"]
              },
          }
      };
  }

  themecolorset(args) {
      const theme = args.theme;
      const color = args.color;

      const existingMetaTag = document.querySelector('meta[name="theme-color"]');
      if (existingMetaTag) {
          existingMetaTag.remove();
      }

      const metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      metaTag.content = color;
      currentColor = color;

      if (theme === 'dark') {
          metaTag.media = '(prefers-color-scheme: dark)';
      } else if (theme === 'light') {
          metaTag.media = '(prefers-color-scheme: light)';
      }

      document.head.appendChild(metaTag);
  }
  currentColor(args) {
    return currentColor;
  }
}

Scratch.extensions.register(new themecolor());