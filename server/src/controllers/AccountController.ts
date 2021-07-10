import argon2 from "argon2";
import { UserLoginDto, UserRegisterDto } from "../dtos/UserDtos";
import User from "../models/User";
import ResponseBase from "../ResponseBase";
import isNullOrWhitespace from "../utils/isNullOrWhitespace";

export async function registerUserAsync(input: UserRegisterDto): Promise<ResponseBase> {

    if(!input.username || isNullOrWhitespace(input.username)) {
        return ResponseBase.Failed("Username is required", "username");
    }

    if(!input.password || isNullOrWhitespace(input.password)) {
        return ResponseBase.Failed("Password is required", "password");
    }

    if(input.username.length <= 2) {
        return ResponseBase.Failed("Username must be at least 3 letters long", "username");
    }

    if(input.password.length <= 2) {
        return ResponseBase.Failed("Password must be at least 3 letters long", "password");
    }

    const lowerUsername = input.username.toLowerCase();
    const hashedPassword = await argon2.hash(input.password);

    const user = User.create({
        username: lowerUsername,
        password: hashedPassword
    });

    await User.save(user).catch(() => {
        if(User.findOne({ where: { username: lowerUsername } })) {
            return ResponseBase.Failed("This username is already taken.", "username");
        }

        return ResponseBase.Failed("Something went wrong");
    });

    return ResponseBase.Succeed();
};

export async function loginUserAsync(input: UserLoginDto): Promise<ResponseBase> {
    const user = await User.findOne({ where: { username: input.username.toLowerCase() } });

    if(!user) {
        return ResponseBase.Failed("User with this username doesn't exist.", "username");
    }

    const passwordVerificationResult = await argon2.verify(user.password, input.password);

    if(!passwordVerificationResult) {
        return ResponseBase.Failed("Incorrect password", "password");
    }

    return ResponseBase.Succeed();
}