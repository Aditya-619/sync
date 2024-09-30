const bcrypt = require('bcryptjs');

const adminModel = require('../model/admin.js');
const courseModel = require('../model/course.js');

const createToken = require('../utils/auth.js');

const signup = async(req, res) => {
    try {

        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({
                msg: 'missing required* fields'
            });
        }
        const isExists = await adminModel.findOne(username);
        if(isExists) {
            return res.status(400).json({
                msg: 'user already exists'
            });
        }
        const hashPassword = await bcrypt.hash(password, 8);
        await adminModel.create({
            username,
            password: hashPassword
        });
        res.status(200).json({
            msg: 'admin created successfully'
        });

    } catch (error) {
        console.log('error in admin signup', error);
        res.status(500).json({
            msg: 'something went wrong'
        });
    }
}

const login = async(req, res) => {
    try {

        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({
                msg: 'missing required* fields'
            });
        }
        const admin = await adminModel.findOne(username);
        if(!admin) {
            return res.status(400).json({
                msg: 'user not found'
            });
        }
        const checkPassword = await bcrypt.compare(password, admin.password);
        if(!checkPassword) {
            return res.status(404).json({
                msg: 'invalid password'
            });
        }
        const tokenObj = {
            username: username,
            password: password
        }
        const token = createToken(tokenObj);
        res.status(200).json({
            msg: 'success',
            payload: {
                token
            }
        });
        
    } catch (error) {
        console.log('error in admin login', error);
        res.status(500).json({
            msg: 'something went wrong'
        });
    }
}

const createCourse = async(req, res) => {
    try {

        const { title, description, price, image } = req.body;
        if(!title || !description || !price) {
            if(!username || !password) {
                return res.status(400).json({
                    msg: 'missing required* fields'
                });
            }
        }
        const isExists = await courseModel.findOne(title);
        if(isExists) {
            return res.status(400).json({
                msg: 'course already exists'
            });
        }
        await courseModel.create({
            title, description, price, image
        });
        res.status(200).json({
            msg: 'course created successfully',
            payload: {
                courseId: 'new course id'
            }
        });
        
    } catch (error) {
        console.log('error in admin course', error);
        res.status(500).json({
            msg: 'something went wrong'
        });
    }
}

const getCourses = async(req, res) => {
    try {

        const courseLists = await courseModel.find();
        res.status(200).json({
            msg: 'success',
            payload: {
                courses: courseLists
            }
        });
        
    } catch (error) {
        console.log('error in admin course', error);
        res.status(500).json({
            msg: 'something went wrong'
        });
    }
}

module.exports = { signup, login, createCourse, getCourses };