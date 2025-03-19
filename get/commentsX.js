(function (ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.commentHat = function() { 
    };
    ext.commentRect = function() { 
    };
    ext.commentLoop = function() { 
        return true;
    };
    ext.commentReporter = function(input) { 
        return input;
    };
    ext.commentBoolean = function(input) { 
        return input || false;
    };
    ext.commentObj = function(input) { 
        return input;
    };
    ext.commentArray = function(input) { 
        return input;
    };

    var blocks = [
    ['h', '// %s', 'commentHat', ''],
    ['', '// %s', 'commentRect', ''],
    ['c', '// %s', 'commentLoop', ''],
    ['r', '%s // %s', 'commentReporter', ''],
    ['b', '%b // %s', 'commentBoolean', ''],
    ['obj', '%s // %s', 'commentObj', ''],
    ['a', '%s // %s', 'commentArray', ''],
    ];
    var colors = null;

    var descriptor = {
        blocks,
        colors,
    };

    ScratchExtensions.register('Comment Blocks', descriptor, ext);
})({});
