const { IP, PORT } = require('./constants');
const { clients } = require('./constants');


// establishes connection with the game server
const connect = function() {
  const net = require('net');
  const conn = net.createConnection({
    host: IP,
    port: PORT,
  });

  // interpret incoming data as text
  conn.setEncoding("utf-8");

  conn.on('connect', (connection) => {
    console.log("Successfully connected to game server!\n");
    conn.write('Name: FLY'); // could turn this into constant variable - ask user to define name when connected to server?
  });

  conn.on('data', (data) => {
    console.log(data);
    if (data === 'you ded cuz you idled\n') {
      process.exit();
    }
  });

  conn.on('error', () => {
    process.exit()
  })

  return conn;
};

module.exports = { connect };