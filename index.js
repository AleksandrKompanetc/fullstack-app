import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

import { registerValidation } from './validations/auth.js'

import UserModel from './models/User.js'

mongoose.connect()
  .then(() => {
    console.log('MongoDB connected')
  }).catch((err) => {
    console.error('MongoDB connection error:', err)
  })

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPassword) {
      return res.status(403).json({
        message: 'Invalid login or password',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    )

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Login error',
    })
   }
})

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullname: req.body.fullname,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    })

    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id,
    },
      'secret123',
      {
        expiresIn: '30d',
      }
    )

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to register user',
    });
  }
});

app.get('/auth/me', checkAuth, (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    })
  } catch (err) {

  }
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})