import User from "../models/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import ContextType from "../types/ContextType";
import FieldError from "../errors/FieldError";
import argon2 from "argon2";
import validator from "validator";
import { ApolloError } from "apollo-server-express";

@Resolver(User)
export default class UserResolver {
    @Mutation(() => Boolean)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Ctx() { req }: ContextType
    ): Promise<boolean> {
        const user = await User.findOne({ where: { username: username.toLowerCase() } });

        if(!user) {
            throw new FieldError("username", "Such user doesn't exist.");
        }

        const passwordVerificationResult = await argon2.verify(user.password, password);

        // console.log(`ver result: ${passwordVerificationResult} | hash: ${user.password} | password: ${password}`);

        if(!passwordVerificationResult) {
            throw new FieldError("password", "Incorrect password");
        }
        
        req.session.userId = user.id;

        return true;
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<Boolean> {
        if(!validator.isLength(username, { min: 3 })) {
            throw new FieldError("username", "Username must be at least 3 characters long.");
        }

        if(!validator.isLength(password, { min: 3 })) {
            throw new FieldError("password", "Password must be at least 3 characters long.");
        }

        const lowerUsername = username.toLowerCase();
        const hashedPassword = await argon2.hash(password);

        try {
            await User.insert({
                username: lowerUsername,
                password: hashedPassword
            });
        } catch {
            if(await User.findOne({ where: { username: lowerUsername } })) {
                throw new FieldError("username", "This username is already taken.");
            }

            throw new ApolloError("Something went wrong");
        }

        return true;
    }

}

// const userRouter = express.Router();

// userRouter.get("/me", MustBeAuth, async (req: RequestType, res) => {
//     const currectUser = await User.findOne({ where: { id: req.session.userId } });

//     return res.status(200).json({ ok: true, data: currectUser });
// });

// userRouter.post("/login", async (req: RequestType, res) => {
//     const { username, password } = req.body;

//     const user = await User.findOne({ where: { username: username.toLowerCase() } });

//     if(!user) {
//         return res.status(404).json({ ok: false, error: { field: "username", message: "User with this username doesn't exist." } });
//     }

//     const passwordVerificationResult = await argon2.verify(user.password, password);

//     if(!passwordVerificationResult) {
//         return res.status(403).json({ ok: false, error: { field: "password", message: "Incorrect password" } });
//     }

//     req.session.userId = user.id;

//     return res.json({ ok: true });
// });

// userRouter.post("/register", async (req: RequestType, res) => {
//     const { username, password } = req.body;

//     if(!validator.isLength(username, { min: 3 })) {
//         return res.status(400).json({ ok: false, error: { field: "username", message: "Username must be at least 3 letters long" } });
//     }

//     if(!validator.isLength(password, { min: 3 })) {
//         return res.status(400).json({ ok: false, error: { field: "password", message: "Password must be at least 3 letters long" } });
//     }

//     const lowerUsername = username.toLowerCase();
//     const hashedPassword = await argon2.hash(password);

//     try {
//         await User.create({
//             username: lowerUsername,
//             password: hashedPassword
//         }).save();
//     } catch {
//         if(await User.findOne({ where: { username: lowerUsername }})) {
//             return res.status(400).json({ ok: false, error: { field: "username", message: "This username is already taken." } });
//         }

//         return res.status(500).json({ ok: false, error: { message: "Something went wrong" } });
//     }

//     return res.status(201).json({ ok: true });
// });

// export default userRouter;