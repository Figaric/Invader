import { Text, Img, Flex, Heading, Box, Button, Icon } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/shared/Layout';
import { useGetGroupQuery } from '../../generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';
import Loading from '../../components/shared/Loading';
import { defaultShadow } from '../../theme';
import GroupManager from '../../components/group/GroupManager';
import GroupPosts from '../../components/group/GroupPosts';

function Group() {
    const groupId = useGetIntId();
    const { data, loading } = useGetGroupQuery({
        variables: { groupId }
    });

    if(loading) {
        return <Loading />
    }

    console.log("group description: ", data.group.description);

    return (
        <Layout>
            <Box
                w={530}
                pt={25}>
                <Flex
                    rounded={"1rem"}
                    borderWidth={"1px"}
                    borderColor={"darkGray"}
                    p={"30px"}
                    bg={"semiDark"}
                    boxShadow={defaultShadow}
                    justifyContent={"space-between"}>
                    <Flex
                        flexDir={"column"}
                        justifyContent={"space-between"}>
                        <Box>
                            <Heading
                                mb={1}>
                                {data.group.name}
                            </Heading>
                            <p>
                                {/* to decide "line breaks" problem create separate <p> tag for each new line */}
                            </p>
                        </Box>
                        <GroupManager
                            groupId={groupId} />
                    </Flex>
                    <Box>
                        <Img
                            rounded={"6px"}
                            h={"130px"}
                            w={"130px"}
                            objectFit={"cover"}
                            src={"https://sun1-98.userapi.com/s/v1/ig2/XcPWGt8BVyOrNIlmvQnOmdEWGGnAuTrTZNexeTB9LU0L3b8NQ5h7Ny5Y55mitv1pid-RV6zA7BnhR3GvTumZqbLb.jpg?size=200x200&quality=96&crop=120,0,637,637&ava=1"} />
                    </Box>
                </Flex>

                {/* Splitter */}
                <Box 
                    h={"1px"}
                    bg={"gray.900"}
                    my={25}
                    mx={5} />
                
                <Box>
                    <GroupPosts
                        groupId={groupId} />
                </Box>
            </Box>
        </Layout>
    );
}

export default Group;
