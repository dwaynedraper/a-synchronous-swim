const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS') {

  }

  if (req.method === 'GET' && req.url === '/confused') {
    console.log('success');
    const commands = ['up', 'down', 'left', 'right'];
    let index = Math.floor((Math.random() * 4) + 1);
    res.writeHead(200, headers);
    res.end(commands[index]);
  } else {
    console.log('failure');
    res.writeHead(200, headers);
    res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!
};
