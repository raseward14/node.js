const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken - would do that in the memory of the client application, cannot be done on the back end, zero it out, or set it to blank. we can take care of the refresh token here though

    // now, we're looking at cookies
    const cookies = req.cookies;
   // verify we have cookies, and jwt in the cookies
    if (!cookies?.jwt) return res.sendStatus(201) // successful, no content to send back
    const refreshToken = cookies.jwt;

    // is refreshToken in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    // if we dont have a found user, but we do have a cookie, we can clear the cookie that was sent
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(201); // successful, no content 
    }
    
    // we did find the same refresh token in the db, delete the refreshToken in the db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true }); // flag secure: true - only serves on https - dont add in dev, we would in prod
    res.sendStatus(204); // success, no content
}

module.exports = { handleLogout }