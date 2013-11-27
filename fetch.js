var http = require('http');
var url = require('url');
var urlOpts = {host: 'www.node.org', path: '/', port: '80'};

if (process.argv[2]) {
	if(!process.argv[2].match('http://')) {
		process.argv[2] = 'http://' + process.argv[2];
	}
	urlOpts = url.parse(process.argv[2]);
}

http.get(urlOpts, function (res) {
	console.log(urlOpts);
	res.on('data', function(chunk) {
		console.log(chunk.toString());
		/* Act on the event */
	}).on('error', function(e) {
		console.log('エラー： ' + e.message);
	});
});

