import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { TextareaHTMLAttributes } from "react";

type TextFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
    const [field, { error }] = useField(props);

    return (
        <FormControl minW={"250px"} mb={4} isInvalid={!!error}>
            <FormLabel color={"white"} htmlFor={field.name}>{label}</FormLabel>
            <Textarea 
                boxShadow={"inset 0px 0px 9px rgba(0, 0, 0, 0.5)"} 
                bg={"superDark"} 
                borderColor={"darkGray"} 
                color={"white"} 
                _placeholder={{ color: "darkGray" }} 
                {...field} {...props} 
                resize={"none"}
                h={"100px"}
                id={field.name} />
            { error && <FormErrorMessage>{error}</FormErrorMessage> }
        </FormControl>
    );
}

export default TextField;