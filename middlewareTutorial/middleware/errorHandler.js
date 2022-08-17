const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    // this function gets a message first, then the name of the file it needs to write to or create
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    // can display error stack, or message, or whatever
    console.error(err.stack)
    // sends the error status, 500 and the message to be displayed in the browser
    // sends the message to the browser
    res.status(500).send(err.message)
}

module.exports = errorHandler;
