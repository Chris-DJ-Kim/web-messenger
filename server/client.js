var clientIo = require("socket.io-client");
var port = normalizePort(process.env.PORT || "http://localhost:3001");

// Add a connect listener

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = { clientIo, port };
