const HttpError = require('../httpError');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('ההרשמה נכשלה', 500);
  }

  if (existingUser) {
    const error = new HttpError('משתמש קיים כבר', 422);
    return next(error);
  }

  let hashpassword;
  try {
    hashpassword = await bcryptjs.hash(password, 12);
  } catch (err) {
    const error = new HttpError('נסה שוב', 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashpassword,
    role,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('ההרשמה נכשלה, אנא נסה שוב.', 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
  } catch (err) {
    const error = new HttpError('ההרשמה נכשלה, אנא נסה שוב.', 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    isAdmin: createdUser.isAdmin,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('הכניסה נכשלה, אנא נסה שוב מאוחר יותר.', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('נתונים לא נכונים, אנא נסה שנית.', 401);
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcryptjs.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('נתונים לא נכונים, אנא נסה שנית.', 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError('נתונים לא נכונים, אנא נסה שנית.', 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
  } catch (err) {
    const error = new HttpError('הכניסה נכשלה, אנא נסה שוב.', 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    isAdmin: existingUser.isAdmin,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
