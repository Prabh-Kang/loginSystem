const { UserInputError } = require('apollo-server-express');
const { registerValidator } = require('../utils/validators');
const User = require('../../mongoose/userSchema');
const bcrypt = require('bcrypt');
const { emailVerificationToken } = require('../utils/tokenGenerator');
const { sendCookies } = require('../utils/sendCookies');
const sendEmail = require('../utils/sendConfirmationEmail');

module.exports = {
    register: async(_, { registerInput:{ username, email, password, confirmPassword } }, { res }) => {

        const { valid, errors } = registerValidator(username, email, password, confirmPassword);
      
        if (!valid) {
            throw new UserInputError("errors", errors)
        }

        const emailExists = await User.findOne({email});
        
        if(emailExists) {
            throw new UserInputError("Email is taken", {
                errors:{
                    email:"Email is already taken",
                }
            })
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password:hashPassword,
        })

        sendCookies(newUser._id, username, email, res, "both");
        
        const emailToken = emailVerificationToken(newUser._id, email);
        sendEmail(email, emailToken)       
        
        return {
            id:newUser._id,
            username,
            email,
            isConfirmed:newUser.isConfirmed
        };
    }
}