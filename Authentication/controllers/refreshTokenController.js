const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    // now, we're looking at cookies
    const cookies = req.cookies;
    // checking if we have cookies, and if so, if there is a jwt property
    // if they do not exist, then we return something
    if (!cookies?.jwt) return res.sendStatus(401) // unauthorized
    const refreshToken = cookies.jwt;

    // we want to find a user, but now we are receiving a refreshToken, and not a username or pwd for this
    // lets see if the userName exists - if it finds somebody, it returns that, if not - false
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // forbidden
   
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            // if we do not have a valid token
            if (err || foundUser.username !== decoded.username)
            return res.sendStatus(403);
            // if all is good, we are ready to send a new access token bc the refresh token has verified
            const accessToken = jwt.sign(
                // username should be the same as decoded.username, bc it was verified
                // we might want to set the expiration longer in production app, this is just for the purposes of this tutorial, so that we can see it expire
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }