const fs = require('fs');

// .mkdir makes a new directory
// fs.mkdir('./new', (err) => {
//     if (err) throw err;
//     console.log('Directory created');
// })

// can check to see if files or directories exist, so we dont get errors

// if directory already exists, lets not create it, or write over it - no directory will create, bc it already exists
// useful before attempting to delete, rename, copy a file || directory if it exists
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory created');
    });    
}

// if it exists, remove the directory .rmdir
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory removed');
    });
}

// when you install node, you also install npm
// npm packages are node modules that are created by third parties, other developers
// how it differs from common core modules