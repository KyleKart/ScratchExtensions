// Name: Advanced Costumes
// ID: ebAdvancedCostumes
// Description: Append text, shapes, and images to an SVG costume.

// Thanks to LilyMakesThings for Looks+! This extension wouldn't be here without it.

(function (Scratch) {
    const requireNonPackagedRuntime = (blockName) => {
        if (Scratch.vm.runtime.isPackaged) {
          alert(
            `To use the Advanced Costumes ${blockName} block, the creator of the packaged project must uncheck "Remove raw asset data after loading to save RAM" under advanced settings in the packager.`
          );
          return false;
        }
        return true;
      };

 // to gen colors:
  /*
var colors = {};
Object.entries(ScratchBlocks.Colours).filter(cat => typeof cat[1] === 'object').map(cat => {
  cat[1].color1 = cat[1].primary;
  cat[1].color2 = cat[1].secondary;
  cat[1].color3 = cat[1].tertiary;
  cat[1].color4 = cat[1]?.quaternary ?? cat[1].color3;
  delete cat[1].primary;
  delete cat[1].secondary;
  delete cat[1].tertiary;
  delete cat[1].quaternary;
  return cat;
}).forEach(cat => colors[cat[0]] = cat[1]);
console.log(JSON.stringify(colors));
  */
function _sbColorsAsScratch(cat) {
    cat = ScratchBlocks.Colours[cat];
    return {
      color1: cat.primary,
      color2: cat.secondary,
      color3: cat.tertiary,
      color4: cat.quaternary ?? cat.tertiary,
    };
  }
  const presetColors = {
    motion: {
      color1: '#4C97FF',
      color2: '#4280D7',
      color3: '#3373CC',
      color4: '#3373CC',
    },
    looks: {
      color1: '#9966FF',
      color2: '#855CD6',
      color3: '#774DCB',
      color4: '#774DCB',
    },
    sounds: {
      color1: '#CF63CF',
      color2: '#C94FC9',
      color3: '#BD42BD',
      color4: '#BD42BD',
    },
    control: {
      color1: '#FFAB19',
      color2: '#EC9C13',
      color3: '#CF8B17',
      color4: '#CF8B17',
    },
    event: {
      color1: '#FFBF00',
      color2: '#E6AC00',
      color3: '#CC9900',
      color4: '#CC9900',
    },
    sensing: {
      color1: '#5CB1D6',
      color2: '#47A8D1',
      color3: '#2E8EB8',
      color4: '#2E8EB8',
    },
    pen: {
      color1: '#0fBD8C',
      color2: '#0DA57A',
      color3: '#0B8E69',
      color4: '#0B8E69',
    },
    operators: {
      color1: '#59C059',
      color2: '#46B946',
      color3: '#389438',
      color4: '#389438',
    },
    data: {
      color1: '#FF8C1A',
      color2: '#FF8000',
      color3: '#DB6E00',
      color4: '#DB6E00',
    },
    data_lists: {
      color1: '#FF661A',
      color2: '#FF5500',
      color3: '#E64D00',
      color4: '#E64D00',
    },
    more: {
      color1: '#FF6680',
      color2: '#FF4D6A',
      color3: '#FF3355',
      color4: '#FF3355',
    },
  };
  function getColors(cat) {
    if (window?.ScratchBlocks) return _sbColorsAsScratch(cat);
    return presetColors[cat];
  }


    const menuIconURI = `data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3Ni4yMjIwMiIgaGVpZ2h0PSI3Ni4yMjIwMiIgdmlld0JveD0iMCwwLDc2LjIyMjAyLDc2LjIyMjAyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAxLjg4ODk5LC0xNDEuODg4OTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMDMuMzg4OTksMTgwYzAsLTIwLjIxOTcgMTYuMzkxMzEsLTM2LjYxMTAxIDM2LjYxMTAxLC0zNi42MTEwMWMyMC4yMTk3LDAgMzYuNjExMDEsMTYuMzkxMzEgMzYuNjExMDEsMzYuNjExMDFjMCwyMC4yMTk3IC0xNi4zOTEzMSwzNi42MTEwMSAtMzYuNjExMDEsMzYuNjExMDFjLTIwLjIxOTcsMCAtMzYuNjExMDEsLTE2LjM5MTMxIC0zNi42MTEwMSwtMzYuNjExMDF6IiBmaWxsPSIjOGE1NWQ3IiBzdHJva2U9IiM2ZTQ0YWMiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0yNjEuOTI2NDksMjAzLjY4MjE4Yy0wLjQ0ODc1LDAgLTAuODk4OTMsLTAuMTcxNSAtMS4yNDE5MiwtMC41MTQ0OWwtNDMuODUyOTgsLTQzLjg1MTU1Yy0wLjY4NTk4LC0wLjY4NTk4IC0wLjY4NTk4LC0xLjc5Nzg1IDAsLTIuNDgzODNjMC42ODQ1NiwtMC42ODU5OCAxLjc5OTI4LC0wLjY4NTk4IDIuNDgzODMsMGw0My44NTI5OCw0My44NTI5OGMwLjY4NTk4LDAuNjg0NTYgMC42ODU5OCwxLjc5OTI4IDAsMi40ODM4M2MtMC4zNDI5OSwwLjM0MTU2IC0wLjc5MzE3LDAuNTEzMDYgLTEuMjQxOTIsMC41MTMwNnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIzNC4xODcsMTU5LjkyNDk1YzMuNzkwMDYsMC43NjYwMiA0LjY1MzI2LDMuNjI4NTcgMS45MTkzMyw2LjM2MjVsLTguNzIyLDguNzIwNThjLTIuNzMyNSwyLjczMzkzIC01Ljc2Nzk4LDEuOTEwNzUgLTYuNzQ1NTEsLTEuODI5MjlsLTIuNjMzODksLTEwLjA4MjU0Yy0wLjk3NzUzLC0zLjc0MDA0IDEuMzIzMzgsLTYuMTczODYgNS4xMTM0NCwtNS40MDc4NHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI0NS44MjAxNSwxNzYuMTU1NjNjMCw1LjMzNjM5IC00LjMyNTk5LDkuNjYyMzggLTkuNjYzOCw5LjY2MjM4Yy01LjMzNjM5LDAgLTkuNjYzOCwtNC4zMjU5OSAtOS42NjM4LC05LjY2MjM4YzAsLTUuMzM2MzkgNC4zMjU5OSwtOS42NjM4IDkuNjYzOCwtOS42NjM4YzUuMzM3ODIsMC4wMDE0MyA5LjY2MzgsNC4zMjc0MiA5LjY2MzgsOS42NjM4eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjQ1LjAxNjk4LDE5Ny4yMTk2NGMtMS4zNzE5NywxLjM3MTk3IC0zLjU5ODU2LDEuMzcxOTcgLTQuOTY5MSwwbC00Ljk3MDUzLC00Ljk3MDUzYy0xLjM3MDU0LC0xLjM3MTk3IC0xLjM3MDU0LC0zLjU5NzEzIDAsLTQuOTY5MWwxMi40MjM0NiwtMTIuNDIzNDZjMS4zNzM0LC0xLjM3MTk3IDMuNTk4NTYsLTEuMzcxOTcgNC45NzA1MywwbDQuOTcwNTMsNC45NjkxYzEuMzcxOTcsMS4zNzM0IDEuMzcxOTcsMy41OTcxMyAwLDQuOTcwNTN6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNjEuOTI2NDksMjAzLjY4MjE4Yy0wLjQ0ODc1LDAgLTAuODk4OTMsLTAuMTcxNSAtMS4yNDE5MiwtMC41MTQ0OWwtMTMuMDMwODQsLTEzLjAzMDg0Yy0wLjY4NTk4LC0wLjY4NDU2IC0wLjY4NTk4LC0xLjc5OTI4IDAsLTIuNDgzODNjMC42ODc0MSwtMC42ODU5OCAxLjc5Nzg1LC0wLjY4NTk4IDIuNDgzODMsMGwxMy4wMzA4NCwxMy4wMzA4NGMwLjY4NTk4LDAuNjg0NTYgMC42ODU5OCwxLjc5OTI4IDAsMi40ODM4M2MtMC4zNDI5OSwwLjM0Mjk5IC0wLjc5MzE3LDAuNTE0NDkgLTEuMjQxOTIsMC41MTQ0OXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzguMTExMDA5OTk5OTk5OTk6MzguMTExMDA5OTk5OTk5OTktLT4=`
    class AdvancedCostumes {
        
        constructor() {
            this.generatedSVG = "";
        }
    
        getInfo() {
            return {
                id: "ebAdvancedCostumes",
                name: "Advanced Costumes",
                ...getColors('looks'),
                menuIconURI: menuIconURI,
                blocks: [
                    {
                        opcode: "replaceCostumeText",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "add text [CONTENT] to [COSTUME] at x: [X] y: [Y] with font: [FONT] size: [SIZE] color: [COLOR]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                            CONTENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello World!",
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            FONT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Arial",
                            },
                            SIZE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                            },
                        },
                    },
                    {
                        opcode: "replaceCostumeImage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "add image [IMAGE] to [COSTUME] at x: [X] y: [Y] width: [WIDTH] height: [HEIGHT]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                            IMAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "data:image/png;base64,",
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100,
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100,
                            },
                        },
                    },
                    {
                        opcode: "replaceCostumeShape",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "add [SHAPE] to [COSTUME] at x: [X] y: [Y] with width: [WIDTH] height: [HEIGHT] color: [COLOR]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                            SHAPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'shapes',
                                defaultValue: 'rectangle'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                            },
                        },
                    },
                    '---',
                    {
                        opcode: "setCostumeText",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set text [CONTENT] on [COSTUME] at x: [X] y: [Y] with font: [FONT] size: [SIZE] color: [COLOR]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                            CONTENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello World!",
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            FONT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Arial",
                            },
                            SIZE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                            },
                        },
                    },
                    {
                        opcode: "setCostumeImage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set image [IMAGE] on [COSTUME] at x: [X] y: [Y] width: [WIDTH] height: [HEIGHT]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                            IMAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "data:image/png;base64,",
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100,
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100,
                            },
                        },
                    },
                    {
                        opcode: "setCostumeShape",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set [SHAPE] on [COSTUME] at x: [X] y: [Y] with width: [WIDTH] height: [HEIGHT] color: [COLOR]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                            SHAPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'shapes',
                                defaultValue: 'rectangle'
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                            HEIGHT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                            },
                        },
                    },
                    '---',
                    {
                        opcode: "clearCostume",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "clear [COSTUME]",
                        arguments: {
                            COSTUME: {
                                type: Scratch.ArgumentType.COSTUME,
                            },
                        }
                    },
                    {
                        opcode: "restoreCostumeContent",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("restore [COSTUME]"),
                        arguments: {
                          COSTUME: {
                            type: Scratch.ArgumentType.COSTUME,
                          },
                        },
                      },
                ],
                menus: {
                    shapes: ['rectangle', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'triangle', 'star', 'diamond']
                }
            };
        }

        replaceCostumeText(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
    
            const content = args.CONTENT;
            const x = args.X;
            const y = args.Y;
            const font = args.FONT;
            const size = args.SIZE;
            const color = args.COLOR;
            const textSVG = this.generateSVGWithText(content, x, y, font, size, color);
            this.generatedSVG += textSVG;
            const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
            costume.skin = completeSVG;

            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }

        replaceCostumeImage(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
    
            const image = args.IMAGE;
            const x = args.X;
            const y = args.Y;
            const width = args.WIDTH;
            const height = args.HEIGHT;
            const imageSVG = this.generateSVGWithImage(image, x, y, width, height);
            this.generatedSVG += imageSVG;
            const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
            costume.skin = completeSVG;
        
            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }

        replaceCostumeShape(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
            
            const x = args.X;
            const y = args.Y;
            const width = args.WIDTH;
            const height = args.HEIGHT;
            const color = args.COLOR;
            const shape = args.SHAPE;

            const shapeSVG = this.generateShapeSVG(shape, x, y, width, height, color);
            this.generatedSVG += shapeSVG;

            const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
            costume.skin = completeSVG;
        
            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }

        setCostumeText(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
    
            const content = args.CONTENT;
            const x = args.X;
            const y = args.Y;
            const font = args.FONT;
            const size = args.SIZE;
            const color = args.COLOR;
            const textSVG = this.generateSVGWithText(content, x, y, font, size, color);
            this.generatedSVG = textSVG;
            const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
            costume.skin = completeSVG;

            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }

        setCostumeImage(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
    
            const image = args.IMAGE;
            const x = args.X;
            const y = args.Y;
            const width = args.WIDTH;
            const height = args.HEIGHT;
            const imageSVG = this.generateSVGWithImage(image, x, y, width, height);
            this.generatedSVG = imageSVG;
            const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
            costume.skin = completeSVG;
        
            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }

        setCostumeShape(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
            
            const x = args.X;
            const y = args.Y;
            const width = args.WIDTH;
            const height = args.HEIGHT;
            const color = args.COLOR;
            const shape = args.SHAPE;

            const shapeSVG = this.generateShapeSVG(shape, x, y, width, height, color);
            this.generatedSVG = shapeSVG;

            const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
            costume.skin = completeSVG;
        
            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }



        clearCostume(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
                console.error("Costume doesn't exist");
                return;
            }
    
            this.generatedSVG = "";
            const completeSVG = this.generatedSVG;
            costume.skin = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">${this.generatedSVG}</svg>`;
        
            Scratch.vm.runtime.renderer.updateSVGSkin(costume.skinId, costume.skin);
            Scratch.vm.emitTargetsUpdate();
        }

        generateSVGWithText(text, x, y, font, size, color) {
            return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${color}">${text}</text>`;
        }

        generateSVGWithImage(image, x, y, width, height) {
            return `<image xlink:href="${image}" x="${x}" y="${y}" height="${height}" width="${width}"/>`;
        }
        generateShapeSVG(shape, x, y, width, height, color) {
            switch (shape) {
                case 'rectangle':
                    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`;
                case 'circle':
                    return `<circle cx="${x + width / 2}" cy="${y + height / 2}" r="${width / 2}" fill="${color}" />`;
                case 'ellipse':
                    return `<ellipse cx="${x + width / 2}" cy="${y + height / 2}" rx="${width / 2}" ry="${height / 4}" fill="${color}" />`;
                case 'line':
                    return `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y + height}" stroke="${color}" />`;
                case 'polyline':
                    return `<polyline points="${x},${y} ${x + width},${y} ${x},${y + height}" stroke="${color}" fill="transparent" />`;
                case 'polygon':
                    return `<polygon points="${x},${y} ${x + width},${y} ${x},${y + height}" fill="${color}" />`;
                case 'triangle':
                    return `<polygon points="${x},${y + height} ${x + width / 2},${y} ${x + width},${y + height}" fill="${color}" />`;
                case 'star':
                    const points = [];
                    const outerRadius = width / 2;
                    const innerRadius = outerRadius / 2.5;
                    const centerX = x + width / 2;
                    const centerY = y + height / 2;
                    for (let i = 0; i < 10; i++) {
                        const radius = i % 2 === 0 ? outerRadius : innerRadius;
                        const angle = Math.PI / 5 * i - Math.PI / 2;
                        points.push(`${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`);
                    }
                    return `<polygon points="${points.join(' ')}" fill="${color}" />`;
                case 'diamond':
                    return `<polygon points="${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height} ${x},${y + height / 2}" fill="${color}" />`;
                default:
                    return ''; // Handle unsupported shapes
            }
        }
        
        restoreCostumeContent(args, util) {
            const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
            const costume = util.target.sprite.costumes[costumeIndex];
            if (!costume) {
              console.error("Costume doesn't exist");
              return;
            }
      
            if (!requireNonPackagedRuntime("restore costume content")) {
              return;
            }
      
            //This is here to ensure no changes are made to bitmap costumes, as changes are irreversible
            //Check will be removed when it's possible to edit bitmap skins
            const format = costume.asset.assetType.runtimeFormat;
            if (format !== "svg") {
              console.error("Costume is not vector");
              return;
            }
      
            const content = costume.asset.decodeText();
            const rotationCenterX = costume.rotationCenterX;
            const rotationCenterY = costume.rotationCenterY;
            util.target.renderer.updateSVGSkin(costume.skinId, content, [
              rotationCenterX,
              rotationCenterY,
            ]);
          }

        getCostumeInput(costume, target) {
            if (typeof costume === "number") {
                costume = Math.round(costume - 1);
                if (costume === Infinity || costume === -Infinity || !costume) {
                    costume = 0;
                }
                costume = this.wrapClamp(costume, 0, target.sprite.costumes.length - 1);
                return costume;
            } else {
                return target.getCostumeIndexByName(Scratch.Cast.toString(costume));
            }
        }
    }

    Scratch.extensions.register(new AdvancedCostumes());
})(Scratch);