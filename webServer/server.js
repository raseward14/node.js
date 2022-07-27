// STEP 1: IMPORT COMMON CORE & CUSTOM MODULES
// import common core modules needed for this file here
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// custom module, not a common core module, or an npm module, so we need to define the path
const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

// STEP 2: DEVINE PORT FOR WEB SERVER
// will have address of localhost bc it will just be a dev server on our local machine, we need to say what port it will be on
// process.env.PORT - if we were to host this somewhere, it would use this information, OR 3500;
const PORT = process.env.PORT || 3500;

// serve file function
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType });
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err)
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt')
        response.statusCode = 500;
        response.end();
    }
}

// STEP 3: CREATE MINIMAL SERVER
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

    // gets the extension - / wouldnt have an extension, but we can handle that as well
    const extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)
    // makes .html extension not required in browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    // file exists or not, true or false value we get back
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file with a function
        serveFile(filePath, contentType, res)
    } else {
        // 404
        // 301 redirect
        // console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' })
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' })
                res.end();
                break;
            default:
                // serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

// STEP 4: LISTEN FOR REQUESTS - always at end of server.js file
// PORT value, and anonymous function
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
// visiting localhost:3500 wil show /GET - left at 1:31:09



