import { motion } from "framer-motion";
import React, { useRef } from "react";

interface ButtonProps {
    isSubmit?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isSubmit }) => {
    const hiddenInputRef = useRef({} as HTMLInputElement);

    return (
        <>
            <motion.a 
                onClick={() => hiddenInputRef.current.click()}
                type="submit"
                className="
                    w-full
                    text-center
                    inline-block
                    py-2
                    px-6
                    rounded-lg
                    text-lg
                    bg-dark-light
                    cursor-pointer
                    select-none
                "
                whileTap={{ 
                    scale: 0.95,
                }}
                whileHover={{ 
                    backgroundColor: "#DD6B20",
                    color: "#fff"
                }}
            >
                {children}
            </motion.a>
            {isSubmit && (
                <input 
                    type="submit"
                    className="
                        hidden
                    " />
            )}
        </>
    );
}

export default Button;