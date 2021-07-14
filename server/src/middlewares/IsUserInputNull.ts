import isNullOrWhitespace from "../utils/isNullOrWhitespace";

export default function IsUserInputNull(req: any, res: any, next: any) {
    const { username, password } = req.body;

    if(isNullOrWhitespace(username)) {
        return res.status(400).json({ ok: false, error: { field: "username", message: "Username is required" } });
    }

    if(isNullOrWhitespace(password)) {
        return res.status(400).json({ ok: false, error: { field: "password", message: "Password is required" } });
    }

    return next();
}