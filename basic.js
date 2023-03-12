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
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "true",
              "menu": "input01",
            },
            "input2": {
                "type": "string",
                "defaultValue": 'false',
                "menu": "input02",
            },
          }
        },
],
menus: {
    input01: {
        acceptReporters: true,
        items: [{ text: "true", value: "true"}, {text: "false", value: "false"}]
    }
},
input02: {
    acceptReporters: true,
    items: [{ text: "true", value: "true"}, {text: "false", value: "false"}]
}
};
}
  tf({input1, input2}) {
    if (input1 == input2){
        return "true";
    }else
    return "true";
};
}
Scratch.extensions.register(new BasicK());