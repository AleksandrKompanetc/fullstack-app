const http = require('http');

http.createServer(function(req, res) {
  console.log(req.url);
  console.log(req.method);
  console.log('server work');
  res.end('1');
}).listen(3600);