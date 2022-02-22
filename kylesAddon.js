class kylesAddon {
  getInfo() {
    return {
      id: 'kyleaddon',
      name: 'Kyle\'sAdoon',
      color1: '#ff8100',
      color2: '#ff8100',
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
            text: 'idk',
        },
      ]
    }  
  }
get({url}) {
    return fetch("https://api.allorigins.win/raw?url=" + url).then(response => response.text()).catch(err => 'ERROR');
  };
  test() {
    return fetch('https://discord.com/api/webhooks/945524710047895573/krPI5xZVFIrhZTlIUW-dJgx5y3dob4G2COPPr7b3bTIzYyz7kjFuukZf60T9NhSvg1pe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({str: {
            "username":"name",
            "content":"message"
        }})
      }).then(res => res.json())
        .then(res => console.log(res));
};
}
Scratch.extensions.register(new kylesAddon());