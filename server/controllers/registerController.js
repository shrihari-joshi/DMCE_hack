const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const duplicates = await User.findOne({ username }).exec();
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashed
        });
        console.log(user);

        // Send the response with status 201 and JSON data
        res.status(201).json({ "message": `${user.username} created` });
    } catch (err) {
        console.log('Error creating new user:', err);
        // Send an error response with status 500 and JSON data
        res.status(500).json({ "message": 'Internal server error' });
    }
}
