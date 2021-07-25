import { SpinnerIcon } from '@chakra-ui/icons';
import { Text, Flex, Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Layout from '../../components/Layout';
import { useMyGroupsQuery } from '../../generated/graphql';
import Group from '../../components/Group';
import PageLoading from '../../components/PageLoading';

function MyGroups() {
    const { data, loading, error } = useMyGroupsQuery();

    if(error) {
        return (<Box>{error.message}</Box>)
    }

    if(loading) {
        return <PageLoading />
    }

    if(data?.myGroups.length <= 0) {
        return (
            <Layout>
                <Text>
                    There is no any groups that you are member of
                </Text>
            </Layout>
        )
    }

    return (
        <Layout>
            <Flex
                flex={1}
                alignItems={"flex-start"}
                justifyContent={"center"}
                p={6}>
                <Flex flexDirection={"column"} w={"100%"} maxW={"38rem"}>
                    {data.myGroups.map(g => 
                        <Group key={g.id} id={g.id} name={g.name} description={g.description} />)}
                </Flex>
            </Flex>
        </Layout>
    )
}

export default MyGroups;
