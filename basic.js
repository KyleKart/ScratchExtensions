class BasicK {
    getInfo() {
      return {
        id: 'basick',
        name: 'Basic_K',    
      
   blocks: [
        {
          opcode: 'tf',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[input1] = [input2]',
          "arguments": {
            "input1": {
              "type": "string",
              "defaultValue": "true",
              "menu": "embed",
            },
            "input2": {
                "type": "string",
                "defaultValue": 'false',
                "menu": "embed",
            },
          }
        },
],
menus: {
    embed: {
        acceptReporters: true,
        items: [{ text: "true", value: "true"}, {text: "false", value: "false"}]
    }
}
};
    }
  tf({input1, input2}) {
    if (input1 == input2) {
        return true
    } else
    return false
};
}
Scratch.extensions.register(new BasicK());