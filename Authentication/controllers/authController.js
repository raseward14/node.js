const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
// only because we do not have database technology yet (mongodb)
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});
    // lets see if the userName exists - if it finds somebody, it returns that, if not - false
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized - if we dont find the user
    // if found, compare pwd received with req to users pwd
    const match = await bcrypt.compare(pwd, foundUser.password)
    // if the pwd's match, reply with JSON, send success message
    if (match) {
        // create JWT to send to use with the other routes we want protected within the API
        // normal token & refresh token
        // first thing jwt takes is a payload - do not pass a password, lets pass in our user name by creating an object for username
        // second thing is our secret that we defined in our .env file, to access, we use process.env.ACCESS_TOKEN_SECRET
        // lastly is an options value to say when this token expires - in production, maybe 5 minutes, or 15 minutes - small window of time
        // highlight, shift + alt + down arrow copies it all down
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
            );
        // few small changes to make the refresh token
        // needs to last much longer than the access token
        // jsonwebtoken package on npm, link, another link, and more documentation on the different values we can use here for timeframes
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // we want to save our refresh token with current user in the database - also allows us to create a logout route in the future that will allow us to invalidate a refresh token when a user logs out
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        // this will save the refresh token with the current user
        const currentUser = { ...foundUser, refreshToken };
        // once the current user and their refresh token has been saved, add them back to the usersDB
        usersDB.setUsers([...otherUsers, currentUser]);
        // write the file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        
        res.json({ 'success': `User ${user} is logged in!`})
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = { handleLogin };