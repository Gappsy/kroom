var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var name = req.url.replace('/','');
  name = name.replace(/%20/g, " ");
  res.write(name);
  res.end();
}).listen(8080);