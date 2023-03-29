const User = require('../models/userModel');
const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');

const usersController = require('../controllers/userController');

const router = express.Router();

const app = express();

router.get('/', usersController.getUsers);
router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;

// router.get('/', (req, res, next) => {
//   res.json({ message: 'it work' });
// });
