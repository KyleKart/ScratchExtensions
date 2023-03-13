class BasicK {
    getInfo() {
      return {
        id: 'basick',
        name: 'Basic_K',    
      
   blocks: [
        {
          opcode: 'tf',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[input1] = [input2] = [input3]',
          "arguments": {
            "input1": {
              "type": "string",
              "defaultValue": "true",
              "menu": "options1",
            },
            "input2": {
                "type": "string",
                "defaultValue": 'false',
                "menu": "options1",
            },
            "input3": {
                "type": "string",
                "defaultValue": '×',
                "menu": "options2",
            },
          }
        },
],
menus: {
    options1: {
        acceptReporters: true,
        items: [{ text: "true", value: "true"}, {text: "false", value: "false"}, { text: "1", value: "1"}, {text: "0", value: "0"}]
    },
    options2: {
        acceptReporters: true,
        items: [{ text: "×", value: "×"}, { text: "true", value: "true"}, {text: "false", value: "false"}, { text: "1", value: "1"}, {text: "0", value: "0"}]
    }
}
};
    }
  tf({input1, input2, input3}) {
    var text1 = input1
    var text2 = input2
    var text3 = input3
    console.log("Before: " + text1);
    console.log("Before: " + text2);
    console.log("Before: " + text3);
    if (input1 == true) var text1 = "true";
    if (input1 == false) var text1 = "false";
    if (input2 == true) var text2 = "true";
    if (input2 == false) var text2 = "false";
    if (input3 == true) var text3 = "true";
    if (input3 == false) var text3 = "false";
    console.log("After: " + text1);
    console.log("After: " + text2);
    console.log("After: " + text3);
    if (text1 == text2 && text2 == text3) {
        return "true"
    } else if (text1 == text2 && text3 == "×") {
    return "true"
    } else 
        return "false"
};
}
Scratch.extensions.register(new BasicK());