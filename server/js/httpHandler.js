const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  //NOTE: Figure out how to use url to catch GET request
  //Need to fill out a full url in this if block

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, headers);
    let command = messages.dequeue();
    res.end(command);
    next();
  } else if (req.method === 'GET' && req.url === '/background.jpg') {
    fs.readFile(module.exports.backgroundImageFile, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
        res.end();
        // Display the file content
        console.log(data);
        next();
      } else {
        res.writeHead(200, headers);
        res.write(data);
        res.end();
        next();
      }
    });
  }
  if (req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    res.end();
    next();
  }

  // next(); // invoke next() at the end of a request to help with testing!
};
