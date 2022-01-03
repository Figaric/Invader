import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required")
        .min(3, "3 characters at least"),

    email: yup.string()
        .email("Invalid email format"),
    
    password: yup.string()
        .required("Password is required")
        .min(3, "3 characters at least")
});

export const loginSchema = yup.object().shape({
    usernameOrEmail: yup
        .string(),

    password: yup.string()
});