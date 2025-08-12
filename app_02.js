const http = require('http');

http.createServer(function(req, res) {
  console.log(req.url);
  console.log(req.method);
  console.log('server work');
  res.setHeader('Content-Type', 'text/html; charset=utf-8;');
  res.end('<h2>hello world</h2>');
}).listen(3700);