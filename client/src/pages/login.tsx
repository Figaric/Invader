import { Flex, Box, Heading, Link, Button } from '@chakra-ui/react';
import { FetchResult } from 'apollo-boost';
import { Formik, Form } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { LoginMutation, RegisterMutation, useLoginMutation } from '../generated/graphql';
import NextLink from "next/link";
import { useRouter } from 'next/dist/client/router';

function Login() {
    const [login] = useLoginMutation();
    const router = useRouter();

    return (
        <Layout>
            <Flex
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}>
                <Box
                    width={"100%"}
                    maxWidth={"30em"}
                    bg={"white"}
                    boxShadow={"0 10px 20px rgba(0, 0, 0, 0.2)"}
                    rounded={"0.5rem"}>
                    <Flex
                        p={"40px"}
                        py={"25px"}
                        bgGradient={"linear(to-l, #021B79, #0575E6)"}
                        alignItems={"center"}
                        roundedTop={"0.5rem"}>
                        <Heading fontWeight={200} color={"white"}>Login</Heading>
                    </Flex>
                    <Box
                        p={"40px"}>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={async ({ username, password }, { setFieldError, setSubmitting }) => {
                                let response: FetchResult<LoginMutation>;
                                
                                try {
                                    response = await login({ variables: { loginUsername: username, loginPassword: password } });
                                } catch(err) {
                                    const graphQlError = err.graphQLErrors[0];

                                    if(graphQlError.code === "FIELD_ERROR") {
                                        return setFieldError(graphQlError.field, graphQlError.message);
                                    }

                                    throw new Error("Something went wrong");
                                } finally {
                                    setSubmitting(false);
                                }

                                if(response?.data.login) {
                                    return router.push("/");
                                }

                                throw new Error("Something went wrong");
                            }}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <InputField
                                        name={"username"}
                                        label={"Username"}
                                        placeholder={"Username"} />
                                    <InputField
                                        name={"password"}
                                        label={"Password"}
                                        placeholder={"Password"}
                                        type={"password"} />
                                    <Flex
                                        pb={4}
                                        justifyContent={"flex-end"}>
                                        <NextLink
                                            href={"/"}>
                                            <Link color={"gray.700"}>
                                                forgot password
                                            </Link>
                                        </NextLink>
                                    </Flex>
                                    <Button
                                        colorScheme={"blue"}
                                        isLoading={isSubmitting}
                                        type={"submit"}>
                                        Sing In
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Flex>
        </Layout>
    )
}

export default Login;
