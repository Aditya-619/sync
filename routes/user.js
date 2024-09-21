const { Router } = require('express');

const ensureAuthentication = require('../middlewares/auth.js');
const getUsersList = require('../controllers/user.js');

const userRoute = Router();

userRoute.get('/allusers', ensureAuthentication, getUsersList);

module.exports = userRoute;