import express from 'express';
import AsyncHandler from 'expressAsyncHandler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    //res.json({ success: true, token });
    res.send({ status: 'ok' });
  } catch (error) {
    //console.error(error);
    //res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
