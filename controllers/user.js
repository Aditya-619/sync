const userModel = require('../model/user.js');

const getUsersList = async(req, res) => {
    try {

        const users = await userModel.find();
        return res.status(201).json({
            msg: 'success',
            payload: {
                data: users
            }
        })
        
    } catch (error) {
        console.log('error in register', error);
        return res.status(500).json({
            status: 0,
            msg: 'something went wrong'
        });
    }
}

module.exports = getUsersList;