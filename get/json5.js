(function (Scratch) {
    'use strict';

    const JSON5_URL = 'https://cdn.jsdelivr.net/npm/json5@2/dist/index.min.js';

    async function loadJSON5() {
        if (window.JSON5) return;

        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = JSON5_URL;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load JSON5'));
            document.head.appendChild(script);
        });
    }

    class extension {
        constructor() {
            this.shouldStringify = true;
        }
        getInfo() {
            return {
                id: 'json5converter',
                name: 'JSON5',
                color1: '#4363A6',
                blocks: [
                    {
                        opcode: 'convert',
                        blockType: Scratch.BlockType.REPORTER,
                        exemptFromNormalization: true,
                        text: 'JSON5 [TEXT] to JSON',
                        arguments: {
                            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "{foo: 'bar'}" }
                        }
                    },
                    {
                        opcode: 'toObject',
                        blockType: Scratch.BlockType.OBJECT || Scratch.BlockType.REPORTER,
                        blockShape: Scratch.BlockShape.PLUS,
                        exemptFromNormalization: true,
                        text: 'JSON5 [TEXT] as object',
                        arguments: {
                            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "{foo: 'bar'}" }
                        }
                    },
                    {
                        opcode: 'toArray',
                        blockType: Scratch.BlockType.ARRAY || Scratch.BlockType.REPORTER,
                        blockShape: Scratch.BlockShape.SQUARE,
                        exemptFromNormalization: true,
                        text: 'JSON5 [TEXT] as array',
                        arguments: {
                            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "[1, 2, 3]" }
                        }
                    },
                    {
                        opcode: 'isValid',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is [TEXT] valid JSON5?',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "{foo: 'bar'}"
                            }
                        }
                    },
                    {
                        opcode: 'getError',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'error from JSON5 [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "{foo: 'bar'"
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: '⚠️ Only use if you know what you\'re doing!',
                    },
                    {
                        opcode: 'stringify',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'stringify all outputs? [BOOL]',
                        arguments: {
                            BOOL: {
                                type: Scratch.ArgumentType.BOOLEAN,
                            }
                        }
                    }
                ]
            };
        }

        async convert(args) {
            try {
                await loadJSON5();
                const inp = JSON5.parse(args.TEXT);
                return this.shouldStringify ? JSON.stringify(inp) : inp;
            } catch (e) {
                return "";
            }
        }

        async toObject(args) {
            await loadJSON5();
            const obj = JSON5.parse(args.TEXT);
            if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
                throw new Error("JSON5: Expected an object");
            }
            return this.shouldStringify ? JSON.stringify(obj) : obj;
        }

        async toArray(args) {
            await loadJSON5();
            const arr = JSON5.parse(args.TEXT);
            if (!Array.isArray(arr)) {
                throw new Error("JSON5: Expected an array");
            }
            return this.shouldStringify ? JSON.stringify(arr) : arr;
        }

        async isValid(args) {
            try {
                await loadJSON5();
                JSON5.parse(args.TEXT);
                return true;
            } catch {
                return false;
            }
        }

        async getError(args) {
            try {
                await loadJSON5();
                JSON5.parse(args.TEXT);
                return "";
            } catch (e) {
                return e.message;
            }
        }

        stringify(args) {
            this.shouldStringify = args.BOOL;
        }
    }

    Scratch.extensions.register(new extension());
})(Scratch);