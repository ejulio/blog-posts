var http = require('http'),
	fs = require('fs');

http.createServer(function(request, response)
{
	var filename = request.url.split('?')[0],
		file = fs.readFileSync('./' + filename);


	response.writeHead(200, {
		'Content-Type': filename.indexOf('html') > -1 ? 'text/html' : 'image.png'
	});

	response.end(file);

}).listen(56263, '127.0.0.1');