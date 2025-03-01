const { clearInterval } = require('timers');
const { MOVE_UP_KEY,
  MOVE_LEFT_KEY,
  MOVE_DOWN_KEY,
  MOVE_RIGHT_KEY,
  MESSAGES,
} = require('./constants');

// Stores the active TCP connection object
let connection;

/**
 * Function setupInput() handles the interface to handle user input from stdin.
 *
 * @param {Object} conn - The connection object used for communicating with the server.
 * @returns {Object} stdin - The stdin object to allow for further manipulation.
 */
const setupInput = (conn) => {
  connection = conn;

  // Allow for keypress user input in utf8
  const stdin = process.stdin;
  stdin.setRawMode(true); // allows us to listen for individual keypress instead of waiting for the user to press enter
  stdin.setEncoding('utf8'); // utf8 is set so we can read the text data that is input
  stdin.resume(); // resume stdin so the program can listen for input

  // Call user input function to handle user input
  stdin.on('data', (key) => handleUserInput(key));
  return stdin; // return the stdin object so we can use it elsewhere
};


/**
 * Function movementDirection() handles movement direction based on user key input.
 *
 * @param {string} key - The key representing the direction of movement.
 */
const movementDirection = (key) => {
  switch (key) {
  // Movement cases
  case MOVE_UP_KEY:
    connection.write('Move: up');
    break;
  case MOVE_LEFT_KEY:
    connection.write('Move: left');
    break;
  case MOVE_DOWN_KEY:
    connection.write('Move: down');
    break;
  case MOVE_RIGHT_KEY:
    connection.write('Move: right');
    break;
  }
};

/**
 *  Function messageInput() handles canned chat messages based on user key input.
 *
 * @param {string} key - The key representing the desired chat message
 */
const messageInput = key => {
  switch (key) {
  // Chat message cases
  case MESSAGES['g']:
    connection.write(MESSAGES['g']);
    break;
  case MESSAGES['y']:
    connection.write(MESSAGES['y']);
    break;
  case MESSAGES['i']:
    connection.write(MESSAGES['i']);
    break;
  case MESSAGES['b']:
    connection.write(MESSAGES['b']);
    break;
  }
};

// Stores active movement key
let moveInterval;
let direction;
const opposites = {
  'w': 's',
  'a': 'd',
  's': 'w',
  'd': 'a',
};

/**
 * Function handleUserInput() handles the user input for movement, messages and exit commands.
 *
 * Handles movement input and sets an interval for the movement by passing the input to movementDirection().
 * Handles message input by passing the input to messageInput()
 *
 * @param {string} key - The key pressed by the user.
 */
const handleUserInput = (key) => {
  // Exit case
  if (key ===  '\u0003') {
    process.stdout.write("Bye!\n"); // write a message in the console upon exit
    process.exit();

    // Movement cases
  } else if ([MOVE_UP_KEY, MOVE_LEFT_KEY, MOVE_DOWN_KEY, MOVE_RIGHT_KEY].includes(key)) {

    // Case: direction is up 'w' and user presses down 'd', direction continues up
    if (direction !== opposites[key]) {
      direction = key; // store current direction

      // Check if there is an exisiting movement interval
      if (moveInterval) {
        clearInterval(moveInterval);
      }

      // Set new interval with new movement key
      moveInterval = setInterval(() => {
        movementDirection(key);
      }, 100);
    }

    // Message cases
  } else if (MESSAGES[key]) {
    messageInput(MESSAGES[key]);
  }
};

module.exports = {
  setupInput,
  handleUserInput,
};