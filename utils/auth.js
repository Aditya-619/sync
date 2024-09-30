const jwt = require('jsonwebtoken');

const createToken = (tokenObj) => {

    try {

        const token = jwt.sign(tokenObj, process.env.JWT_SECRET);
        return token;
        
    } catch (error) {
        console.log('error in createToken', error);
        return false;
    }
}

module.exports = createToken;