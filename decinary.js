class decinary {
    getInfo() {
      return {
        id: 'decinary',
        name: 'Decinary',    
        color1: '#5865F2',
        color2: '#5865F2',
        color3: '#5865F2',
      
   blocks: [
        {
          opcode: 'get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get [bin]',
          "arguments": {
            "bin": {
              "type": Scratch.ArgumentType.STRING,
              "defaultValue": "apple",
            }
          }
        },
],
};
}
get({bin}) {
    const digit = parseInt(bin, 2);
    return digit
  };
}
Scratch.extensions.register(new decinary());