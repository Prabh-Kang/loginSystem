const { verifyToken } = require('../graphql/utils/tokenGenerator');
const { sendCookies } = require('../graphql/utils/sendCookies');

module.exports = (req, res, next) => {
    
    const accessToken = req.cookies["accessToken"];
    let token = verifyToken(accessToken, "accessToken");

    if(token) {
        req.userID = token.id;
        return next();
    }
    const refreshToken = req.cookies["refreshToken"];
    token = verifyToken(refreshToken, "refreshToken");
    if(token) {
        sendCookies(token.id, token.username, token.email, res, "accessToken")
        req.userID = token.id;
        return next();
    }  
    return next();
}