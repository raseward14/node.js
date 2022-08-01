// npm modules
const { format } = require('date-fns');
//const import v4 as uuid
const { v4: uuid } = require('uuid');

// common core
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    // async await portion of this function
    try {
        // if the logs directory does not exist, it will create the directory
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    // req.method, req.headers.origin (where the req is coming from, what website sent it to us), req.url (what was requested)
    // what to write
    // the we tell it what file to write to
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
}

// module.exports = logEvents;
module.exports = { logger, logEvents }




