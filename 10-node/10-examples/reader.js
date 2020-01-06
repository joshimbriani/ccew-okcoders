var fs = require('fs');

console.log("About to Read File");

fs.readFile('about.txt', function(err, data) {
	if (err) {
		console.log("Unable to read file test.txt");
	} else {
		console.log("File Contents:");
      	console.log(data.toString());
	}
});

console.log("Called fs.readFile()\n");
