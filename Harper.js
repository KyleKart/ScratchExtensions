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
              "defaultValue": "?",
            },
          }
      },
],
};
}
uni({emoji}) {
  var gif = ["Yes.", "*Harper doesn't know.*", "Stop asking dumb questions.", "Without a doubt.", "Yes definitely.", "Most likely.", "Nah.", "As I see it, yes.", "Signs point to go away.", "Ask again later, I am tired.", "Signs point to yes.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful.", "Stop bugging me.", "Did you really just ask that?", "*Harper is bored*.", "*Yaaaawn*."]
  var randomResponse = gif[Math.floor(Math.random() * gif.length)];
};
}
Scratch.extensions.register(new kylesAddon());
