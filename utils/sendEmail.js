const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service:'gmail',
        auth: {
            user:'erenyeagetatakae@gmail.com',
            pass: 'gsicjnmbfbzkgzag',
        },
    });
    const mailOptions = {
        from : 'erenyeagetatakae@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;