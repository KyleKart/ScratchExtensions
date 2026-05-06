(function (Scratch) {
'use strict';

let screenOutput = "";
let libraryLoaded = false;

const tiScript = document.createElement("script");
tiScript.src = "https://cdn.jsdelivr.net/npm/ti-js@latest/dist/web/ti.min.js";
tiScript.onload = () => {
    libraryLoaded = true;
};
document.head.appendChild(tiScript);

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
                        STRING: { 
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Disp "HELLO"'
                        }
                    }
                },
                {
                    opcode: 'screen',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'screen as [MENU]',
                    arguments: {
                        MENU: { type: Scratch.ArgumentType.STRING, menu: "screen" }
                    }
                },
                {
                    opcode: 'prgm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[MENU][STRING]',
                    arguments: {
                        MENU: { type: Scratch.ArgumentType.STRING, menu: "prgm" },
                        STRING: { type: Scratch.ArgumentType.STRING, defaultValue: '"HELLO"' }
                    }
                }
            ],
            menus: {
                screen: {
                    acceptReporters: false,
                    items: ["text", "array", "last line", "line count"],
                },
                prgm: {
                    acceptReporters: false,
                    items: [
                        "Disp", "Output(", "Input", "Prompt", "ClrHome", 
                        "If", "Then", "Else", "End", "For(", "While", "Repeat", 
                        "Pause", "Stop", "Return", "GetKey", "Menu("
                    ],
                }
            },
        };
    }

    async runBasic(args) {
        if (!libraryLoaded || typeof ti === 'undefined') return;

        const code = args.STRING;

        if (code.includes("ClrHome")) {
            screenOutput = "";
        }

        try {
            const result = await new Promise(resolve => {
                ti.exec(code, (res) => resolve(res));
            });

            if (result !== undefined && result !== null && result !== "") {
                screenOutput += result + "\n";
            }
        } catch (e) {
            screenOutput += "ERR\n";
        }
    }

    screen(args) {
        const raw = screenOutput || "";
        const lines = raw.split("\n").filter(l => l.trim() !== "");
        
        switch (args.MENU) {
            case "array":
                return JSON.stringify(lines);
            case "last line":
                return lines[lines.length - 1] || "";
            case "line count":
                return lines.length;
            default:
                return raw.trim();
        }
    }

    prgm(args) {
        const cmd = args.MENU;
        const val = args.STRING;
        
        if (cmd === "ClrHome") return "ClrHome";
        if (cmd.endsWith("(")) return `${cmd}${val})`;
        return `${cmd} ${val}`;
    }
}

Scratch.extensions.register(new extension());
})(Scratch);