const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server-express');
const User = require('../../mongoose/userSchema');
const { regEx, loginValidator } = require('../utils/validators');
const { sendCookies } = require('../utils/sendCookies');
const { disableExperimentalFragmentVariables } = require('graphql-tag');

module.exports = {
    login:async(_, { loginInput: { email, password } }, { res }) => {
        
        const { errors, valid } = loginValidator(email, password);
        if(!valid) {
            throw new UserInputError("errors", errors);
        }

        let user = await User.findOne({ email })

        if(!user) {
            throw new UserInputError("errors", {
                errors:{
                    userCredentials:"User not found"
                }
            })
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            throw new UserInputError("errors", {
                errors:{
                    passwordCredentials:"Wrong credentials"
                }
            })
        }
        
        sendCookies(user.id, user.username,user.email, res, "both");
        return {
        	id:user.id,
        	username:user.username,
        	email:user.email,
            isConfirmed:user.isConfirmed,
        }
        ;
    }
}
