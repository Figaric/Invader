import express from "express";
import RequestType from "../types/RequestType";
import validator from "validator";
import argon2 from "argon2";
import UserModel from "../models/User";

const userRouter = express.Router();

userRouter.post("/login", async (req: RequestType, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if(!user) {
        return res.status(404).json({ ok: false, error: { field: "username", message: "User with this username doesn't exist." } });
    }

    const passwordVerificationResult = await argon2.verify(user.password, password);

    if(!passwordVerificationResult) {
        return res.status(403).json({ ok: false, error: { field: "password", message: "Incorrect password" } });
    }

    req.session.userId = user._id;

    return res.json({ ok: true });
});

userRouter.post("/register", async (req: RequestType, res) => {
    const { username, password } = req.body;

    if(!validator.isLength(username, { min: 3 })) {
        return res.status(400).json({ ok: false, error: { field: "username", message: "Username must be at least 3 letters long" } });
    }

    if(!validator.isLength(password, { min: 3 })) {
        return res.status(400).json({ ok: false, error: { field: "password", message: "Password must be at least 3 letters long" } });
    }

    const lowerUsername = username.toLowerCase();
    const hashedPassword = await argon2.hash(password);

    try {
        await UserModel.create({
            username: lowerUsername,
            password: hashedPassword
        });
    } catch {
        if(await UserModel.findOne({ username: lowerUsername }).exec()) {
            return res.status(400).json({ ok: false, error: { field: "username", message: "This username is already taken." } });
        }

        return res.status(500).json({ ok: false, error: { message: "Something went wrong" } });
    }

    return res.status(201).json({ ok: true });
});

export default userRouter;