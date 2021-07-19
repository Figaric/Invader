import { Request } from "express";
import { Session } from "express-session";

type RequestType = Request & { session: Session & { userId?: number } };

export default RequestType;