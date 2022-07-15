// How NodeJS differs from Vanilla JS
// 1) Node runs on the server - not in the browser (backend not frontend)
// 2) The console is the terminal window

console.log('hello world')

// 3) global object instead of window object (browser)
// much smaller

// console.log(global)

// 4) has common core module - OS, file system, other things
// 5) CommonJS modules instead of ES6 modules - diff syntax 'require' versus 'import'
const os = require('os')
const path = require('path')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())
console.log('-------------')

// other values we always have access to in node will always give us the directory name in node
console.log(__dirname)
console.log(__filename)
console.log('-------------')

// we can use __filename within path
console.log(path.dirname(__filename)) // same as console.log(__dirname)
console.log(path.basename(__filename)) // 'server.js' was just server.js - allowed us to just pull the filename out instead of the entire path
console.log(path.extname(__filename)) // '.js' just the extension of the file
console.log('-------------')
console.log(path.parse(__filename)) // object with all of these values: root, directory, base: 'server.js', ext: '.js', name: 'server'
console.log(path.parse(__filename).name) 
console.log(path.parse(__filename).ext) 
console.log(path.parse(__filename).base) 
console.log(path.parse(__filename).dir) 
console.log(path.parse(__filename).root) 

// besides the common core, we can pull in packages that other developers have created, npm
// we can create our own modules
