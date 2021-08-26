import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
    const [field, { error }] = useField(props);

    return (
        <FormControl minW={"250px"} mb={4} isInvalid={!!error}>
            <FormLabel color={"white"} htmlFor={field.name}>{label}</FormLabel>
            <Input 
                boxShadow={"inset 0px 0px 9px rgba(0, 0, 0, 0.5)"} 
                bg={"superDark"} 
                borderColor={"darkGray"} 
                color={"white"} 
                _placeholder={{ color: "darkGray" }} 
                {...field} {...props} 
                id={field.name} />
            { error && <FormErrorMessage>{error}</FormErrorMessage> }
        </FormControl>
    );
}

export default InputField;