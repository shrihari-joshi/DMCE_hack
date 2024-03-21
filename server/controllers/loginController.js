const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      console.log(`User with username ${username} not found`);
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log('User logged in');
      return res.status(200).json(user);
    } else {
      console.log(`Password did not match for ${username}`);
      return res.status(401).json({ error: 'Wrong password' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
