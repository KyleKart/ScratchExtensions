class webhookDiscord {
    getInfo() {
      return {
        id: 'discord',
        name: 'DiscordWebhook',    
        color1: '#5865F2',
        color2: '#5865F2',
        color3: '#5865F2',
      
   blocks: [
        {
          opcode: 'get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get [url]',
          "arguments": {
            "url": {
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "https://reqbin.com/echo/get/json",
            }
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
                "embed": {
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
  test({message, url}) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username":"Scratch Project",
            "avatar_url": "https://raw.githubusercontent.com/KyleKart/ScratchExtensions/gh-pages/pfp.png",
            "content":message
        })
      }).then(res => res.json())
        .then(res => console.log(res))
        .catch( err => {
        console.log(err);
        })
        
};
}
Scratch.extensions.register(new webhookDiscord());