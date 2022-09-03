// cross origin resource sharing - could change google to your domain - domains that can access the routes
const whitelist = [
    'https://www.domain.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
];

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
};

module.export = { corsOptions }
