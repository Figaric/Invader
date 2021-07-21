import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Link } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react';
import { useField } from "formik";
import NextLink from "next/link";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    hideForgotPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, hideForgotPassword, size: _, ...props }) => {
    const [field, { error }] = useField(props);
    
    return (
        <FormControl pb={4} isInvalid={!!error}>
            <Flex justifyContent={"space-between"}>
                <FormLabel fontWeight={600} htmlFor={field.name}>{label}</FormLabel>
                { props.type === "password" && !hideForgotPassword ? 
                    <NextLink
                        href={"/"}>
                        <Link fontSize={"15px"} my={"auto"} color={"white"}>
                            Forgot password?
                        </Link>
                    </NextLink> : null }
            </Flex>
            <Input {...field} {...props} id={field.name} />
            { error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
}

export default InputField;