require("dotenv").config();
const path = require("path");
const { connectDB } = require('./data/utils');
const Message = require('./models/message')
const express = require("express");
const cors = require("cors");
const upload = require('./middleware/multer')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const PostAdRouter = require("./router/postAd.route")
const userRouter = require("./router/user.route")

const app = express();
app.use(cors());
// app.use('/uploads', express.static('uploads')); to upload image for user

app.use(bodyParser.json());
const publicFolder = path.resolve(__dirname, "public")

const port = process.env.PORT
const host = process.env.HOST
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, //email here
        pass: process.env.EMAIL_PASS, // created app password
    },
});
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to send email.', error });
    }
});

app.use(express.static(publicFolder))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/api/v1/postAd", PostAdRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, host, () => {
    connectDB()
        .then(res => {
            console.log("db connected");
            console.log(`Server http://${host}:${port} is ready...`);
        })
        .catch(err => {
            console.log(err.message);
        });
});