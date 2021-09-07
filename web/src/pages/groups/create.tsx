import { Text, Box, Button, Heading, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import Layout from '../../components/shared/Layout';
import { defaultShadow } from '../../theme';
import * as yup from "yup";
import HandleMutation from '../../utils/HandleMutation';
import { useRouter } from 'next/router';
import InputField from '../../components/shared/InputField';
import { CreateGroupMutation, CreateGroupMutationVariables, useCreateGroupMutation } from '../../generated/graphql';
import TextField from '../../components/shared/TextField';

const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Group name is required")
        .min(3),

    description: yup
        .string()
        .required("Group description is required")
});

function Register() {
    const router = useRouter();
    const [createGroup] = useCreateGroupMutation();

    return (
        <Layout>
            <Box textAlign={"center"}>
                <Heading color={"white"} fontWeight={250} my={"50px"}>
                    Create <Text as={"span"} fontWeight={500} color={"orange.500"}>Group</Text>
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
                        initialValues={{ name: "", description: "" }}
                        onSubmit={async (values, { setFieldError }) => {
                            const { error, data } = await HandleMutation<CreateGroupMutation, CreateGroupMutationVariables>(values, createGroup);

                            if(error || !data.createGroup) {
                                return setFieldError(error.field, error.message);
                            }

                            router.push("/groups/" + data.createGroup);
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name={"name"}
                                    label={"Name"}
                                    placeholder={"Name"} />
                                <TextField
                                    name={"description"}
                                    label={"Description"}
                                    placeholder={"Group description here..."} />
                                <Button
                                    flex={1}
                                    colorScheme={"orange"}
                                    type={"submit"}
                                    isLoading={isSubmitting}>
                                    Create Group
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Layout>
    );
}

export default Register;
