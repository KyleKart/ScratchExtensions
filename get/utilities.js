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
                        opcode: "randomLetter",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "random letter [0]",
                        arguments: {
                            0: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "lowercase",
                                menu: "letterTypeMenu",
                            },
                        },
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
                    }                                      
                ],
                menus: {
                    letterTypeMenu: [
                        {
                            text: "lowercase",
                            value: "lowercase",
                        },
                        {
                            text: "uppercase",
                            value: "uppercase",
                        }
                    ]
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
        randomLetter(args) {
            let letters = "abcdefghijklmnopqrstuvwxyz";
            if (args[0] === "uppercase") letters = letters.toUpperCase();
            return letters.charAt(Math.floor(Math.random() * letters.length));
        }
        rndString(args) {
            return Math.random() > args[0] / 100 ? args[1] : args[2];
        }
    }

    Scratch.extensions.register(new Utilities());
})(Scratch);
