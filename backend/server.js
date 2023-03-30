const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/users', userRoutes);

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
