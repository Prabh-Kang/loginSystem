const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = token => {
    try{
        const decodedUser = jwt.verify(token, process.env.SECRET_EMAIL_VERIFICATION_KEY)
        return decodedUser;
    }
    catch {
        return null;
    }
}

