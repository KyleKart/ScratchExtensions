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
            text: 'MessageSend',
            "arguments": {
                "text": {
                  "type": Scratch.ArgumentType.STRING,
                  "defaultValue":'foo',
                }
              }
        },
      ]
    }  
  }
get({url}) {
    return fetch("https://api.allorigins.win/raw?url=" + url).then(response => response.text()).catch(err => 'ERROR');
  };
  test(args) {
    return fetch('https://discord.com/api/webhooks/945524710047895573/krPI5xZVFIrhZTlIUW-dJgx5y3dob4G2COPPr7b3bTIzYyz7kjFuukZf60T9NhSvg1pe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username":"name",
            "content":args
        })
      }).then(res => res.json())
        .then(res => console.log(res));
};
}
Scratch.extensions.register(new webhookDiscord());