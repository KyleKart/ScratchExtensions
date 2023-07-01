(function (Scratch) {
    'use strict';
  
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Operartors extension needs to be run unsandboxed!');
  }
  if (Scratch.extensions.unsandboxed) {
    alert("This extension replaces your existing Operators category and adds new blocks!");
}
  const makeLabel = (text) => ({
      blockType: 'label',
      text: text
    });

    class Scratch3OperatorsBlocks {
        getInfo() {
        const bubble = document.querySelector('.scratchCategoryId-operators .scratchCategoryItemBubble');  
          const styles = window.getComputedStyle(bubble);
          const backgroundColor = styles.backgroundColor; // Returns "rgb(75, 130, 234)"
          const borderColor = styles.borderColor; // Returns "rgb(60, 104, 187)"
      
          // Convert RGB to HEX
          function rgbToHex(rgb) {
            const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (match) {
              return "#" + match.slice(1).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
            }
            return rgb;
          }
      
          return {
            id: 'operators',
            name: 'Operators',
            color1: rgbToHex(backgroundColor),
            color2: rgbToHex(borderColor),
            blocks: [ 
                {
                    opcode: 'add',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUM1] [OP] [NUM2]',
                    arguments: {
                        NUM1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1',
                          },
                          NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2',
                          },
                          OP: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '+',
                            menu: 'basicMath'
                          }
                    }
                  },
                  {
                    opcode: 'true',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TF]',
                    arguments: {
                          TF: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'true',
                            menu: 'TF'
                          }
                    }
                  },
            ],   
            menus: {
                basicMath: {
                  acceptReporters: true,
                  items: [
                    '+',
                    '-',
                    '*',
                    '/',
                    '^',
                    'root',
                    'log',
                  ]
                },
                TF: {
                    acceptReporters: true,
                    items: [
                      'true',
                      'false',
                    ]
                  },
              }
        };
    }
    
javascriptOutput (args) {
    return new Promise((resolve, reject) => {
        const js = Scratch.Cast.toString(args.JS);
        SandboxRunner.execute(js).then(result => {
            resolve(result.value)
        })
    })
}
javascriptBoolean(args) {
    return new Promise((resolve, reject) => {
        const js = Scratch.Cast.toString(args.JS);
        SandboxRunner.execute(js).then(result => {
            resolve(result.value === true)
        })
    })
}

charToCode (args) {
    const char = Scratch.Cast.toString(args.ONE);
    if (!char) return NaN;
    return char.charCodeAt(0);
}
codeToChar (args) {
    const code = Scratch.Cast.toNumber(args.ONE);
    return String.fromCharCode(code);
}

toCase (args) {
    const text = Scratch.Cast.toString(args.TEXT);
    switch (args.OPTION) {
    case 'upper':
        return text.toUpperCase();
    case 'lower':
        return text.toLowerCase();
    }
}

indexOfTextInText (args) {
    const lookfor = Scratch.Cast.toString(args.TEXT1);
    const searchin = Scratch.Cast.toString(args.TEXT2);
    let index = 0;
    if (searchin.includes(lookfor)) {
        index = searchin.indexOf(lookfor) + 1;
    }
    return index;
}

lastIndexOfTextInText (args) {
    const lookfor = Scratch.Cast.toString(args.TEXT1);
    const searchin = Scratch.Cast.toString(args.TEXT2);
    let index = 0;
    if (searchin.includes(lookfor)) {
        index = searchin.lastIndexOf(lookfor) + 1;
    }
    return index;
}

textStartsOrEndsWith (args) {
    const text = Scratch.Cast.toString(args.TEXT1);
    const startsOrEnds = Scratch.Cast.toString(args.OPTION);
    const withh = Scratch.Cast.toString(args.TEXT2);
    return (startsOrEnds === "starts") ? (text.startsWith(withh)) : (text.endsWith(withh));
}

countAppearTimes (args) {
    const text = Scratch.Cast.toString(args.TEXT2);
    const otherText = Scratch.Cast.toString(args.TEXT1);

    const aray = text.split(otherText);
    if (aray.length <= 1) {
        return 0;
    }

    return aray.length - 1;
}

textIncludesLetterFrom (args) {
    const text = Scratch.Cast.toString(args.TEXT1);
    const from = Scratch.Cast.toString(args.TEXT2);

    let includes = false;

    const aray = from.split("");
    aray.forEach(i => {
        if (text.includes(i)) includes = true;
    })

    return includes;
}

true (args) { 
    if (args.TF === "true" || args.TF === true){
    return true; 
    }else if (args.TF === "false" || args.TF === false){
    return false;
    }
}



false () { return false; }
randomBoolean () { return Boolean(Math.round(Math.random())); }

constrainnumber (args) {
    return Math.min(Math.max(args.min, args.inp), args.max);
}

lerpFunc (args) {
    const one = isNaN(Scratch.Cast.toNumber(args.ONE)) ? 0 : Scratch.Cast.toNumber(args.ONE);
    const two = isNaN(Scratch.Cast.toNumber(args.TWO)) ? 0 : Scratch.Cast.toNumber(args.TWO);
    const amount = isNaN(Scratch.Cast.toNumber(args.AMOUNT)) ? 0 : Scratch.Cast.toNumber(args.AMOUNT);
    let lerped = one;
    lerped += ((two - one) / (amount / (amount * amount)));
    return lerped;
}
advMath (args) {
    const one = isNaN(Scratch.Cast.toNumber(args.ONE)) ? 0 : Scratch.Cast.toNumber(args.ONE);
    const two = isNaN(Scratch.Cast.toNumber(args.TWO)) ? 0 : Scratch.Cast.toNumber(args.TWO);
    const operator = Scratch.Cast.toString(args.OPTION);
    switch (operator) {
    case "^": return one ** two;
    case "root": return one ** 1 / two;
    case "log": return Math.log(two) / Math.log(one);
    default: return 0;
    }
}

stringify (args) { return Scratch.Cast.toString(args.ONE); }

boolify (args) { return Scratch.Cast.toBoolean(args.ONE); }

newLine () { return "\n"; }

tabCharacter () { return "\t"; }

readLineInMultilineText (args) {
    const line = (Scratch.Cast.toNumber(args.LINE) ? Scratch.Cast.toNumber(args.LINE) : 1) - 1;
    const text = Scratch.Cast.toString(args.TEXT);
    const readline = text.split("\n")[line] || "";
    return readline;
}

getLettersFromIndexToIndexInText (args) {
    const index1 = (Scratch.Cast.toNumber(args.INDEX1) ? Scratch.Cast.toNumber(args.INDEX1) : 1) - 1;
    const index2 = (Scratch.Cast.toNumber(args.INDEX2) ? Scratch.Cast.toNumber(args.INDEX2) : 1) - 1;
    const string = Scratch.Cast.toString(args.TEXT);
    const substring = string.substring(index1, index2);
    return substring;
}

replaceAll (args) {
    return Scratch.Cast.toString(args.text).replaceAll(args.term, args.res);
}
replaceFirst (args) {
    return Scratch.Cast.toString(args.text).replace(args.term, args.res);
}

regexmatch (args) {
    if (!validateRegex(args.reg, args.regrule)) return "[]";
    const regex = new RegExp(args.reg, args.regrule);
    const matches = args.text.match(regex);
    return JSON.stringify(matches ? matches : []);
}

add(args) {
    var operator = args.OP;
    if (operator === "+") {
      return Scratch.Cast.toNumber(args.NUM1) + Scratch.Cast.toNumber(args.NUM2);
    } else if (operator === "-") {
      return Scratch.Cast.toNumber(args.NUM1) - Scratch.Cast.toNumber(args.NUM2);
    } else if (operator === "*") {
      return Scratch.Cast.toNumber(args.NUM1) * Scratch.Cast.toNumber(args.NUM2);
    } else if (operator === "/") {
      return Scratch.Cast.toNumber(args.NUM1) / Scratch.Cast.toNumber(args.NUM2);
    } else if (operator === "^") {
      return Scratch.Cast.toNumber(args.NUM1) ** Scratch.Cast.toNumber(args.NUM2);
    } else if (operator === "root") {
        return Scratch.Cast.toNumber(args.NUM1) ** 1 / Scratch.Cast.toNumber(args.NUM2);
    } else if (operator === "log") {
      return Math.log(Scratch.Cast.toNumber(args.NUM1)) / Math.log(Scratch.Cast.toNumber(args.NUM2));
    }
  }

subtract (args) {
    return Scratch.Cast.toNumber(args.NUM1) - Scratch.Cast.toNumber(args.NUM2);
}

multiply (args) {
    return Scratch.Cast.toNumber(args.NUM1) * Scratch.Cast.toNumber(args.NUM2);
}

divide (args) {
    return Scratch.Cast.toNumber(args.NUM1) / Scratch.Cast.toNumber(args.NUM2);
}

lt (args) {
    return Scratch.Cast.compare(args.OPERAND1, args.OPERAND2) < 0;
}

equals (args) {
    return Scratch.Cast.compare(args.OPERAND1, args.OPERAND2) === 0;
}

notequals (args) {
    return !this.equals(args);
}

gt (args) {
    return Scratch.Cast.compare(args.OPERAND1, args.OPERAND2) > 0;
}

gtorequal (args) {
    return !this.lt(args);
}

ltorequal (args) {
    return !this.gt(args);
}

and (args) {
    return Scratch.Cast.toBoolean(args.OPERAND1) && Scratch.Cast.toBoolean(args.OPERAND2);
}

nand (args) {
    return !(Scratch.Cast.toBoolean(args.OPERAND1) && Scratch.Cast.toBoolean(args.OPERAND2));
}

nor (args) {
    return !(Scratch.Cast.toBoolean(args.OPERAND1) || Scratch.Cast.toBoolean(args.OPERAND2));
}

xor (args) {
    const op1 = Scratch.Cast.toBoolean(args.OPERAND1);
    const op2 = Scratch.Cast.toBoolean(args.OPERAND2);
    return (op1 ? !op2 : op2);
}

xnor (args) {
    return !this.xor(args);
}

or (args) {
    return Scratch.Cast.toBoolean(args.OPERAND1) || Scratch.Cast.toBoolean(args.OPERAND2);
}

not (args) {
    return !Scratch.Cast.toBoolean(args.OPERAND);
}

random (args) {
    return this._random(args.FROM, args.TO);
}
_random (from, to) { // used by compiler
    const nFrom = Scratch.Cast.toNumber(from);
    const nTo = Scratch.Cast.toNumber(to);
    const low = nFrom <= nTo ? nFrom : nTo;
    const high = nFrom <= nTo ? nTo : nFrom;
    if (low === high) return low;
    // If both arguments are ints, truncate the result to an int.
    if (Scratch.Cast.isInt(from) && Scratch.Cast.isInt(to)) {
        return low + Math.floor(Math.random() * ((high + 1) - low));
    }
    return (Math.random() * (high - low)) + low;
}

join (args) {
    return Scratch.Cast.toString(args.STRING1) + Scratch.Cast.toString(args.STRING2);
}

join3 (args) {
    return Scratch.Cast.toString(args.STRING1) + Scratch.Cast.toString(args.STRING2) + Scratch.Cast.toString(args.STRING3);
}

letterOf (args) {
    const index = Scratch.Cast.toNumber(args.LETTER) - 1;
    const str = Scratch.Cast.toString(args.STRING);
    // Out of bounds?
    if (index < 0 || index >= str.length) {
        return '';
    }
    return str.charAt(index);
}

length (args) {
    return Scratch.Cast.toString(args.STRING).length;
}

contains (args) {
    const format = function (string) {
        return Scratch.Cast.toString(string).toLowerCase();
    };
    return format(args.STRING1).includes(format(args.STRING2));
}

mod (args) {
    const n = Scratch.Cast.toNumber(args.NUM1);
    const modulus = Scratch.Cast.toNumber(args.NUM2);
    let result = n % modulus;
    // Scratch mod uses floored division instead of truncated division.
    if (result / modulus < 0) result += modulus;
    return result;
}

round (args) {
    return Math.round(Scratch.Cast.toNumber(args.NUM));
}

mathop (args) {
    const operator = Scratch.Cast.toString(args.OPERATOR).toLowerCase();
    const n = Scratch.Cast.toNumber(args.NUM);
    switch (operator) {
    case 'abs': return Math.abs(n);
    case 'floor': return Math.floor(n);
    case 'ceiling': return Math.ceil(n);
    case 'sqrt': return Math.sqrt(n);
    case 'sin': return Math.round(Math.sin((Math.PI * n) / 180) * 1e10) / 1e10;
    case 'cos': return Math.round(Math.cos((Math.PI * n) / 180) * 1e10) / 1e10;
    case 'tan': return MathUtil.tan(n);
    case 'asin': return (Math.asin(n) * 180) / Math.PI;
    case 'acos': return (Math.acos(n) * 180) / Math.PI;
    case 'atan': return (Math.atan(n) * 180) / Math.PI;
    case 'ln': return Math.log(n);
    case 'log': return Math.log(n) / Math.LN10;
    case 'e ^': return Math.exp(n);
    case '10 ^': return Math.pow(10, n);
    }
    return 0;
}

advlog (args) {
    return (Math.log(Scratch.Cast.toNumber(args.NUM2)) / Math.log(Scratch.Cast.toNumber(args.NUM1)));
}
}

Scratch.extensions.register(new Scratch3OperatorsBlocks());

})(window.Scratch);