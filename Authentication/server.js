const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

//custom middleware logger - we want to create a log file
app.use(logger);

//once we've created the cors options, we pass them in here
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built in middleware for JSON
app.use(express.json());

// middleware for cookies
app.use(cookieParser());


// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
// this will issue a new accessToken once the accessToken has expired
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// this works like a waterfall, everything after this line will need to pass through verifyJWT middleware before executing
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    };
})

app.use(errorHandler);
 
app.listen(PORT, () => console.log(`server running on port ${PORT}`));




