import * as yup from "yup";

const registerSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(3),

    email: yup
        .string()
        .email("Invalid email format"),

    password: yup
        .string()
        .required("Password is required")
        .min(3)
});

export default registerSchema;