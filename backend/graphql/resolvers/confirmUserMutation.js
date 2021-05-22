const User = require('../../mongoose/userSchema');
const { UserInputError } = require('apollo-server-express');
const { verifyEmailToken } =require('../utils/tokenGenerator');

module.exports = {
    confirmUser:async(_, { token }, { res }) => {

        const user = verifyEmailToken(token);
        console.log(user)
        
        if(user) {
            await User.updateOne({email:user.email}, { isConfirmed:true })
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return true;
        }

        throw new UserInputError("errors", {
            errors:{
                invalidToken: "Verification link has expired. Please click on the button below to send a new link"
            }
        })
    }
}