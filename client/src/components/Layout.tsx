import { Flex } from '@chakra-ui/react';
import React from 'react'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Flex
            height={"100vh"}
            flexDir={"column"}
            bg={"white"}
            bgImage={'url("http://localhost:3000/spikes.png")'}
            bgPos={"center"}
            bgRepeat={"repeat"}>
            
            {/* NavBar */}

            {children}

            {/* Footer */}
        </Flex>
    );
}

export default Layout;