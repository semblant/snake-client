// Stores the active TCP connection object
let connection;

// setup interface to handle user input from stdin
const setupInput = (conn) => {
  connection = conn;

  // Allow for keypress user input in utf8
  const stdin = process.stdin;
  stdin.setRawMode(true); // allows us to listen for individual keypress instead of waiting for the user to press enter
  stdin.setEncoding('utf8'); // utf8 is set so we can read the text data that is input
  stdin.resume(); // resume stdin so the program can listen for input

  stdin.on('data', (key) => handleUserInput(key));
  return stdin; // return the stdin object so we can use it elsewhere
};

const handleUserInput = (key) => {
  if (key === '\u0003') { // utf8 encoding for 'ctrl + c' to exit the program
    process.stdout.write("Bye!\n"); // write a message in the console upon exit
    process.exit();
  } switch (key) {
  case 'w':
    connection.write('Move: up');
    break;
  case 'a':
    connection.write('Move: left');
    break;
  case 's':
    connection.write('Move: down');
    break;
  case 'd':
    connection.write('Move: right');
  }
};

module.exports = {
  setupInput,
  handleUserInput,
};