import { Text, Link, Box, Button, Heading, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../../components/shared/InputField';
import Layout from '../../components/shared/Layout';
import { defaultShadow } from '../../theme';
import HandleMutation from '../../utils/HandleMutation';
import * as yup from "yup";

const loginSchema = yup.object().shape({
    usernameOrEmail: yup
        .string()
        .required("Username or Email is required")
        .min(3),

    password: yup
        .string()
        .required("Password is required")
        .min(3)
});

function Login() {
    const router = useRouter();
    const [login] = useLogin

    return (
        <Layout>
            <Box textAlign={"center"}>
                <Heading color={"white"} fontWeight={250} my={"50px"}>
                    Login to <Text as={"span"} fontWeight={500} color={"orange.500"}>Invader</Text>
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
                        validationSchema={loginSchema}
                        initialValues={{ usernameOrEmail: "", password: "" }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true);

                            setTimeout(() => {
                                console.log(values);
                                setSubmitting(false);
                            }, 3000);
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name={"usernameOrEmail"}
                                    label={"Username or Email"}
                                    placeholder={"Username or Email"} />
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
                                        Sign In
                                    </Button>
                                    <NextLink href={"/account/register"}>
                                        <Link
                                            mx={4}
                                            color={"gray"}
                                            transition={"color 0.15s"}
                                            _hover={{ color: "white", textDecoration: "link" }}>
                                            Or Register
                                        </Link>
                                    </NextLink>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Layout>
    )
};

export default Login;
