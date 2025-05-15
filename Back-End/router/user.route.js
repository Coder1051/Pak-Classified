const { Router } = require('express');
const userController = require("../controllers/user.cont")
const userRouter = Router()
// const upload = require('../middleware/multer');
// const auth = require('../data/authMiddleware');
// userRouter.route("/signup") //for path image
//     .post(upload.single('image'), userController.Create);
userRouter.route("/signup")
    .post(userController.Create)
userRouter.route('/login')
    .post(userController.Login)
userRouter.route('/')
    .get(userController.getAll)
    .post(userController.Create)
userRouter.route('/:id')
    .get(userController.getById)
    .put(userController.Update)
    .delete(userController.Delete)
module.exports = userRouter
