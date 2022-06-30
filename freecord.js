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
            text: 'SEND | Message:[message] URL:[url] Token: [token]',
            "arguments": {
                "message": {
                    "type": "string",
                    "defaultValue": "Hello!"
                },
                "url": {
                    "type": "string",
                    "defaultValue": 'https://discord.com/api/webhooks/ID/TOKEN'
                },
            }
        },
],
};
}
get({url}) {
    return fetch("https://api.allorigins.win/raw?url=" + url).then(response => response.text()).catch(err => 'ERROR');
  };
test({message, url, token}) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : token
        },
        body: JSON.stringify({{
        "content": message,
        "tts": false
        })
      }).then(res => res.json())
        .then(res => console.log(res));
};
}
Scratch.extensions.register(new webhookDiscord());