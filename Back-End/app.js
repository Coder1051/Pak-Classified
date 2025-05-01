require("dotenv").config();
const path = require("path");
const { connectDB } = require('./data/utils');
const Message = require('./models/message')
const express = require("express");
const cors = require("cors");
const upload = require('./middleware/multer')

const PostAdRouter = require("./router/postAd.route")
const userRouter = require("./router/user.route")

const app = express();
app.use(cors());
// app.use('/uploads', express.static('uploads')); to upload image for user

const publicFolder = path.resolve(__dirname, "public")

const port = process.env.PORT
const host = process.env.HOST

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