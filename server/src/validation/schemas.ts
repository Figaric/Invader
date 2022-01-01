import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required")
        .min(3, "3 characters at least"),

    password: yup.string()
        .required("Password is required")
        .required("3 characters at least"),

    email: yup.string()
        .email("Invalid email format")
});