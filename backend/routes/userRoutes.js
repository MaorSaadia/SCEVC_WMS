const User = require('../models/userModel');
const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

const app = express();

router.get('/', usersController.getUsers);
router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.use(checkAuth);

module.exports = router;
