(function(ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.joinThree = function(s1, s2, s3) {
        return s1 + s2 + s3;
    };

    ext.true = function() {
        return true;
    };

    ext.false = function() {
        return false;
    };

    ext.randomLetter = function(LETTER_TYPE) {
        let letters = "abcdefghijklmnopqrstuvwxyz";
        if (LETTER_TYPE === "uppercase") letters = letters.toUpperCase();
        return letters.charAt(Math.floor(Math.random() * letters.length));
    };

    ext.rndString = function(CHANCE, STRING1, STRING2) {
        return Math.random() > CHANCE / 100 ? STRING2 : STRING1;
    };

    var descriptor = {
        blocks: [
            ['r', 'join %s %s %s', 'joinThree', 'Hello', 'world', '!'],
            ['b', 'true', 'true'],
            ['b', 'false', 'false'],
            ['r', 'random letter %m.LETTER_TYPE', 'randomLetter', 'lowercase'],
            ['r', 'random string %n %s %s', 'rndString', 50, 'String 1', 'String 2'],
        ],
        menus: {
            LETTER_TYPE: ['lowercase', 'uppercase'],
        }
    };

    ScratchExtensions.register('Extra Operators', descriptor, ext);
})({});
