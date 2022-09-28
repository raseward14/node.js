const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401) // unauthorized
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1]; // after the split, its in the one position
    // now we can verify
    jwt.verify(
        
    )
}