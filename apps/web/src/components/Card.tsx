import React from "react";
import { motion } from "framer-motion";

const styles = `
    rounded-xl
    p-5
    bg-dark-gray
    border
    border-light-gray
    shadow-3xl
`;

const Card: React.FC<{
    withAnimation?: boolean
}> = ({ 
    children,
    withAnimation
}) => {
    const component = withAnimation
        ? (
            <motion.div 
                className={styles}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}>
                {children}
            </motion.div>
        )
        : (
            <div 
                className={styles}>
                {children}
            </div>
        );

    return component;
}

export default Card;