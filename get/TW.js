(function (Scratch) {
    'use strict';
  
  const makeLabel = (text) => ({
      blockType: 'label',
      text: text,
      blocks: [
        {
            opcode: "argumentReporterBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
        },
      ]
    });

class Scratch3ProcedureBlocks {

    getInfo() {
        return {
            id: 'procedures',
            name: 'My Blocks',
        };
    }
    getPrimitives () {
        return {
            procedures_definition: this.definition,
            procedures_call: this.call,
            argument_reporter_string_number: this.argumentReporterStringNumber,
            argument_reporter_boolean: this.argumentReporterBoolean
        };
    }
      argumentReporterBoolean(args, util) {
        const value = util.getParam(args.VALUE);
      
        if (value === null) {
          const lowercaseValue = String(args.VALUE).toLowerCase();
      
          if (util.target.runtime.compilerOptions.enabled && lowercaseValue === 'is compiled?') {
            return true;
          }
      
          if (lowercaseValue === 'is turbowarp?') {
            return true;
          }
      
          // When the parameter is not found in the most recent procedure
          // call, the default is always 0.
          return 0;
        }
      
        return value;
      }
}

Scratch.extensions.register(new Scratch3ProcedureBlocks());

})(window.Scratch);
