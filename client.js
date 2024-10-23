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


    // TEMPORARY CODE
    //setInterval(() => {
    //  conn.write('Move: up'); // moves the snake up 1
    //}, 50)
    //conn.write('Move: up'); // moves the snake up 1
    //conn.write('Move: down'); // moves the snake right 1
    //conn.write('Move.down'); // moves the snake down 1
    //conn.write('Move: left'); // moves the snake left 1



  });

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};


module.exports = { connect };