const serverless = require('serverless-http');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, telephone, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contact Form Submission: ${subject}`,
        html: `<p>You have a new contact form submission from:</p>
               <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Telephone:</strong> ${telephone}</li>
                 <li><strong>Email:</strong> ${email}</li>
               </ul>
               <h3>Message:</h3>
               <p>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

module.exports.handler = serverless(app);