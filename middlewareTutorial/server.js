const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// must begin with a slash, end with a slash, or be index.html - express supports regular expressions, the .html is optional
app.get('^/$|index(.html)?', (req, res) => {
    // res.send('hello world!');
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    // 301 this has permenantly been moved to new page, there is no more old page
    res.redirect(301, '/new-page.html'); // 302 by default, we want a 301
});

// route handlers
// what it does is it moves on to the next handler, or the next expression - not common
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('hello world!')
})

// chaining route handlers -> more common approach
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('finished!')
}

// the html is optional here
app.get('/chain(.html)?', [one, two, three]);

// a '/' followed by anything will default to this route
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); // express will send a 404 to tell you it cant find what its looking for, even if we dont supply a code
    // it wont send a 404 status code, it will send a 200 bc its actually successfully finding our 404 page, serving exactly what we told it to
    // chain in the .status(404) method
})
 
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});




