// How NodeJS differs from Vanilla JS
// 1) Node runs on the server - not in the browser (backend not frontend)
// 2) The console is the terminal window

console.log('hello world')

// 3) global object instead of window object (browser)
// much smaller

// console.log(global)

// 4) has common core module - OS, file system, other things
// 5) CommonJS modules instead of ES6 modules - diff syntax 'require' versus 'import'

const os = require('os');
console.log(os.type())
console.log(os.version())
console.log(os.homedir())

// other values we always have access to in node will always give us the directory name in node

console.log(__dirname)
