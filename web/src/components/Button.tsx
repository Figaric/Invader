import { motion } from "framer-motion";

const Button: React.FC = ({ children }) => {
    return (
        <motion.a 
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
    );
}

export default Button;