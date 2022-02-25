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
          text: 'unicode [url]',
          "arguments": {
            "url": {
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "😳",
            },
          }
      },
],
};
}
get({url}) {
  url.charCodeAt(0);
};
}
Scratch.extensions.register(new kylesAddon());