(function (Scratch) {
    'use strict';

    class extension {
        getInfo() {
            return {
                id: 'ebblockeditor',
                name: 'Block Manipulator',
                color1: '#345678',
                blocks: [
                    {
                        opcode: 'getAllIds',
                        blockType: Scratch.BlockType.ARRAY,
                        text: 'all block ids'
                    },
                    {
                        opcode: 'getIdByOpcode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'id of first [OPCODE] block',
                        arguments: {
                            OPCODE: { type: Scratch.ArgumentType.STRING, defaultValue: 'motion_movesteps' }
                        }
                    },
                    {
                        opcode: 'listAllProps',
                        blockType: Scratch.BlockType.ARRAY,
                        text: 'all properties of [ID]',
                        arguments: {
                            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ID_HERE' }
                        }
                    },
                    {
                        opcode: 'getRawProp',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[PROP] of [ID]',
                        arguments: {
                            PROP: { type: Scratch.ArgumentType.STRING, defaultValue: 'deletable_' },
                            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ID_HERE' }
                        }
                    },
                    {
                        opcode: 'setRawProp',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [PROP] of [ID] to [VALUE]',
                        arguments: {
                            PROP: { type: Scratch.ArgumentType.STRING, defaultValue: 'deletable_' },
                            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'ID_HERE' },
                            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'false' }
                        }
                    }
                ]
            };
        }

        _getWorkspace() {
            const ws = Blockly.getMainWorkspace();
            if (!ws) throw new Error("Workspace not found");
            return ws;
        }

        _getBlock(id) {
            const block = this._getWorkspace().getBlockById(id);
            if (!block) throw new Error(`Block with ID ${id} not found`);
            return block;
        }

        listAllProps(args) {
            return Object.keys(this._getBlock(args.ID));
        }

        getRawProp(args) {
            const block = this._getBlock(args.ID);
            if (!(args.PROP in block)) throw new Error(`Property ${args.PROP} does not exist on block`);
            return block[args.PROP];
        }

        getAllIds() {
            return this._getWorkspace().getAllBlocks().map(b => b.id);
        }

        getIdByOpcode(args) {
            const block = this._getWorkspace().getAllBlocks().find(b => b.type === args.OPCODE);
            if (!block) throw new Error(`No block found with opcode ${args.OPCODE}`);
            return block.id;
        }

        setRawProp(args) {
            const block = this._getBlock(args.ID);

            let val = args.VALUE;
            if (val === 'true') val = true;
            else if (val === 'false') val = false;
            else if (val !== '' && !isNaN(val)) val = Number(val);

            block[args.PROP] = val;
            block.render();
        }
    }

    Scratch.extensions.register(new extension());
})(Scratch);