import User from '../models/userModel';
import asyncHandler from 'expressAsyncHandler';

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// const createdUser = new User({
//   name,
//   email,
//   password,
// });

// createdUser.save();
// res.status(201).json({ user: createdUser });

export { registerUser };
