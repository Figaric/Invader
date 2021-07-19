// import Post from "../models/Post";
// import { Arg, Field, Mutation, Resolver, UseMiddleware } from "type-graphql";
// import MustBeAuth from "src/middlewares/MustBeAuth";
// import isNullOrWhitespace from "src/utils/isNullOrWhitespace";
// import FieldError from "src/FieldError";

// @Resolver(Post)
// export default class PostResolver {
//     @Mutation(() => Boolean)
//     @UseMiddleware(MustBeAuth)
//     async createPost(
//         @Arg("title") title: string,
//         @Arg("text") text: string
//     ): Promise<boolean> {
//         if(isNullOrWhitespace(title)) {
//             throw new FieldError();
//         }

//         return true;
//     }
// }
// export default function UsePostRouter(app: Express, pusher: Pusher) {
//     app.post("/", MustBeAuth, async (req: RequestType, res) => {
//         const { title, text, groupId } = req.body;
    
//         if(isNullOrWhitespace(title)) {
//             return res.status(400).json({ ok: false, error: { field: "title", message: "Title is required" } });
//         }
    
//         if(isNullOrWhitespace(text)) {
//             return res.status(400).json({ ok: false, error: { field: "text", message: "Text is required" } });
//         }
    
//         if(typeof groupId !== "number") {
//             return res.status(400).json({ ok: false, error: { field: "groupId", message: "GroupId is required." } });
//         }
    
//         if(!(await Group.findOne({ where: { id: groupId } }))) {
//             return res.status(400).json({ ok: false, error: { field: "groupId", message: "Group with this id is not found" } });
//         }
    
//         const post = Post.create({
//             title,
//             text,
//             authorId: req.session.userId,
//             groupId
//         })
    
//         try {
//             await Post.save(post);

//             // pusher.trigger("");
//         } catch {
//             return res.status(500).json({ ok: false, error: { message: "Something went wrong" } });
//         }
    
//         return res.status(201).json({ ok: true });
//     });


// }