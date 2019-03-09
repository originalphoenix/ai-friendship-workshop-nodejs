const socket = io();

/* Add all the speech recognition stuff */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let recognizedText = null;

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;
recognition.onstart = function() {
  recognizedText = null;
};

/* Write Synth Voice */

/* Write a function that starts listening triggering the recognition function, and the listening function */

/* Two states, listening, and ready */

/* Write a function to add the bot text */

/* Write a function to add the user text */

/* Error Handling, if a user gets an error, prevent them from sending more info */

/* Wait until the page is loaded to start doing stuff */
