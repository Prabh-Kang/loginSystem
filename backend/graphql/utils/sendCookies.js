const { tokenGenerator } = require('./tokenGenerator');

const sendCookies = (id, username, email, res, type) => {
    let accessToken, refreshToken;
    if(type === "both") {
        refreshToken = tokenGenerator(id, username, email);
    }
    if(refreshToken) {
        res.cookie("refreshToken", refreshToken, { maxAge:1000*7*24*60*60, httpOnly:true } );
    }

    accessToken = tokenGenerator(id, username, email, "accessToken");
    res.cookie("accessToken", accessToken, { maxAge:1000*15*60, httpOnly:true })
};

module.exports = {
    sendCookies,
}