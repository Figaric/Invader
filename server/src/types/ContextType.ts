import { Response } from "express";
import Pusher from "pusher";
import RequestType from "./RequestType";

type ContextType = {
    req: RequestType,
    res: Response,
    pusher: Pusher
}

export default ContextType;