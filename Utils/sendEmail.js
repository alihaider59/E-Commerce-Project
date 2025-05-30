const nodemailer = require("nodemailer");

//Sending Email
const sendEmail = async (toEmail, subject, text) => {
  const tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ali.haider.cp59@gmail.com",
      pass: "lghi ewdn lryo tqud",
    },
  });

  const mailOptions = {
    from: "ali.haider.cp59@gmail.com",
    to: toEmail,
    subject: subject,
    text: text,
  };

  try {
    await tranporter.sendMail(mailOptions);
    return { message: "Mail Sent Successfully" };
  } catch (error) {
    return { message: "Something went wrong in sending mail", error };
  }
};

module.exports = sendEmail;
