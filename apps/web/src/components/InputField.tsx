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
        <div
            className="
            ">
            <div className="
                flex
                flex-row
                mb-1
            ">
                <label 
                    htmlFor={field.name} 
                    className="
                        mr-1
                        text-lg
                    ">
                    {label}
                </label>
                {required && (
                    <span className="
                        text-orange-primary
                    ">
                        *
                    </span>
                )}
            </div>
            <div>
                <motion.input 
                    className="
                        text-lg
                        border
                        border-light-gray
                        bg-dark
                        rounded-xl
                        py-1
                        px-4
                        outline-0
                    "
                    id={field.name}
                    {...field} 
                    {...props}
                    whileFocus={{ 
                    }} />
            </div>
        </div>
    );
}

export default InputField;