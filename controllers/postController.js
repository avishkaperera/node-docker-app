import Post from "./../models/postModel.js";

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: "Success",
            results: posts.length,
            data: posts
        });
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            results: post.length,
            data: post
        });
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};

export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: "Success",
            results: post.length,
            data: post
        });
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "Success",
            results: post.length,
            data: post
        });
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success"
        });
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};