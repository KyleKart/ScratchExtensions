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
      };
  }

  themecolorset(args) {
      const theme = args.theme;
      const color = args.color;

      // Remove existing <meta> tag with name "theme-color"
      const existingMetaTag = document.querySelector('meta[name="theme-color"]');
      if (existingMetaTag) {
          existingMetaTag.remove();
      }

      // Create the new <meta> tag
      const metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      metaTag.content = color; // Use the selected color

      // Check if the theme is dark or light
      if (theme === 'dark') {
          metaTag.media = '(prefers-color-scheme: dark)';
      } else if (theme === 'light') {
          metaTag.media = '(prefers-color-scheme: light)';
      }

      // Append the new <meta> tag to the <head> of the document
      document.head.appendChild(metaTag);
  }
}

Scratch.extensions.register(new themecolor());