// establishes connection with the game server
const connect = function() {
  const net = require('net');
  const conn = net.createConnection({
    host: 'localhost',
    port: 50541,
  });

  // interpret incoming data as text
  conn.setEncoding("utf-8");

  conn.on('connect', () => {
    console.log("Successfully connected to game server!");
    conn.write('Name: FLY');
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};

module.exports = { connect };