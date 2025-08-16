const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

http.createServer(function (req, res) {
  const url = req.url;
  console.log(url);

  switch (url) {
    case '/':
      console.log('main');
      res.write('<h1>MAIN PAGE');
      break;
    
  }

}).listen(PORT, HOSTNAME);