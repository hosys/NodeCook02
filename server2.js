var http = require('http');
var form = require('fs').readFileSync('put_upload.html');

http.createServer(function (req, res) {
	if (req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		res.end(form);
	}

	if (req.method === 'PUT') {
		var fileData = new Buffer(+req.headers['content-length']);
		var bufferOffset = 0;
		req.on('data', function (chunk) {
			chunk.copy(fileData, bufferOffset);
			bufferOffset += chunk.length;
		}).on('end', function () {
			var rand = (Math.random() * Math.random()).toString(16).replace(',', '');
			var to = 'upload/' + rand + '-' + req.headers['x-uploadedfilename'];
			fs.writeFile(to, fileData, function (err) {
				if (err) { throw err; }
				console.log('ファイルを' + to + ' に保存しました');
				res.end();
			});
		});
	}
}).listen(8080);
