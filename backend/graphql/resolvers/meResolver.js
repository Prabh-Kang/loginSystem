 const User = require('../../mongoose/userSchema');


module.exports = {
    me:async(_,__, { req }) => {
        
        if(req.userID) {

            const user = await User.findById(req.userID);
            return {
                id:user.id,
                email:user.email,
                username:user.username,
                isConfirmed:user.isConfirmed
            }
        }
        return null 
    }
}