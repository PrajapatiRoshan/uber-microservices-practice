const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const { subscribeToQueue } = require('../service/rabbit');

module.exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'user already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, password: hash, email });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token);

    delete newUser._doc.password;

    res.send({ token, newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid email and password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    delete user._doc.password;

    res.cookie('token', token);

    res.send({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    await blacklisttokenModel.create({ token });
    res.clearCookie('toekn');
    res.send({
      message: 'User logged out successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.profile = async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.acceptedRide = async (req, res) => {
  // Long polling: wait for 'ride-accepted' event
  rideEventEmitter.once('ride-accepted', (data) => {
    res.send(data);
  });

  // Set timeout for long polling (e.g., 30 seconds)
  setTimeout(() => {
    res.status(204).send();
  }, 30000);
};

subscribeToQueue('ride-accepted', async (msg) => {
  const data = JSON.parse(msg);
  rideEventEmitter.emit('ride-accepted', data);
});
