class cursedBlocks {
    getInfo() {
      return {
        id: 'cursedblocks',
        name: 'C U R S E D',    

   blocks: [
        {
          opcode: 'touchie',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'touchie to [input1] ?',
          "arguments": {
            "input1": {
              "type": "string",
              "defaultValue": "",
              "menu": "options1",
            },
          }
        },
        {
            opcode: 'nds',
            blockType: Scratch.BlockType.COMMAND,
            text: 'go to x: nds',
            "arguments": {
              "input1": {
                "type": "string",
                "defaultValue": "",
                "menu": "options1",
              },
            }
          },
          {
            opcode: 'secoo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'wait [sec] secꝏ [input]',
            "arguments": {
              "sec": {
                "type": "string",
                "defaultValue": "1",
              },
              "input": {
                "type": "string",
                "defaultValue": "0",
              },
            }
          },
          {
            opcode: 'stop',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop [a] by [noomber]',
            "arguments": {
                "a": {
                    "type": "string",
                    "defaultValue": "a",
                    "menu": "options2",
                  },
              "noomber": {
                "type": "string",
                "defaultValue": "1",
              },
            }
          },
          {
            opcode: 'theceive',
            blockType: Scratch.BlockType.HAT,
            text: 'when theceive [event]',
            "arguments": {
                "event": {
                    "type": "string",
                    "defaultValue": "",
                    "menu": "options1",
                  },
            }
          },
],
menus: {
    options1: {
        acceptReporters: true,
        items: [{ text: " ", value: " "}]
    }, 
    options2: {
        acceptReporters: false,
        items: [{ text: "a", value: "a"}]
    }, 
} 
};
    }
  touchie({input1}) {

};
}
Scratch.extensions.register(new cursedBlocks());