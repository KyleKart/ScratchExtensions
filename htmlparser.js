class htmlparser {
  getInfo() {
    return {
      id: 'htmlparser',
      name: 'HTMLParser',
      color1: '#ff8100',
      color2: '#ff8100',

      blocks: [
        {
          opcode: 'uni',
          blockType: Scratch.BlockType.REPORTER,
          text: 'unicode [code]',
          "arguments": {
            "code": {
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "😳",
            },
          }
      },
],
};
}
uni({code}) {
  var parser = new DOMParser();
var htmlDoc = parser.parseFromString(code, 'text/html');
console.log(htmlDoc.getElementsByTagName( '*' ).innerText)
  return (htmlDoc.getElementsByTagName( '*' ).innerText)
};
}
Scratch.extensions.register(new htmlparser());
