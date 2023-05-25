const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, BASE_URL } = process.env;

const nodemailerConfige = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "zevgen83@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfige);

const sendEmail = async (email, verificationToken) => {
  const newEmail = {
    to: email,
    subject: "Verify your email, please",
    html: `<h3>You want to sign in?</h3><a style="font-size:16px" target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click this to verify your email</a>`,
    from: "zevgen83@meta.ua",
  };

  await transport.sendMail(newEmail);

  return true;
};

module.exports = sendEmail;
