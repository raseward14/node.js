// STEP 1: IMPORT COMMON CORE & CUSTOM MODULES
// import common core modules needed for this file here
const http = require('http');
const path = require('path');
const fs = require ('fs');
const fsPromises = require('fs').promises;

// custom module, not a common core module, or an npm module, so we need to define the path
const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
// initialize object
const myEmitter = new Emitter();

// STEP 2: DEVINE PORT FOR WEB SERVER
// will have address of localhost bc it will just be a dev server on our local machine, we need to say what port it will be on
// process.env.PORT - if we were to host this somewhere, it would use this information, OR 3500;
const PORT = process.env.PORT || 3500;

// STEP 3: CREATE MINIMAL SERVER
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
});

// STEP 4: LISTEN FOR REQUESTS - always at end of server.js file
// PORT value, and anonymous function
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
// visiting localhost:3500 wil show /GET - left at 1:31:09

// myEmitter.on('log', (msg) => logEvents(msg));


//     myEmitter.emit('log', 'Log event emitted!')
