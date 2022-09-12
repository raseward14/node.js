// this simulates a user state (react)
// users state = requires those users
const usersDB = {
    // simulates a user database table
    users: require('../model/users.json'),
    // will set the users using this setter function here
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
// bcrypt hashes and salts pw's - securely/safely store in db - 
const bcrypt = require('bcrypt');

// handler for new user info that we will receive at this register route
const handleNewUser = async (req, res) => {
    // the request with have a user and a pw, lets destructure that from the req body
    const { user, pwd } = req.body;
    // 400 http status code, bad requeset
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});
    // check for duplicate usernames in the database
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        // determine the salt rounds - protect the pwd if db is compromised
        // individual salts makes getting pwds more difficult/unique for each one
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = { "username": user, "password": hashedPwd };
        // creates a brand new array, stores that in the db - set state in react
        usersDB.setUsers([...usersDB.users, newUser]);
        // write to the json file - our db in this simulation
        await fsPromises.writeFile(
            // this will overwrite any existing users.json file there
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

// put in an object so we can pull in the full name of the function as we did with employeesController
module.exports = { handleNewUser };