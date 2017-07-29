var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3001;

var server = http.createServer(function (req, res) {
	console.log('Resqust for' + req.url + 'by method' + req.method);

	//to check the method
	if (req.method == 'GET') {
		var fileurl;

		//to check the url
		if (req.url == '/')
			fileurl = '/index.html';
		else {
			fileurl = req.url;
		}

		var filepath = path.resolve('./public' + fileurl);
		var fileext = path.extname(filepath);

		//check the extension name
		if (fileext == '.html') {
			fs.exists(filepath, function (exists) {
				//check the existence
				if (!exists) {
					res.writeHead(404, { 'Content-Type': 'text/html' });
					res.end('<html><body><h1>Error: 404 ' + fileurl + '</h1></body></html>');

					return;
				}

				res.writeHead(200, { 'Content-Type': 'text/html' });
				fs.createReadStream(filepath).pipe(res);
			});
		} else {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<html><body><h1>Error: 404, ' + fileurl + 'is not a html page</h1></body></html>');
		}
	} else {
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.end('<html><body><h1>Error: 404, ' + req.method + ' is not supported</h1></body></html>');
	}
});

server.listen(port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}`);
});