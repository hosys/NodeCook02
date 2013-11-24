var http = require('http');
var formidable = require('formidable');
var form = require('fs').readFileSync('form3.html');

http.createServer(function (req, res) {
	if (req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		res.end(form);
	}

	if (req.method === 'POST') {
		var incoming = new formidable.IncomingForm();
		incoming.uploadDir = 'uploads';
		incoming.on('file', function (field, file) {
			if (!file.size) { return; }
			res.writeHead(file.name + ' を受け取りました。');
		}).on('end', function () {
			res.end('すべてのファイルを受け取りました。');
		});
		incoming.parse(req);
	}
}).listen(8080);
