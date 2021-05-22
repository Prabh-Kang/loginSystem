const nodemailer = require("nodemailer");
require('dotenv/config');

module.exports = (recepient, token) => {

    const transporter = nodemailer.createTransport({
          service:'Gmail',
    
        auth : {
        user:"sukhpawan410@gmail.com",
        pass: "pawansukh345"
      }
    
    })

    const mailOptions = {
      from: "Social App",
      to: recepient,
      subject: "Account Verification",
      text: "email verification",
      html:`<p>This is the email verification for your account on social app</p><br><a href='http://localhost:3000/auth/${token}'> Click here </a> to verify your account.<br>`   
    }

    transporter.sendMail(mailOptions,(err, info) => {
      if(err) {
        console.log(err)
      }
      else {console.log(info)}
    });
}

