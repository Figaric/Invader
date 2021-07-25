import { Text, Flex, Heading, Box, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";
import styles from "./Group.module.css";
import { useRouter } from "next/router";
import { useGetGroupQuery } from '../generated/graphql';

interface GroupProps {
    id: number,
    name: string,
    description: string
}

const Group: React.FC<GroupProps> = ({ id, description, name }) => {
    const router = useRouter();

    return (
        <Flex
            onClick={() => router.replace(`/groups/${id}`)}
            boxShadow={"0 10px 20px rgba(0, 0, 0, 0.2)"}
            className={styles.group}
            bg={"#1A2028"}
            mb={"2rem"}
            h={"8rem"}
            style={{ transition: "transform 0.3s" }}>
            <Flex flex={1}>
                <Flex flexDirection={"column"} justifyContent={"space-between"} w={"80%"} p={4}>
                    <Heading as={"h5"} fontWeight={600} color={"white"}>
                        {name}
                    </Heading>
                    <Box w={"6rem"} bg={"gray.700"} h={"1px"} />
                    <Text fontWeight={500} fontSize={18} color={"white"}>
                        {description}
                    </Text>
                </Flex>

                {/* <Box w={"5rem"} /> */}

                {/* Group Icon */}
                <Flex
                    className={styles.groupIcon}
                    // bgGradient={"linear(to-l, #D52F1B, #FB8717)"}
                    bg={"crimson"}
                    w={"20%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{ transition: "background 0.3s" }}>
                    <Text color={"white"} fontWeight={200} fontSize={30}>
                        G
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Group;