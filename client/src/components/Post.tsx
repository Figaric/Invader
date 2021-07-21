import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface PostProps {
    title: string,
    text: string
}

const Post: React.FC<PostProps> = ({ title, text }) => {
    return (
        <Box
            boxShadow={"0 10px 20px rgba(0, 0, 0, 0.2)"}
            bg={"white"}
            border={"1px solid"}
            borderColor={"gray.300"}
            mb={"2rem"}>
            <Flex
                bgGradient={"linear(to-l, #021B79, #0575E6)"}
                alignItems={"center"}
                p={"1.5rem"}
                pb={0}>
                <Heading mb={4} color={"white"} fontWeight={600}>
                    {title}
                </Heading>
            </Flex>
            <Box
                p={"1.5rem"}>
                <Text
                    color={"gray.700"}
                    overflowWrap={"normal"}>
                    {text}
                </Text>
            </Box>
        </Box>
    );
}

export default Post;