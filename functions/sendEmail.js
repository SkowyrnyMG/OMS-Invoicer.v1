const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_SMTP_EMAIL,
    pass: process.env.REACT_EMAIL_PASSWORD,
  },
});

exports.handler = function (event, context, callback) {
  const { dest, title, body } = JSON.parse(event.body);

  const mailOptions = {
    from: process.env.REACT_SMTP_EMAIL,
    to: dest,
    subject: title,
    html: body,
  };

  transporter.sendMail(mailOptions, (erro) => {
    if (erro) {
      callback(erro);
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: 'Message send!',
      }),
    });
  });
};
