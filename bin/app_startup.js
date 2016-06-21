#!/usr/bin/env node
/**
 * Module dependencies.
 */

var path             = require('path');
var app    = require(path.join(__dirname, '../node_server/app')); // app.js
//var debug = require('debug')('todo-node-postgres:server'); // ?????????????
var http   = require('http');
//var reload = require('reload');
var server = http.createServer(app); // app as a callback to handle requests
//reload(server,app);

/**
 * Get port from environment and store in Express.
 */
var port = 8003; // normalizePort('8080');  // normalizePort(process.env.PORT || '3000'); // process.env.PORT || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.get('port'), function() {
  if (process.send) {
    process.send('online');
  }
  console.log('This express app is listening on port:' + app.get('port'));
});

// server.on('error', onError);
// server.on('listening', onListening);
//
// /**
//  * Normalize a port into a number, string, or false.
//  */
// function normalizePort(val) {
//   var port = parseInt(val, 10);
//
//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }
//
//   if (port >= 0) {
//     // port number
//     return port;
//   }
//
//   return false;
// }
//
// /**
//  * Event listener for HTTP server "error" event.
//  */
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port
//
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
//
// /**
//  * Event listener for HTTP server "listening" event.
//  */
// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
