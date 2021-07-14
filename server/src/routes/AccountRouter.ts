import express from "express";
import ResponseBase from "../ResponseBase";
import argon2 from "argon2";
import { UserLoginDto, UserRegisterDto } from "../dtos/UserDtos";
import validator from "validator";
import User from "../models/User";
import { Session } from "express-session";
import { ObjectId } from "mongoose";

const accountRouter = express.Router();

accountRouter.post("/login", async (req, res) => {
    const dto: UserLoginDto = req.body;
    const user = await User.findOne({ username: dto.username.toLowerCase() }).exec();

    if(!user) {
        return res.status(403).json(ResponseBase.Failed("User with this username doesn't exist", "username"));
    }

    const passwordVerificationResult = await argon2.verify(user.password, req.body.password);

    if(!passwordVerificationResult) {
        return res.status(403).json(ResponseBase.Failed("Incorrect password", "password"));
    }

    (req as { session: Session & { userId?: ObjectId } }).session.userId = user._id;
    
    return res.json(user);
});

accountRouter.post("/register", async (req, res) => {

    const dto: UserRegisterDto = req.body;

    if(!validator.isLength(dto.username, { min: 3 })) {
        return res.status(400).json(ResponseBase.Failed("Username must be at least 3 characters long", "username"));
    }

    if(!validator.isLength(dto.password, { min: 3 })) {
        return res.status(400).json(ResponseBase.Failed("Password must be at least 3 characters long", "password"));
    }

    const lowerUsername = dto.username.toLowerCase();
    const hashedPassword = await argon2.hash(dto.password);

    try {
        await User.create({
            username: lowerUsername,
            password: hashedPassword
        });
    } catch {
        if(await User.findOne({ username: lowerUsername }).exec()) {
            return res.status(400).json(ResponseBase.Failed("This username is already taken.", "username"));
        }

        return res.status(500).json(ResponseBase.Failed("Something went wrong"));
    }

    return res.status(201).send(ResponseBase.Succeed());
});

export default accountRouter;