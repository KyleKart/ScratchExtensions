(function(ext) {
    
    ext.sayHello = function(callback) {
        callback("Hello, world!");
    };

    var descriptor = {
        blocks: [
            ['R', 'say hello', 'sayHello']
        ]
    };

    ScratchExtensions.register('Hello World Extension', descriptor, ext);
})({});