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
  } else if (key === 'w') { // handle movement up
    connection.write('Move: up');
  } else if (key === 'a') { // handle movement left
    connection.write('Move: left');
  } else if (key === 's') { // handle movement down
    connection.write('Move: down');
  } else if (key === 'd') { // handle movement right
    connection.write('Move: right');
  } else {
    console.log('Please enter WASD or CTRL + C to exit.')
  }
};

module.exports = {
  setupInput,
  handleUserInput,
};