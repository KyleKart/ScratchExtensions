(function (Scratch) {
    "use strict";

    const vm = Scratch.vm;
    const runtime = vm.runtime;

    class Varray {
        constructor() { }

        getInfo() {
            return {
                id: "ebvarray",
                name: "Varray",
                color1: "#FF8C1A",
                blocks: [
                    {
                        opcode: 'setVarTo',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [VARIABLE] to [ITEM]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'addToVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'add [ITEM] to [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    "---",
                    {
                        opcode: 'deleteOfVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete [ITEM] of [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'deleteAllOfVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete all of [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'insertAtVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'insert [ITEM] at [NUM] of [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
                            NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'replaceItemOfVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'replace item [NUM] of [VARIABLE] with [ITEM]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
                            NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    "---",
                    {
                        opcode: 'getItemOfVar',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item [ITEM] of [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'getItemNumOfVar',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item # of [ITEM] in [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'lengthOfVar',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'length of [VARIABLE]',
                        extensions: ["colours_data"],
                        arguments: {
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    {
                        opcode: 'varContainsItem',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[VARIABLE] contains [ITEM]?',
                        extensions: ["colours_data"],
                        arguments: {
                            ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: "thing" },
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                    "---",
                    {
                        opcode: 'varAsString',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VARIABLE] as string',
                        extensions: ["colours_data"],
                        arguments: {
                            VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
                        },
                    },
                ],
                menus: {
                    variableMenu: {
                        acceptReporters: true,
                        items: "getVariables"
                    },
                    types: {
                        acceptReporters: true,
                        items: ["array", "string"]
                    },
                }
            };
        }

        getVariables() {
            const globalVars = Object.values(runtime.getTargetForStage().variables).filter(x => x.type == "");
            const localVars = Object.values(vm.editingTarget.variables).filter(x => x.type == "");
            const uniqueVars = [...new Set([...globalVars, ...localVars])];
            if (uniqueVars.length === 0) return ["make a variable"];
            return uniqueVars.map(i => Scratch.Cast.toString(i.name));
        }

        lengthOfVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                let parsed;

                try {
                    parsed = JSON.parse(value);
                } catch (e) {
                    parsed = value;
                }

                if (Array.isArray(parsed)) {
                    return parsed.length;
                }

                const str = Scratch.Cast.toString(parsed);
                return str.length;
            } catch (e) {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                return value.length;
            }
        }

        addToVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                try {
                    let VAR = JSON.parse(value);
                    if (Array.isArray(VAR)) {
                        VAR.push(args.ITEM);
                        variable.value = JSON.stringify(VAR);
                        return;
                    }
                } catch {
                }

                if (typeof value === "string") {
                    variable.value = value + args.ITEM;
                    return;
                }

                variable.value = JSON.stringify([args.ITEM]);

            } catch {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                variable.value = JSON.stringify([args.ITEM]);
            }
        }

        deleteOfVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                let VAR = JSON.parse(value);
                if (Array.isArray(VAR)) {
                    const index = Number(args.ITEM) - 1;
                    if (index >= 0 && index < VAR.length) {
                        VAR.splice(index, 1);
                        variable.value = JSON.stringify(VAR);
                    }
                }
            } catch { }
        }
        
        deleteAllOfVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);

                try {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                        variable.value = JSON.stringify([]);
                        return;
                    }
                } catch { }

                variable.value = "";
            } catch { }
        }

        getItemOfVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = variable.value;
                const index = Number(args.ITEM) - 1;

                let parsed;

                try {
                    parsed = JSON.parse(Scratch.Cast.toString(value));
                } catch {
                    parsed = Scratch.Cast.toString(value);
                }

                if (Array.isArray(parsed)) {
                    if (index >= 0 && index < parsed.length) {
                        return parsed[index];
                    }
                } else {
                    const str = Scratch.Cast.toString(parsed);
                    if (index >= 0 && index < str.length) {
                        return str.charAt(index);
                    }
                }

                return "";
            } catch {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const str = Scratch.Cast.toString(variable.value);
                const index = Number(args.ITEM) - 1;
                return str.charAt(index) || "";
            }
        }

        getItemNumOfVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);

                let parsed;

                try {
                    parsed = JSON.parse(Scratch.Cast.toString(value));
                } catch {
                    parsed = Scratch.Cast.toString(value);
                }

                if (Array.isArray(parsed)) {
                    const index = parsed.indexOf(args.ITEM);
                    return index >= 0 ? index + 1 : 0;
                }
                if (typeof parsed === "string") {
                    const index = parsed.indexOf(args.ITEM);
                    return index >= 0 ? index + 1 : 0;
                }

                return 0;
            } catch {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                const str = "" + value;
                const index = str.indexOf(args.ITEM);
                return index >= 0 ? index + 1 : 0;
            }
        }

        varContainsItem(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                let parsed = value;

                try {
                    parsed = JSON.parse(value);
                } catch (e) {
                    parsed = value;
                }

                const parsedStr = String(parsed);

                if (Array.isArray(parsed)) {
                    return parsed.includes(args.ITEM);
                }
                if (typeof parsed === "string" || typeof parsedStr === "string") {
                    return parsedStr.includes(args.ITEM);
                }

                return false;
            } catch (e) {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                return ("" + value).includes(args.ITEM);
            }
        }

        insertAtVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const index = Math.max(0, Number(args.NUM) - 1);

                try {
                    let VAR = JSON.parse(variable.value);
                    if (Array.isArray(VAR)) {
                        const insertIndex = Math.min(VAR.length, index);
                        VAR.splice(insertIndex, 0, args.ITEM);
                        variable.value = JSON.stringify(VAR);
                        return;
                    }
                } catch {
                }

                let str = Scratch.Cast.toString(variable.value);
                const safeIndex = Math.min(str.length, index);
                const result = str.slice(0, safeIndex) + args.ITEM + str.slice(safeIndex);
                variable.value = result;

            } catch {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                variable.value = args.ITEM;
            }
        }

        replaceItemOfVar(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = variable.value;
                const index = args.NUM - 1;

                let parsed;
                try {
                    parsed = JSON.parse(Scratch.Cast.toString(value));
                } catch {
                    parsed = Scratch.Cast.toString(value);
                }

                if (Array.isArray(parsed)) {
                    if (index >= 0 && index < parsed.length) {
                        parsed[index] = args.ITEM;
                        variable.value = JSON.stringify(parsed);
                    }
                } else {
                    const str = Scratch.Cast.toString(parsed);
                    if (index >= 0 && index < str.length) {
                        const newStr = str.slice(0, index) + args.ITEM + str.slice(index + 1);
                        variable.value = newStr;
                    }
                }
            } catch { }
        }
        varAsString(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                const value = Scratch.Cast.toString(variable.value);
                let parsed = value;

                try {
                    parsed = JSON.parse(Scratch.Cast.toString(value));
                } catch {
                }

                if (Array.isArray(parsed)) {
                    return parsed.join("");
                }

                return "" + parsed;
            } catch (e) {
                return null;
            }
        }
        setVarTo(args, util) {
            try {
                const variable = util.target.lookupVariableByNameAndType(args.VARIABLE, "");
                variable.value = args.ITEM;
            } catch { }
        }

    }

    Scratch.extensions.register(new Varray());
})(Scratch);