import { Text, Box, Button, Heading, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import Layout from '../../components/shared/Layout';
import { defaultShadow } from '../../theme';
import * as yup from "yup";
import HandleMutation from '../../utils/HandleMutation';
import { useRouter } from 'next/router';
import InputField from '../../components/shared/InputField';
import NextLink from "next/link";
import { RegisterMutation, RegisterMutationVariables, useRegisterMutation } from '../../generated/graphql';

const registerSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(3),

    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),

    password: yup
        .string()
        .required("Password is required")
        .min(3)
});

function Register() {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <Layout>
            <Box textAlign={"center"}>
                <Heading color={"white"} fontWeight={250} my={"50px"}>
                    Register to <Text as={"span"} fontWeight={500} color={"orange.500"}>Invader</Text>
                </Heading>
                <Box
                    bg={"semiDark"}
                    borderWidth={"1px"}
                    borderStyle={"solid"}
                    borderColor={"darkGray"}
                    borderRadius={"20px"}
                    p={"35px"}
                    boxShadow={defaultShadow}>
                    <Formik
                        validationSchema={registerSchema}
                        initialValues={{ username: "", email: "", password: "" }}
                        onSubmit={async (values, { setFieldError }) => {
                            const { error } = await HandleMutation<RegisterMutation, RegisterMutationVariables>(values, register);

                            if(error) {
                                return setFieldError(error.field, error.message);
                            }

                            router.push("/account/login");
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name={"username"}
                                    label={"Username"}
                                    placeholder={"Username"} />
                                <InputField
                                    name={"email"}
                                    label={"Email"}
                                    placeholder={"Email"} />
                                <InputField
                                    name={"password"}
                                    label={"Password"}
                                    placeholder={"Password"}
                                    type={"password"} />
                                <Flex alignItems={"center"}>
                                    <Button
                                        flex={1}
                                        colorScheme={"orange"}
                                        type={"submit"}
                                        isLoading={isSubmitting}>
                                        Sign Up
                                    </Button>
                                    <NextLink href={"/account/login"}>
                                        <Link
                                            mx={4}
                                            color={"gray"}
                                            transition={"color 0.15s"}
                                            _hover={{ color: "white", textDecoration: "link" }}>
                                            Or Log in
                                        </Link>
                                    </NextLink>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Layout>
    );
}

export default Register;
