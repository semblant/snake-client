const net = require('net');

// establishes connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: 'localhost',
    port: 50541,
  });

  // interpret incoming data as text
  conn.setEncoding("utf-8");

  conn.on('connect', () => {
    console.log("Connected to the server!");
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};

console.log('Connecting...');
connect();