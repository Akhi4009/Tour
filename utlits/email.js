const nodemailer=require("nodemailer")

require('dotenv').config()

const sendEmail=async options=>{

    //create a transporter
    
    const transporter=nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }

    })

    //DEFINE THE EMAIL OPTION

    const mailOptions={
        from:'akhilesh yadav <akhilesh@gmail.com>',
        to:options.email,
        subject: options.subject,
        text: options.message
    }

    //actually send the email
    await transporter.sendMail(mailOptions)

}
module.exports=sendEmail