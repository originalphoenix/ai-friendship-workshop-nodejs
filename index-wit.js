'use strict';
const uuidv1 = require('uuid/v1');

const WIT_TOKEN = '4VASJRMXYCQSPV6ASCOL3WBUNFY4P27D';
const {Wit, log} = require('node-wit');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const wit = new Wit({accessToken: WIT_TOKEN});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

function randomGreetings() {
  const greetingsArray = [
    'Hey',
    'Hey There!',
    'Howdy Partner',
    'Hello',
    'Good Day to You',
  ];
  const randomGreeting = greetingsArray[Math.floor(Math.random()*greetingsArray.length)];
  return randomGreeting;

}

function getTime() {
  const event = new Date;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeReply = 'The current time in the USA is' + event.toLocaleDateString('en-US', options);
  return timeReply;
}



io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);
    wit.message(text, {})
    .then(({entities}) => {
    const intent = Object.keys(entities)[0];
    console.log(intent);
    if (!intent) {
      return;
    }
    const developerFeelings = 'wit should have never dropped the story feature and put the onus on the developer to write stupid switch statements';
    switch (intent) {
      case 'greetings':
        const greeting = randomGreetings();
        socket.emit('bot reply', greeting);
        break;
      case 'datetime':
        const timeNow = getTime();
        socket.emit('bot reply', timeNow);
        break;
      default:
      socket.emit('bot reply', developerFeelings);
        break;
    }
  }, (reason) => {
  console.log('A problem has occurred' + reason);
});
});
});
