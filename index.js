import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

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

app.post('/auth/register', (req, res) => {
    
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})