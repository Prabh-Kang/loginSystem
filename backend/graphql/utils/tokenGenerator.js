const User = require('../../mongoose/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const tokenGenerator = (id, username, email, type) => {
    const key = type === "accessToken" ? process.env.SECRET_ACCESS_KEY : process.env.SECRET_REFRESH_KEY;
    const expire =  { expiresIn: type === "accessToken" ?'15m' : '7d' };
    const info = { id, username, email };
    
    if (type === "refreshToken") {
        info.count = 0
    }
    const token = jwt.sign(info, key, expire);
    return token;
};

const refreshCheck = async(id, count) => {
   try{
       const user = await User.findById(id);
   
       if(count !== user.count) {
           return null;
       }
   }
   catch {
       return null;
   }
}

const verifyToken = (token, type) => {
    const key = type === "accessToken" ? process.env.SECRET_ACCESS_KEY : process.env.SECRET_REFRESH_KEY; 
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, key);
        refreshCheck(decodedToken.id, decodedToken.count);
        return decodedToken;
    }
    catch {
        return null;
    }

};

const emailVerificationToken = (id, email) => {
    const token = jwt.sign({
        id, email
    }, process.env.SECRET_EMAIL_VERIFICATION_KEY, { expiresIn:'10m' });
    return token;
}

const verifyEmailToken = token => {
    try {
        const verifiedUser = jwt.verify(token, process.env.SECRET_EMAIL_VERIFICATION_KEY)
        return verifiedUser;
    }
    catch {
        return null;
    }
}

const forgotPasswordToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_FORGOT_PASSWORD_KEY, { expiresIn:'10m' })
}

module.exports = {
    tokenGenerator,
    verifyToken,
    emailVerificationToken,
    verifyEmailToken,
    forgotPasswordToken
};