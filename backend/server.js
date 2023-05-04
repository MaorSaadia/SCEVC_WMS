const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const cameraR = require('./routes/cameraR');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/users', userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `\nServer Running In ${process.env.NODE_ENV} Mode On Port ${PORT}`
      )
    );
    console.log(`MongoDB Connected\n`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/camera', cameraR);
