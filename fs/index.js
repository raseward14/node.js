// node is asyncronous
// im going to process this, but lets go ahead and continue running the rest of the code in the program, and when I finish, I'll get that data to you

const fs = require('fs');


// we could eliminate the file path in the fs.readFile function above with path
const path = require('path');

// fs.readFile('./starter.txt', 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

// __dirname gives us the firectory name, then we contacinate the name of the file - we can include directory names in this list as well
fs.readFile(path.join(__dirname, 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})

console.log('Hello...')

// utf8 is by default, callback will not have data - we are not reading data, we are writing it
// before the callback, specify whate we are writing to the file
fs.writeFile(path.join(__dirname, 'write.txt'), 'Nice to meet you', (err) => {
    if(err) throw err;
    console.log('Write complete');
})
// this created a new file!

// updating a file, adding more content to it
fs.appendFile(path.join(__dirname, 'apppend.txt'), 'testing text', (err) => {
    if(err) throw err;
    console.log('Write complete');
})


// exit on uncaught errors
// process is a value node has available to it
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})