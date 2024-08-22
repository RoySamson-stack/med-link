const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models /User');
const Company = require('../models /Company'); 

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, companyName, username, isCompany } = req.body; 

  try {
    let user;

    if (isCompany) {
      user = await Company.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Company already exists' });
      }

      user = new Company({
        email,
        password,
        companyName,
      });
    } else {
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        email,
        password,
        username,
      });
    }

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password, isCompany } = req.body;

  try {
    let user;

    if (isCompany) {
      user = await Company.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
