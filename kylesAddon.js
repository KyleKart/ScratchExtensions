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
            text: 'idk [url]',
            "arguments": {
              "url": {
                "type": Scratch.ArgumentType.STRING,
                "defaultValue": "hello",
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
    var xhr = new XMLHttpRequest();
    xhr.open("POST", args);
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    var data = `{ "username":"Funky Fred",
  "avatar_url":"https://cdn.discordapp.com/attachments/876953412497969169/891302670348976189/download_14.png", "content":"{{Author}} just posted this on r/{{Subreddit}}!", "embeds":[{ "title" : "{{Title}}", "description": " {{Content}}", "author": { "name": "{{Author}}" }, "url" : "{{PostURL}}", "image": {
      "url": "{{ImageURL}}"
}
}]
}`;
    
    xhr.send(data);
  };
}
Scratch.extensions.register(new kylesAddon());