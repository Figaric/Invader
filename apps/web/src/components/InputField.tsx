import { useField } from "formik";
import { motion, MotionProps } from "framer-motion";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & MotionProps & {
    label: string;
    name: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
    label,
    required,
    ...props
}) => {
    const [field, { error }] = useField(props);

    return (
        <div>
            Input Field!
        </div>
    );
}

export default InputField;