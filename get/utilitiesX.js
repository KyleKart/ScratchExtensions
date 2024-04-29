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

    ext.rndString = function(chance, s1, s2) {
        return Math.random() > chance / 100 ? s2 : s1;
    };

    ext.contains = function(s1, s2) {
        const format = function (string) {
            return string.toString().toLowerCase();
        };
        return format(s1).includes(format(s2));
    };

    ext.contains = function(s1, s2, s3) {
        const format = function (string) {
            return string.toString().toLowerCase();
        };
        const text = format(s1);
        const startsOrEnds = format(s2);
        const withh = format(s3);
        return (startsOrEnds === "starts") ? (text.startsWith(withh)) : (text.endsWith(withh));
    }

    var descriptor = {
        blocks: [
            ['r', 'join %s %s %s', 'joinThree', 'Hello', 'world', '!'],
            ['b', 'true', 'true'],
            ['b', 'false', 'false'],
            ['r', 'random letter %m.LETTER_TYPE', 'randomLetter', 'lowercase'],
            ['r', 'random string %n %s %s', 'rndString', 50, 'String 1', 'String 2'],
            ['b', '%s contains %s?', 'contains', 'apple', 'a'],
            ['b', '%s %m.startsEndsMenu with %s?', 'textStartsOrEndsWith', 'abcdef', 'abc'],
        ],
        menus: {
            LETTER_TYPE: ['lowercase', 'uppercase'],
            startsEndsMenu: ["starts", "ends"]
        }
    };

    ScratchExtensions.register('Utilities', descriptor, ext);
})({});