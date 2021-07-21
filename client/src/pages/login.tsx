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
                    bg={"#1A2028"}
                    boxShadow={"0 10px 20px rgba(0, 0, 0, 0.2)"}
                    rounded={"0.5rem"}>
                    <Flex
                        p={"40px"}
                        py={"25px"}
                        bgGradient={"linear(to-l, #D52F1B, #FB8717)"}
                        alignItems={"center"}
                        roundedTop={"0.5rem"}>
                        <Heading fontWeight={200} color={"white"}>Login</Heading>
                    </Flex>
                    <Box
                        p={"40px"}
                        pt={"25px"}>
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
                                    <Flex>
                                        <Button
                                            colorScheme={"orange"}
                                            isLoading={isSubmitting}
                                            type={"submit"}>
                                            Sing In
                                        </Button>
                                        <NextLink
                                            href={"/register"}>
                                            <Link
                                                pl={4} fontSize={"15px"} my={"auto"} color={"white"}>
                                                Do not have account?
                                            </Link>
                                        </NextLink>
                                    </Flex>
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
