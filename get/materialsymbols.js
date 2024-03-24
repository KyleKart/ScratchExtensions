class GoogleFontsIconsExtension {
  getInfo() {
    return {
      id: 'googlesymbols',
      name: 'Google Material Symbols',
      blocks: [
        {
          opcode: 'getIconData',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Material Symbols [MODE] [NAME] with style [STYLE]',
          arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'home', 
            },
            STYLE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'styleMenu',
              defaultValue: 'outlined', 
            },
            MODE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'modeMenu',
              defaultValue: 'SVG', 
            },
          },
        },
      ],
      menus: {
        styleMenu: {
          acceptReporters: false,
          items: ['outlined', 'rounded', 'sharp'], 
        },
        modeMenu: {
          acceptReporters: false,
          items: ['SVG', 'dataURI', 'canvas'], 
        }
      },
    };
  }

  async getIconData(args) {
    const name = args.NAME.toLowerCase(); 
    const style = args.STYLE.toLowerCase(); 
    const mode = args.MODE.toLowerCase(); 

    const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbols${style}/${name}/default/24px.svg`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        if (mode === 'datauri') {
          const svgData = await response.text();
          return `data:image/svg+xml;base64,${btoa(svgData)}`;
        } else if (mode === 'canvas') {
          const svgData = await response.text();
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          };
          return canvas.toDataURL();
        } else {
          const svgData = await response.text();
          return svgData;
        }
      } else {
        console.error('Error fetching icon:', response.statusText);
        return '';
      }
    } catch (error) {
      console.error('Error fetching icon:', error);
      return '';
    }
  }
}

Scratch.extensions.register(new GoogleFontsIconsExtension());
