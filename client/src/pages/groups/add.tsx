import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import { FetchResult } from 'apollo-boost';
import { Formik, Form } from 'formik';
import router from 'next/dist/client/router';
import React from 'react'
import InputField from '../../components/InputField';
import Layout from '../../components/Layout'
import { CreateGroupMutation, RegisterMutation, useCreateGroupMutation } from '../../generated/graphql';
import register from '../register';

function AddGroup() {
    const [createGroup] = useCreateGroupMutation();

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
                        <Heading fontWeight={200} color={"white"}>Create Group</Heading>
                    </Flex>
                    <Box
                        p={"40px"}
                        pt={"25px"}>
                        <Formik
                            initialValues={{ name: "", description: "" }}
                            onSubmit={async ({ name, description }, { setFieldError, setSubmitting }) => {
                                let response: FetchResult<CreateGroupMutation>;
                                
                                try {
                                    response = await createGroup({ variables: { name, description } });
                                } catch(err) {
                                    const graphQlError = err.graphQLErrors[0];

                                    if(graphQlError.code === "FIELD_ERROR") {
                                        return setFieldError(graphQlError.field, err.message);
                                    }

                                    throw new Error("Something went wrong");
                                } finally {
                                    setSubmitting(false);
                                }

                                if(response.data.createGroup) {
                                    return router.replace("/groups/mine");
                                }
                            }}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <InputField
                                        name={"name"}
                                        label={"Group name"}
                                        placeholder={"Group name"} />
                                    <InputField
                                        name={"description"}
                                        label={"Description"}
                                        placeholder={"Description"} />
                                    <Flex>
                                        <Button
                                            colorScheme={"orange"}
                                            isLoading={isSubmitting}
                                            type={"submit"}>
                                            Create Group
                                        </Button>
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

export default AddGroup;
