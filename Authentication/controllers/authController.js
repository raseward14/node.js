const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

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
        res.json({ 'success': `User ${user} is logged in!`})
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = { handleLogin };