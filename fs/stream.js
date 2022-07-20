const fs = require('fs');

// could use the path module, would be a better option, just doing this quickly by hard coding the path
const rs = fs.createReadStream('./lorem.txt', {encoding: 'utf8'});

// createWriteStream defines a path to the new file
const ws = fs.createWriteStream('./new-lorem.txt');

// this creates a new file, writing the data we read from rs
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

// .pipe accomplishes the same thing - more efficient
rs.pipe(ws);