class BasicK {
    getInfo() {
      return {
        id: 'basick',
        name: 'Basic_K',    
      
   blocks: [
        {
          opcode: 'get',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[input] [true]',
          "arguments": {
            "input": {
              "type": Scratch.ArgumentType.BOOLEAN,
              "defaultValue": "",
            },
            "true": {
                "type": "string",
                "defaultValue": 'false',
                "menu": "embed",
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
    embed: {
        acceptReporters: true,
        items: [{ text: "true", value: "true"}, {text: "false", value: "false"}]
    }
}
};
}
get({url}) {
    return fetch("https://api.allorigins.win/raw?url=" + url).then(response => response.text()).catch(err => 'ERROR');
  };
  test({input, embed}) {
    if (embed){
       return true 
    }else
    return false
};
}
Scratch.extensions.register(new BasicK());