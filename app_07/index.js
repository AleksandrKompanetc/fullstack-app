const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

http.createServer(function (req, res) {
  const url = req.url;
  console.log(url);

  

}).listen(PORT, HOSTNAME);