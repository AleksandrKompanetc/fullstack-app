const http = require('http');
const PORT = 3502;

http.createServer(function(req, res) {
  const url = req.url;
  console.log(url);

  switch (url) {
    case '/':
      console.log('main page');
      res.write('<h1>Main page</h1>');
      break;
    case '/contact':
      console.log('Contact page');
      res.write('<h1>Contact</h1>');
      break;
    default:
      console.log('404');
      res.write('<h1>404</h1>');
  }
  res.end();

}).listen(PORT);