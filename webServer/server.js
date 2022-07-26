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

    // gets the extension - / wouldnt have an extension, but we can handle that as well
    const extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
        case '.js':
            contentType = 'text/javascript';
        case '.json':
            contentType = 'application/json';
        case '.jpg':
            contentType = 'image/jpeg';
        case '.png':
            contentType = 'image/png';
        case '.txt':
            contentType = 'text/plain';
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/' ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html' ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)

    // makes .html extension not required in browser
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html'

    // file exists or not, true or false value we get back
    const fileExists = fs.existsSync(filePath);

    if(fileExists) {
        // serve the file
    } else {
        // 404
        // 301 redirect
        console.log(path.parse(filePath));
    }
    // 1:42:22

    // let path;

    // if(req.url === '/' || req.url === 'index.html') {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/html');
    //     pathh = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(path, 'utf8', () => {
    //         res.send(data)
    //     })
    // }

    // switch(req.url) {
    //     case '/':
    //         res.statusCode = 200;
    //         path = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(path, 'utf8', (err, data) => {
    //             res.send(data)
    //         })
    //         break;
    // }
});

// STEP 4: LISTEN FOR REQUESTS - always at end of server.js file
// PORT value, and anonymous function
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
// visiting localhost:3500 wil show /GET - left at 1:31:09

// myEmitter.on('log', (msg) => logEvents(msg));


//     myEmitter.emit('log', 'Log event emitted!')
