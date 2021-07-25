import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Text, Flex } from '@chakra-ui/react';
import React from 'react'
import { useGetMemberIdsQuery, useMeQuery } from '../generated/graphql';

function ManageGroupBtns({ groupId }) {
    const { data: me } = useMeQuery({
        skip: groupId === -1
    });
    const { loading, error, data } = useGetMemberIdsQuery({
        skip: groupId === -1,
        variables: { groupId },
    });

    if(loading) {
        return (
            null
        )
    }

    if(!data) {
        return (
            <Text>Something went wrong</Text>
        )
    }

    if(!data.getGroupMembers.find(gm => gm.member.id === me.me.id).isAdmin) {
        return null;
    }

    return (
        <Flex flexDirection={"column"} experimental_spaceY={2}>
            <Button rightIcon={<DeleteIcon/>} colorScheme={"gray"} _hover={{ backgroundColor: "crimson" }}>
                Delete Group
            </Button>
            <Button rightIcon={<EditIcon/>} colorScheme={"gray"}>
                Edit Group Info
            </Button>
        </Flex>
    )
}

export default ManageGroupBtns;
