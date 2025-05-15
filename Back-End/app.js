const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { connectDB } = require('./data/utils');
const Message = require('./models/message');
// const upload = require('./middleware/multer');

const PostAdRouter = require("./router/postAd.route");
const userRouter = require("./router/user.route");
const RolesRouter =require('./router/roles.route')

const app = express();

// CORS setup
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolder = path.resolve(__dirname, "public");
app.use(express.static(publicFolder));

const port = process.env.PORT;
const host = process.env.HOST;

// Routes
app.use("/api/v1/postAd", PostAdRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/roles", RolesRouter);

//server start
app.listen(port, host, () => {
    connectDB()
        .then(() => {
            console.log("db connected");
            console.log(`Server http://${host}:${port} is ready...`);
        })
        .catch(err => {
            console.log(err.message);
        });
});
