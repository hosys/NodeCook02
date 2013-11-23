var http = require('http');
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');

http.createServer(function (req, res) {
	if (req.method === 'GET') {
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		res.end(form);
	}

	if (req.method === 'POST') {
		var postData = '';
		req.on('data', function (chunk) {
			postData += chunk;
		}).on('end', function () {
			var postDataObject = querystring.parse(postData);
			console.log('ユーザが次のデータをPOSTしました。：　¥n' + postData);
			res.end('あなたがPOSTしたデータ：　' +  util.inspect(postDataObject));
		});
	}
}).listen(8080);
