// custom module, not a common core module, or an npm module, so we need to define the path
const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
// .on() is how we listen for an event -> left off at 1:16:18
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    // Emit event
    // .on is listening .emit is to emit
    // emit the log event
    myEmitter.emit('log', 'Log event emitted!')
}, 2000);