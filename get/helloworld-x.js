(function(ext) {
    // Define a block to output "Hello, world!"
    ext.sayHello = function(callback) {
        // Invoke the callback with the string "Hello, world!"
        callback("Hello, world!");
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'say hello', 'sayHello']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Hello World Extension', descriptor, ext);
})({});