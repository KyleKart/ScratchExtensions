(function(ext) {
    // Function to replace every word in a string with "Joe"
    function replaceWordsWithJoe(html) {
        // Split the string into words
        var words = html.split(/\s+/);
        
        // Replace each word with "Joe"
        for (var i = 0; i < words.length; i++) {
            words[i] = 'Joe';
        }
        
        // Join the words back into a string
        return words.join(' ');
    }

    // Define a block to replace every word in HTML with "Joe"
    ext.replaceWordsWithJoe = function(html, callback) {
        // Replace words in the HTML
        var newHtml = replaceWordsWithJoe(html);
        
        // Invoke the callback with the manipulated HTML
        callback(newHtml);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'replace every word in HTML %s with "Joe"', 'replaceWordsWithJoe', '<p>Hello, world!</p>']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Joe HTML Extension', descriptor, ext);
})({});