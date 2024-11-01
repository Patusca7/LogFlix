const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const UserControler = require('../controlers/users')
const checkAuth = require('../middleware/check-auth');


router.get('/', checkAuth.checkAdmin, UserControler.getUsers);

router.post('/signup', UserControler.signup);
router.post('/login', UserControler.login)


router.delete('/:userId', checkAuth.checkAdmin, UserControler.user_delete);

module.exports = router;
