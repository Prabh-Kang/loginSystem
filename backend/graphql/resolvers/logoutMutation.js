const User = require('../../mongoose/userSchema');

module.exports = {
    logout:async(_,__, { res }) => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return true;
    }
}