import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';

interface GroupManagerProps {
    
}

const GroupManager: React.FC<GroupManagerProps> = ({ }) => {
    return (
        <Flex
            flexDir={"column"}>
            <Button
                colorScheme={"red"}
                mb={4}>
                Delete Group
            </Button>
            <Button
                colorScheme={"gray"}>
                Edit Group Info
            </Button>
        </Flex>
    )
}

export default GroupManager;
