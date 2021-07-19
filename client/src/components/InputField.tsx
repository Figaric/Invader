import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react';
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
    const [field, { error }] = useField(props);
    
    return (
        <FormControl pb={4} isInvalid={!!error}>
            <FormLabel fontWeight={600} htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} />
            { error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
}

export default InputField;