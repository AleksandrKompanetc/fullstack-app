const http = require('http');
const PORT = 3501;

http.createServer(function(req, res) {
  const url = req.url;
  console.log(url);

  switch (url) {
    case '/':
      console.log('main page');
      res.write('<h1>Main page</h1>');
      break;
  }
  res.end();
  
}).listen(PORT);