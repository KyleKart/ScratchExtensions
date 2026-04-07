(function (Scratch) {
    'use strict';

    class extension {
        getInfo() {
            return {
                id: 'ebultravar',
                name: 'Variable Control',
                color1: "#FF8C1A",
                blocks: [
                    {
                        opcode: 'setProp',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [TYPE] [TARGET] prop [PROP] to [INPUT]',
                        extensions: ["colours_data"],
                        arguments: {
                            TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: '' },
                            TARGET: { type: Scratch.ArgumentType.STRING, defaultValue: 'my variable' },
                            PROP: { type: Scratch.ArgumentType.STRING, defaultValue: 'value' },
                            INPUT: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' }
                        }
                    },
                    {
                        opcode: 'allProps',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all [TYPE] [TARGET] props',
                        extensions: ["colours_data"],
                        arguments: {
                            TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: '' },
                            TARGET: { type: Scratch.ArgumentType.STRING, defaultValue: 'my variable' }
                        }
                    },
                    {
                        opcode: 'getProp',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get [TYPE] [TARGET] prop [PROP]',
                        extensions: ["colours_data"],
                        arguments: {
                            TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: '' },
                            TARGET: { type: Scratch.ArgumentType.STRING, defaultValue: 'my variable' },
                            PROP: { type: Scratch.ArgumentType.STRING, defaultValue: 'value' }
                        }
                    }
                ]
            };
        }

        setProp(args, util) {
            const stage = util.target.runtime.getTargetForStage();
            const variable = stage.lookupVariableByNameAndType(args.TARGET, args.TYPE);
            if (!variable) return;

            const prop = args.PROP;
            const value = args.INPUT;

            try {
                variable[prop] = value;
            } catch (e) {
                console.warn(`Cannot set property "${prop}" on ${args.TARGET}:`, e);
            }
        }

        allProps(args, util) {
            const stage = util.target.runtime.getTargetForStage();
            const variable = stage.lookupVariableByNameAndType(args.TARGET, args.TYPE);
            if (!variable) return;
            return variable;
        }

        getProp(args, util) {
            const stage = util.target.runtime.getTargetForStage();
            const variable = stage.lookupVariableByNameAndType(args.TARGET, args.TYPE);
            if (!variable) return;

            const prop = args.PROP;
            try {
                return variable[prop];
            } catch (e) {
                console.warn(`Cannot get property "${prop}" of ${args.TARGET}:`, e);
                return null;
            }
        }
    }

    Scratch.extensions.register(new extension());
})(Scratch);