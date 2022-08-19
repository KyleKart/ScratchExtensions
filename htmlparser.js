var parser = new DOMParser();
var htmlDoc = parser.parseFromString("<html><head><title>titleTest</title></head><body><p>Hello World!</p></body></html>", 'text/html');
console.log(htmlDoc.getElementsByTagName( 'p' ).length)
