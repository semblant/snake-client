const { connect }  = require('./client');

// setup interface to handle user input from stdin
const setupInput = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true); // allows us to listen for individual keypress instead of waiting for the user to press enter
  stdin.setEncoding('utf8'); // utf8 is set so we can read the text data that is input
  stdin.resume(); // resume stdin so the program can listen for input

  stdin.on('data', (key) => handleUserInput(key));
  return stdin; // return the stdin object so we can use it elsewhere
};

const handleUserInput = (key) => {
  if (key === '\u0003') {
    process.stdout.write("Bye!\n");
    process.exit();
  }
};


console.log('Connecting...');
connect();
setupInput();