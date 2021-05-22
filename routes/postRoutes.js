import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter
    .route("/")
    .get(protect, getAllPosts)
    .post(protect, createPost);

postRouter
    .route("/:id")
    .get(getPost)
    .patch(updatePost)
    .delete(deletePost);

export default postRouter;