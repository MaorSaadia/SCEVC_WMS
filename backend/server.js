import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import connectDB from './config/db.js';
import mongoose from 'mongoose';

//const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
//app.use(userRoutes);

app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

//connectDB();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
    console.log(`MongoDB Connected`);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(
//   PORT,
//   console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );
