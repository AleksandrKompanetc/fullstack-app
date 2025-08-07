import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {validationResult} from 'express-validator'

import {registerValidation} from './validations/auth.js'

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

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullname: req.body.fullname,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  })

  const user = await doc.save();

  res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to register user',
    });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})