(function(ext) {
    // Define a block to replace every word in HTML with "Joe"
    ext.replaceWordsWithJoe = function(html, callback) {
        // Manipulate the HTML content to replace every word with "Joe"
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var textNodes = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null, false);
        var node;
        while (node = textNodes.nextNode()) {
            var words = node.nodeValue.split(/\s+/);
            for (var i = 0; i < words.length; i++) {
                words[i] = 'Joe';
            }
            node.nodeValue = words.join(' ');
        }
        // Invoke the callback with the manipulated HTML
        callback(doc.body.innerHTML);
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