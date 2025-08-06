import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {validationResult} from 'express-validator'

import {registerValidation} from './validations/auth.js'

import UserModel from './models/User'

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

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const doc = new UserModel({
    email: req.body.email,
    fullname: req.body.fullname,
    avatarUrl: req.body.avatarUrl,
    passwordHash: 
  })

  res.json({
    success: true,
  })

});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})