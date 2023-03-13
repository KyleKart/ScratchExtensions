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
    var text1 = input1
    var text2 = input2
    console.log("Before: " + text1);
    console.log("Before: " + text2);
    if (input1 == true) var text1 = "true";
    if (input1 == false) var text1 = "false";
    if (input2 == true) var text2 = "true";
    if (input2 == false) var text2 = "false";
    console.log("After: " + text1);
    console.log("After: " + text2);
    if (text1 == text2) {
        return "true"
    } else
    return "false"
};
}
Scratch.extensions.register(new BasicK());