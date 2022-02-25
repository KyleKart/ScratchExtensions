class kylesAddon {
  getInfo() {
    return {
      id: 'kyleaddon',
      name: 'Kyle\'sAdoon',
      color1: '#ff8100',
      color2: '#ff8100',

      blocks: [
        {
          opcode: 'uni',
          blockType: Scratch.BlockType.REPORTER,
          text: 'unicode [url]',
          "arguments": {
            "emoji": {
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "😳",
            },
          }
      },
],
};
}
uni({emoji}) {
  emoji.charCodeAt(0);
};
}
Scratch.extensions.register(new kylesAddon());