// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport(
//     {
//         secure:true,
//         host:'smtp.gmail.com',
//         port:465,
//         auth:{
//             user:'acharyasahana081@gmail.com',
//             pass:'sjdnkmysjsxwpdce'
//         },
//         tls:{
//             rejectUnauthorized:false
//         }


//     }
// );

async function sendMail(to, sub, msg) {
  try {
    await transporter.sendMail({
      from: "acharyasahana081@gmail.com",
      to: to,
      subject: sub,
      html: msg
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
}
module.exports = sendMail;

