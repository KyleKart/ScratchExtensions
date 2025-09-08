(function (Scratch) {
    'use strict';

    const tiScript = document.createElement("script");
    tiScript.src = "https://cdn.jsdelivr.net/npm/ti-js@latest/dist/web/ti.min.js";
    document.head.appendChild(tiScript);

    let screen = "";

    class extension {
        getInfo() {
            return {
                id: 'ebTIBASIC',
                name: 'TI-Basic',
                color1: '#425170',
                blocks: [
                    {
                        opcode: 'runBasic',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'run [STRING]',
                        arguments: {
                            STRING: { type: Scratch.ArgumentType.STRING }
                        }
                    },
                    {
                        opcode: 'prgm',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[MENU][STRING]',
                        disableMonitor: true,
                        arguments: {
                            MENU: { type: Scratch.ArgumentType.STRING, menu: "prgm" },
                            STRING: { type: Scratch.ArgumentType.STRING }
                        }
                    },
                    {
                        opcode: 'screen',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'screen as [MENU]',
                        disableMonitor: true,
                        arguments: {
                            MENU: { type: Scratch.ArgumentType.STRING, menu: "screen" }
                        }
                    },
                ],
                menus: {
                    screen: {
                        acceptReporters: false,
                        items: [
                            "text",
                            "array",
                        ],
                    },
                    prgm: {
                        acceptReporters: false,
                        items: [
                            "Disp",
                        ],
                    },
                },
            };
        }

        async runBasic(args) {
            if (args.STRING.includes("ClrHome")) {
                screen = "";
            } else {
                const output = await new Promise(resolve => {
                    ti.exec(args.STRING, result => resolve(result));
                });
                screen += output + "\n";
            }
        }

        screen(args) {
            if (args.MENU === "text") {
                return screen.trim();
            } else if (args.MENU === "array") {
                return JSON.stringify(screen
                    .split("\n")
                    .map(line => line.trim())
                    .filter(line => line.length > 0));
            }
            return screen.trim();
        }

        prgm(args) {
            const space = ["Disp"];
            if (space.includes(args.MENU)) {
                return args.MENU + " " + args.STRING;
            } else {
                return args.MENU + args.STRING;
            }
        }
    }

    Scratch.extensions.register(new extension());
})(Scratch);