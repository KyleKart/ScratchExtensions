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
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://discord.com/api/webhooks/945524710047895573/krPI5xZVFIrhZTlIUW-dJgx5y3dob4G2COPPr7b3bTIzYyz7kjFuukZf60T9NhSvg1pe");
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    var data = `{ "username":"Funky Fred",
  "{
    "username":"@{{UserName}}",
    "icon_url":"<url to image>",
    "content":"{{LinkToTweet}}"
  }"
}
}]
}`;
    
    xhr.send(data);
  };
}
Scratch.extensions.register(new kylesAddon());