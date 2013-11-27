var http = require('http');
var urlOpts = {host: 'www.node.org', path: '/', port: '80'};

http.get(urlOpts, function (res) {
	res.on('data', function(chunk) {
		console.log(chunk.toString());
		/* Act on the event */
	});
});

