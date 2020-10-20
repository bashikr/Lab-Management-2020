/**
 * Route for Lab.
 */
"use strict";

const express = require('express');
const cors = require('cors');
const router = express();
const nodemailer = require('nodemailer');

router.use(cors());
router.post('/send-email/', (req,res) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "your email", // generated ethereal user
        pass: "your password", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: req.body.from,
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: req.body.html
        // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    transporter.sendMail(info, (error, response) => {
        if(error) {
            res.send(error)
        }
        else {
            res.send("Success")
        }
    })
    transporter.close();

});

module.exports = router;
