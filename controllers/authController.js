import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashedPass
        });
        req.session.user = user;
        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                status: "Failed",
                message: "User not found"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            req.session.user = user;
            return res.status(200).json({
                status: "Success"
            });
        } else {
            return res.status(400).json({
                status: "Failed",
                message: "Username or Password is incorrect"
            });
        }
    } catch (error) {
        consol.log(error);
        res.status(400).json({
            status: "Failed"
        });
    }
};