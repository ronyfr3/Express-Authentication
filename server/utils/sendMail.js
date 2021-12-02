const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_PLAYGROUND_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    SENDER_EMAIL_PASS
} = process.env

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_PLAYGROUND_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = (to,url,txt) => {
    oauth2Client.setCredentials({
        refresh_token: OAUTH_PLAYGROUND_REFRESH_TOKEN
    })
    const access_token = oauth2Client.getAccessToken()
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: SENDER_EMAIL_ADDRESS,
          pass: SENDER_EMAIL_PASS,
          clientId:GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken:OAUTH_PLAYGROUND_REFRESH_TOKEN,
          accessToken: access_token,
        },
      });
      
      transporter.verify((err, success) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Server is ready to take messages: ${success}`);
        }
      });
    let mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Reset Your Password",
        html: `
            <div style="max-width: 700px; margin:auto; border: 5px solid #8EE4AF; padding: 50px 30px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase; color: #05386B;">Welcome to Varatia Application</h2>
            <p>Congratulations! You're almost set to start using Varatia App.
                Just click the button below to validate your email address.
            </p>  
            <a href=${url} style="background: green; text-decoration: none; color: #5CDB95; padding: 10px 25px; border-radius:25px; margin: 10px 0; display: inline-block;">${txt}</a>
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            <div>${url}</div>
            </div>
        `
    }
    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          res.status(400).json({
            msg: err.message,
          });
        } else {
          res.status(200).json({
            msg: "success",
          });
        }
      });
}

module.exports = sendEmail