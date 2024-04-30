(function (Scratch) {
    class Utilities {

        getInfo() {
            return {
                id: "sbxutilities",
                name: "Utilities",
                blocks: [
                    {
                        opcode: "joinThree",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "join [0] [1] [2]",
                        arguments: {
                            0: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "world",
                            },
                            2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "!",
                            },
                        },
                    },
                    {
                        opcode: "true",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "true",
                    },
                    {
                        opcode: "false",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "false",
                    },
                    {
                        opcode: "rndLetter",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "random letter",
                    },
                    {
                        opcode: "rndString",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "random string [0] [1] [2]",
                        arguments: {
                            0: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50,
                            },
                            1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "String 1",
                            },
                            2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "String 2",
                            },
                        }
                    },
                    {
                        opcode: "contains",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "[0] contains [1]?",
                        arguments: {
                            0: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "apple",
                            },
                            1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "a",
                            },
                        },
                    }, 
                    
                    {
                        opcode: 'packaged',
                        text: 'project packaged?',
                        blockType: Scratch.BlockType.BOOLEAN,
                    },
                    {
                        opcode: 'currentMillisecond',
                        text: 'current millisecond',
                        blockType: Scratch.BlockType.REPORTER,
                    },
                    {
                        opcode: 'turboWarp',
                        text: 'is TurboWarp?',
                        blockType: Scratch.BlockType.BOOLEAN,
                    },
                    {
                        opcode: 'scratchX',
                        text: 'is ScratchX?',
                        blockType: Scratch.BlockType.BOOLEAN,
                    },
                    {
                        opcode: "toLowercase",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[0] lowercase",
                        arguments: {
                            0: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "HeLlO wOrLd!",
                            },
                        },
                    },   
                    {
                        opcode: "toUppercase",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[0] Uppercase",
                        arguments: {
                            0: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "HeLlO wOrLd!",
                            },
                        },
                    }, 
                    {
                        opcode: "get",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "GET [0]",
                        arguments: {
                          0: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "https://extensions.turbowarp.org/hello.txt",
                          },
                        },
                      },
                ],
                menus: {
                    startsEndsMenu: ["starts", "ends"]
                }
            };
        }

        joinThree(args) {
            return args[0] + args[1] + args[2];
        }
        
        true() { 
            return true; 
        }
        
        false() { 
            return false; 
        }
        rndLetter(args) {
            let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return letters.charAt(Math.floor(Math.random() * letters.length));
        }
        toLowercase(args) {
            return args[0].toLowerCase();
        }
        toUppercase(args) {
            return args[0].toUpperCase();
        }
        rndString(args) {
            return Math.random() > args[0] / 100 ? args[1] : args[2];
        }
        contains (args) {
            const format = function (string) {
                return string.toString().toLowerCase();
            };
            console.log(args);
            return format(args[0]).includes(format(args[1]));
        }

        packaged() {
            return Scratch.vm.runtime.isPackaged;
        }
    
        currentMillisecond() {
            return Date.now() % 1000;
        }

        turboWarp(){
       return true;
        }
        scratchX(){
            return false;
             }
             get(args) {
                return Scratch.fetch(args[0])
                  .then((r) => r.text())
                  .catch(() => "");
              }
    }

    Scratch.extensions.register(new Utilities());
})(Scratch);
