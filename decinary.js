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
          opcode: 'decimal',
          blockType: Scratch.BlockType.REPORTER,
          text: 'decimal [bin]',
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
decimal({bin}) {
    const digit = parseInt(bin, 2);
    return digit
  };
}
Scratch.extensions.register(new decinary());