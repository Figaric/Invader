import { Request } from "express";
import { Session } from "express-session";
import { ObjectId } from "mongoose";

type RequestType = Request & { session: Session & { userId?: ObjectId } };

export default RequestType;