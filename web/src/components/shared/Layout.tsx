import { Box, Flex } from '@chakra-ui/react';
import React from 'react'

const Layout: React.FC = ({ children }) => {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"flex-start"}
            h={"100vh"}>
            <Box>
                {children}
            </Box>
        </Flex>
    )
}

export default Layout;
