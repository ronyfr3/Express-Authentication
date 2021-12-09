const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  OAUTH_PLAYGROUND_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
  SENDER_EMAIL_PASS,
} = process.env;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  OAUTH_PLAYGROUND_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = () => {
  oauth2Client.setCredentials({
    refresh_token: OAUTH_PLAYGROUND_REFRESH_TOKEN,
  });
  const access_token = oauth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      pass: SENDER_EMAIL_PASS,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: OAUTH_PLAYGROUND_REFRESH_TOKEN,
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
    to: "rakib.devatmern@gmail.com",
    subject: "Reset Your Password",
    html: '<img src="cid:logo192"/>',
    attachments: [
      {
        filename: "logo192.png",
        path: __dirname + "/logo192.png",
      },
    ],
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      //status undefined error will occure if google client is mismatch
      res.status(400).json({ msg: err.message });
      console.log(err.message);
    } else {
      res.status(200).json({
        msg: "success",
      });
    }
  });
};

module.exports = sendEmail;
