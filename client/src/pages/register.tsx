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
                    bg={"#1A2028"}
                    boxShadow={"0 10px 20px rgba(0, 0, 0, 0.2)"}
                    rounded={"0.5rem"}>
                    <Flex
                        p={"40px"}
                        py={"25px"}
                        bgGradient={"linear(to-l, #D52F1B, #FB8717)"}
                        alignItems={"center"}
                        roundedTop={"0.5rem"}>
                        <Heading fontWeight={200} color={"white"}>Register</Heading>
                    </Flex>
                    <Box
                        p={"40px"}
                        pt={"25px"}>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={async ({ username, password }, { setFieldError, setSubmitting }) => {
                                let response: FetchResult<RegisterMutation>;
                                
                                try {
                                    response = await register({ variables: { registerUsername: username, registerPassword: password } });
                                } catch(err) {
                                    const graphQlError = err.graphQLErrors[0];

                                    if(graphQlError.code === "FIELD_ERROR") {
                                        return setFieldError(graphQlError.field, err.message);
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
                                        name={"email"}
                                        label={"Email"}
                                        placeholder={"Email"} />
                                    <InputField
                                        name={"password"}
                                        label={"Password"}
                                        placeholder={"Password"}
                                        type={"password"}
                                        hideForgotPassword />
                                    <Flex>
                                        <Button
                                            colorScheme={"orange"}
                                            isLoading={isSubmitting}
                                            type={"submit"}>
                                            Sing Up
                                        </Button>
                                        <NextLink
                                            href={"/login"}>
                                            <Link
                                                pl={4} fontSize={"15px"} my={"auto"} color={"white"}>
                                                Already have account?
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

export default Register;