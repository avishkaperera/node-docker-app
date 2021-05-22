import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ["true", "Title must be provided"]
    },
    body: {
        type: String,
        required: ["true", "Body must be provided"]
    }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
