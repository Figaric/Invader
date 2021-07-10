import { Router } from "express";
import { UserLoginDto, UserRegisterDto } from "../dtos/UserDtos";
import { loginUserAsync, registerUserAsync } from "../controllers/AccountController";

const accountRouter = Router();

accountRouter.post("/register", async (req, res) => {
    const response = await registerUserAsync(req.body as UserRegisterDto);

    return res.status(response.ok ? 201 : 400).send(response);
});

accountRouter.post("/login", async (req, res) => {
    const response = await loginUserAsync(req.body as UserLoginDto);

    if(response.ok) {
        (req as Express.Request & { session?: { userId?: number } }).session.userId = 1;
    }

    return res.status(response.ok ? 200 : 403).send(response);
});

export default accountRouter;