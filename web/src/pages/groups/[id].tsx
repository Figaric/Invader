import { Text, Flex, Heading, Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/shared/Layout';
import { defaultShadow } from '../../theme';
import HandleQuery from '../../utils/HandleQuery';
import { useGetIntId } from '../../utils/useGetIntId';
import GroupManager from '../../components/group/GroupManager';

function Group() {

    return (
        <Layout>
            <Flex
                borderRadius={"1.15rem"}
                borderColor={"border"}
                boxShadow={defaultShadow}
                bg={"boxBg"}
                p={"40px"}>
                <Box>
                    <Heading 
                        mb={4}>
                        Super Group
                    </Heading>
                    <Text
                        fontSize={18}
                        color={"white"}
                        fontWeight={400}>
                        This is a super duper group
                    </Text>
                </Box>
                <GroupManager />
            </Flex>
        </Layout>
    )
}

export default Group;
