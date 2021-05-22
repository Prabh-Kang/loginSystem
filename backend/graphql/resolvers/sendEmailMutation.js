const sendConfirmationEmailFn = require('../utils/sendConfirmationEmail'); 
const { emailVerificationToken } = require('../utils/tokenGenerator');

module.exports = {
    sendEmail:(_,{ email, id }) => {
        const token = emailVerificationToken(id, email);
        sendConfirmationEmailFn(email, token);
        return true;    
    }
}