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
        },  '---',  {
             opcode: 'test',
            blockType: Scratch.BlockType.COMMAND,
            text: 'SEND | Message:[message] URL:[url] Embed:[embed]',
            "arguments": {
                "message": {
                    "type": "string",
                    "defaultValue": "Hello!",
                },
                "url": {
                    "type": "string",
                    "defaultValue": 'https://discord.com/api/webhooks/ID/TOKEN',

                },
                "true": {
                    "type": "string",
                    "defaultValue": 'false',
                    "menu": "embed",
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
get({url}) {
    return fetch("https://api.allorigins.win/raw?url=" + url).then(response => response.text()).catch(err => 'ERROR');
  };
  tf({input1, input2}) {
    var text1 = "true"
    var text2 = "false"

    if (input1 == true);
    var text1 = "true"
    if (input1 == false);
    var text1 = "false"

    if (input2 == true);
    var text2 = "true"
    if (input2 == false);
    var text2 = "false"

    if (text1 == text2){
        return "true";
    }else
    return "true";
};
}
Scratch.extensions.register(new BasicK());