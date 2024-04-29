(function (Scratch) {
    class ExtraOperators {

        getInfo() {
            return {
                id: "sbxextraoperators",
                name: "Extra Operators",
                blocks: [
                    {
                        opcode: "joinThree",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "join [s1] [s2] [s3]",
                        arguments: {
                            s1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            s2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "world",
                            },
                            s3: {
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
                        opcode: "rndString",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "random string [chance] [s1] [s2]",
                        arguments: {
                            s1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            s2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "world",
                            },
                            chance: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50,
                            },
                        }
                    }                                      
                ],
            };
        }

        joinThree(args) {
            return args.s1 + args.s2 + args.s3;
        }
        
        true() { 
            return true; 
        }
        
        false() { 
            return false; 
        }
        rndString(args) {
            return Math.random() > args.chance / 100 ? args.s1 : args.s2;
        }
    }

    Scratch.extensions.register(new ExtraOperators());
})(Scratch);
