// npm modules
const { format } = require('date-fns');
//const import v4 as uuid
const { v4: uuid } = require('uuid');

// common core
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    // async await portion of this function
    try {
        // if the logs directory does not exist, it will create the directory
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    } catch (err) {
        console.log(err)
    }
}

module.exports = logEvents;
// now that we have exported it, we can use it in another file

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

// console.log(uuid())




