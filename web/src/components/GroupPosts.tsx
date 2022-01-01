import { motion } from "framer-motion";
import Card from "./Card";

function GroupPosts() {
    return (
        <div>
            <motion.ul
                initial={{ 
                    opacity: 0,
                    y: "48px"
                }}
                animate={{
                    opacity: 1,
                    y: "16px"
                }}
                transition={{
                    duration: 1
                }}>
                <li>
                    <Card>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, cumque eaque consequatur ullam iusto doloremque perferendis assumenda saepe magni illo dignissimos, doloribus quia pariatur ipsa! Eaque similique officiis praesentium velit?
                        </p>
                    </Card>
                </li>
            </motion.ul>
        </div>
    );
}

export default GroupPosts;