const { Router } = require('express');
const { signup, login, createCourse, getCourses } = require('../controller/admin');

const ensureAuth = require('../middleware/ensureAuth.js');

const adminRoute = Router();

adminRoute.post('/signup', signup);
adminRoute.post('/login', login);
adminRoute.post('/courses', ensureAuth, createCourse);
adminRoute.get('/courses', ensureAuth, getCourses);

module.exports = adminRoute;