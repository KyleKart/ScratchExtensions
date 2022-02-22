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
        },  {
            opcode: 'test',
            blockType: Scratch.BlockType.COMMAND,
            text: 'idk [test]',
            "arguments": {
              "test": {
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
  test({test}) {
    return alert(test);
  };
}
Scratch.extensions.register(new kylesAddon());