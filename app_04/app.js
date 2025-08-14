const http = require('http');
const fs = require('fs');
const PORT = 3503;

res.setHeader('Content-Type', 'text/html; charset=utf-8');

http.createServer(function(req, res) {
  const url = req.url;
  console.log(url);

  switch (url) {
    case '/':
      console.log('main page');
      res.write('<h1>Main page</h1>');
      break;
    case '/contact':
      console.log('Contact');
      let data = fs.readFileSync('./contact.html', {encoding: 'utf8', flag: 'r'});
      res.write(data);
      break;
    default:
      console.log('404');
      res.write('<h1>404</h1>');
  }
  res.end();

}).listen(PORT);