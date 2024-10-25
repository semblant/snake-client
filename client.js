const { IP, PORT, MESSAGES } = require('./constants');

/**
 * Function connect() establishes a TCP connection with the game server
 *
 *
 * Events handled:
 * - 'connect': Logs a success message and prompts the user for input.
 * - 'data': Logs incoming data from the server and checks for idle messages.
 * - 'error': Handles any connection errors and exits the process.
 *
 *
 * @returns {Object} conn - The connection object used for communication with the server.
 */

const connect = function() {
  const net = require('net');
  const conn = net.createConnection({
    host: IP,
    port: PORT,
  });

  // Interpret incoming data as utf8
  conn.setEncoding("utf-8");

  // Display connection messages
  conn.on('connect', () => {
    console.log("Successfully connected to game server!\n");
    console.log(`You can send messages by inputing the following keys:
      g - '${MESSAGES['g'].slice(5)}'
      y - '${MESSAGES['y'].slice(5)}'
      i - '${MESSAGES['i'].slice(5)}'
      b - '${MESSAGES['b'].slice(5)}'\n`);

    conn.write('Name: SNK');
  });

  // Log incoming data from the server
  conn.on('data', (data) => {
    console.log(data);
    if (data === 'you ded cuz you idled\n') {
      process.exit();
    }
  });

  // Leave server on error
  conn.on('error', () => {
    process.exit();
  });

  return conn;
};

module.exports = { connect };