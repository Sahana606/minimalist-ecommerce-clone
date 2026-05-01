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

async function sendMail(to, sub, msg,attachments =[]) {
  try {
    await transporter.sendMail({
      from: "proceess.env.EMAIL_FROM",
      to: to,
      subject: sub,
      html: msg,
      attachments:attachments.map(file=>({
        content:file.content.toString("base64"),
        filename:file.filename,
        type:"applications/pdf",
        disposition:"attachment",
      })),
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
}
module.exports = sendMail;

