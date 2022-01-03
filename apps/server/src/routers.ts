import { registerSchema, loginSchema } from "validation";
import * as trpc from "@trpc/server";

const routers = trpc.router()
    .query("register", {
        input: registerSchema,
        resolve: () => {
            
        }
    })
    .mutation("login", {
        input: loginSchema,
        resolve: () => {

        }
    })