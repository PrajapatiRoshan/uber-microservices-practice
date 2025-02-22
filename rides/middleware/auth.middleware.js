const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports.userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header.authorization.split('')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Unauthorized' });
  }
};

module.exports.captainAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header.authorization.split('')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const response = await axios.get(`${process.env.BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const captain = response.data;

    if (!captain) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.captain = captain;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Unauthorized' });
  }
};
