const express = require('express');
const userController = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');
const getUser = require('../controllers/users/getUserById');
const { ensureToken } = require('../utils/jwtUtils');

const router = express.Router();

router.post('/register', userController.registerUser);

router.post('/login', loginUser.login);

router.get('/:id', getUser.getUserById);

module.exports = router;
