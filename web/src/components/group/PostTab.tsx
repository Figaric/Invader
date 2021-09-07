import { Text, Box, Heading, Img } from "@chakra-ui/react";
import React from "react";
import { defaultShadow, shallowShadow } from "../../theme";
import styles from "./PostTab.module.css";

interface PostTabProps {
    title: string,
    text: string,
    // color: string
}

const PostTab: React.FC<PostTabProps> = ({
    title,
    text,
    // color
}) => {

    return (
        <Box
            className={styles.container}
            rounded={"0.8rem"}
            borderWidthBottom={4}
            borderColor={"#C62368"}
            p={"25px"}
            bg={"semiDark"}
            boxShadow={shallowShadow}
            transition={`
            transform 0.3s,
            border-radius 0.3s,
            box-shadow 0.3s
            `}>
            <Box>
                <Heading
                    color={"#C62368"}
                    mb={2}>
                    {title}
                </Heading>
                <Text>{text}</Text>
            </Box>
        </Box>
    );
}

export default PostTab;