const { Router } = require("express");
const PostAdController = require("../controllers/postAd.cont");
const { Authentication, isAdmin } = require('../middleware/userMiddleWare');
const PostAdRouter = Router();

// Public route
PostAdRouter.get("/", PostAdController.getAll);

// Routes that require authentication
PostAdRouter.post("/", Authentication, PostAdController.Create);
PostAdRouter.get("/:id", Authentication, PostAdController.getById);
PostAdRouter.put("/:id", Authentication, PostAdController.Update);

// Route that requires admin
PostAdRouter.delete("/:id", Authentication, isAdmin, PostAdController.Delete);

module.exports = PostAdRouter;