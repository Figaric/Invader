import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import NextLink from "next/link";
import { RegisterMutation, RegisterMutationVariables, useRegisterMutation } from '../generated/graphql';
import { FetchResult } from 'apollo-boost';
import { useRouter } from 'next/dist/client/router';

function Register() {
    const router = useRouter();
    const [register] = useRegisterMutation();

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
                        <Heading fontWeight={200} color={"white"}>Register</Heading>
                    </Flex>
                    <Box
                        p={"40px"}>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={async ({ username, password }, { setFieldError, setSubmitting }) => {
                                let response: FetchResult<RegisterMutation>;
                                
                                try {
                                    response = await register({ variables: { registerUsername: username, registerPassword: password } });
                                } catch(err) {
                                    const graphQlError = err.graphQLErrors[0];

                                    if(graphQlError.extensions.code === "FIELD_ERROR") {
                                        return setFieldError(graphQlError.extensions.exception.field, err.message);
                                    }

                                    throw new Error("Something went wrong");
                                } finally {
                                    setSubmitting(false);
                                }

                                if(response.data.register) {
                                    return router.push("/login");
                                }
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
                                        Sing Up
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

export default Register;