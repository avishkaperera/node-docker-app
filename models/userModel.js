import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: ["true", "Username mandatory"]
    },
    password: {
        type: String,
        required: ["true", "Password mandatory"]
    }
});

const User = mongoose.model("User", userSchema);

export default User;