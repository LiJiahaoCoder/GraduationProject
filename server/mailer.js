const mailer = require('nodemailer');

const transport = mailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: false,
  port: 456,
  auth: {
    user: 'george.1997@qq.com',
    pass: 'enpwodeuloxcdiej'
  }
});

function mailOptions(to, resetCode) {
  return {
    from: '"易" <george.1997@qq.com>',
    to: to,
    subject: '易 - 找回密码',
    text: '请勿告诉别人，验证码：'+resetCode
  };
};

module.exports = {
  sendMail: transport.sendMail,
  mailOptions: mailOptions
}