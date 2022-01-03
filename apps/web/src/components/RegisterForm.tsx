import { Form, Formik } from "formik";
import React from "react";
import Button from "./Button";
import InputField from "./InputField";

function RegisterForm() {
    return (
        <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={(values) => {
                console.log("values: ", values);
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField
                        label="Username"
                        name="username" />
                    <InputField
                        label="Email"
                        name="email" />
                    <Button
                        isSubmit />
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;