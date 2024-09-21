const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userModel = require('../model/user.js');

const register = async(req, res) => {
    const { name, email, password } = req.body;
    try {

        if(!name || !email || !password) {
            return res.status(404).json({
                status: 0,
                msg: 'missing required* fields'
            });
        };
        const isUserExists = await userModel.findOne({ email });
        if(isUserExists) {
            return res.status(200).json({
                status: 0,
                msg: 'user already exists'
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            status: 1,
            msg: 'user registerd successfully',
            payload: {
                data: newUser
            }
        });
        
    } catch (error) {
        console.log('error in register', error);
        return res.status(500).json({
            status: 0,
            msg: 'something went wrong'
        });
    };
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {

        if( !email || !password ) {
            return res.status(404).json({
                status: 0,
                msg: 'missing required* fields'
            });
        };
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(404).json({
                status: 0,
                msg: 'user not found'
            });
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            return res.status(404).json({
                status: 0,
                msg: 'invalid password'
            });
        }
        const tokenObject = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(tokenObject, process.env.JWT_SECRET);
        return res.status(201).json({
            status: 1,
            msg: 'logged in successfullty',
            payload: {
                name: user.name,
                tokenObject,
                token
            }
        })
        
    } catch (error) {
        console.log('error in login', error);
        return res.status(500).json({
            status: 0,
            msg: 'something went wrong'
        });
    };
};

module.exports = {register, login};