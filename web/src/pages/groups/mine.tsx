import { Box } from '@chakra-ui/react';
import React from 'react';
import GroupTab from '../../components/group/GroupTab';
import Layout from '../../components/shared/Layout';
import Loading from '../../components/shared/Loading';
import { useMyGroupsQuery } from '../../generated/graphql';

function MyGroups() {
    const { data, loading } = useMyGroupsQuery();

    if(loading) {
        return <Loading />
    }

    return (
        <Layout>
            <Box
                w={530}>
                {data.myGroups.map(gm => (
                    <GroupTab
                        key={gm.groupId}
                        groupId={gm.groupId}
                        name={gm.group.name}
                        description={gm.group.description}
                         />
                ))}
            </Box>
        </Layout>
    )
}

export default MyGroups;
