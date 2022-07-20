console.log('testing!')

// install npm package globally to be used anywhere in the app

// npm install
// npm i
// npm add

// nodemon -g
// monitors your files, as you save, it restarts your server
// type nodemon instead of node, will look for index.js by default
// for a different file name, like server, type nodemon server.js

// watching extensions js, mjs, and json
// ctrl + c to exit nodemon

//------------------------------------------

// add a package to our project
// before we do that we have to initialize npm for our project
// npm init
// will ask questions, add flag -y to skip questions
// will ask package name - whatever you named the folder
// version number
// description
// entry point (index.js) -> this will show by default, could change to server.js
// test command, git repository, no keywords, could put my name for author, license by default
// finally, is this OK?

// installs package.json
// important bc its what npm reads to know what packages to install for my project
// this file stays with repository if we send to github
// we dont send the packages itself
// this way we dont have to transfer/store as much data
// somebody else can clone it, and they dont have to copy over all of the module data

// 52:10