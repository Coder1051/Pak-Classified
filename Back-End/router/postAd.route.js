// Without Authentication

// const { Router } = require("express")
// const PostAdController = require("../controllers/postAd.cont")
// const { Authentication, isAdmin } = require('../middleware/userMiddleWare')
// const PostAdRouter = Router();

// PostAdRouter.use(Authentication)
// PostAdRouter.route("/")
//     .get(PostAdController.getAll)
//     .post(PostAdController.Create)
// PostAdRouter.route("/:id")
//     .get(PostAdController.getById)
//     .put(PostAdController.Update)
//     .delete(PostAdController.Delete)
// module.exports = PostAdRouter

// with Authentication

const { Router } = require("express");
const PostAdController = require("../controllers/postAd.cont");
const { Authentication, isAdmin } = require('../middleware/userMiddleWare');

const PostAdRouter = Router();

// 👇 PUBLIC ROUTE — anyone can view all posts 
PostAdRouter.route("/")
    .get(PostAdController.getAll);

// 👇 PROTECTED ROUTES — only logged-in users
// PostAdRouter.use(Authentication);

PostAdRouter.route("/")
    .post(PostAdController.Create);

PostAdRouter.route("/:id")
    .get(PostAdController.getById)
    .put(PostAdController.Update)
    .delete(PostAdController.Delete);

module.exports = PostAdRouter;