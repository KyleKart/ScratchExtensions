(function(ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.sayHello = function() {
        return("Hello, world!");
    };

    var descriptor = {
        blocks: [
            ['r', 'say hello', 'sayHello']
        ]
    };

    ScratchExtensions.register('Hello World Extension', descriptor, ext);
})({});