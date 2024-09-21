const { Router } = require('express');
const { register, login } = require('../controllers/auth.js');

const authRoute = Router();

authRoute.post('/signup', register)
authRoute.post('/signin', login);

module.exports = authRoute;