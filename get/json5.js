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
        getInfo() {
            return {
                id: 'json5converter',
                name: 'JSON5',
                color1: '#4363A6',
                blocks: [
                    {
                        opcode: 'convert',
                        blockType: Scratch.BlockType.OBJECT || Scratch.BlockType.REPORTER,
                        text: 'JSON5 [TEXT] to JSON',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "{foo: 'bar'}"
                            }
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
                    }
                ]
            };
        }

        async convert(args) {
            try {
                await loadJSON5();
                const obj = JSON5.parse(args.TEXT);
                return Scratch.BlockType.OBJECT ? obj : JSON.stringify(obj);
            } catch (e) {
                return "";
            }
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
    }

    Scratch.extensions.register(new extension());
})(Scratch);