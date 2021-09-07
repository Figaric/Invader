import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons"
import React, { useState } from 'react';
import { shallowShadow } from '../../theme';

function GroupManagerDropdown() {
    return (
        <Flex
            position={"absolute"}
            top={"195px"}
            p={15}
            borderWidth={"1px"}
            borderColor={"darkGray"}
            bg={"semiDark"}
            translateX={25}
            rounded={"1rem"}
            flexDir={"column"}
            experimental_spaceY={2}
            boxShadow={shallowShadow}>
            <Button
                colorScheme={"default"}
                leftIcon={<EditIcon/>}>
                Edit Group
            </Button>
            <Button 
                colorScheme={"delete"} 
                leftIcon={<DeleteIcon/>}>
                Delete Group
            </Button>
        </Flex>
    );
}


interface GroupManagerProps {
    groupId: number;
}

const GroupManager: React.FC<GroupManagerProps> = ({ groupId }) => {
    const [open, setOpen] = useState(false);

    return (
        <Box>
            {/* <Button
                colorScheme={"orange"}
                aria-label={"Open group settings"}
                leftIcon={<SettingsIcon/>}
                onClick={() => setOpen(!open)}>
                Manage Group
            </Button> */}
            <IconButton
                colorScheme={"orange"}
                aria-label={"Open group settings"}
                icon={<SettingsIcon/>}
                onClick={() => setOpen(!open)} />
                
            {open && <GroupManagerDropdown />}
        </Box>
    );
}

export default GroupManager;
