import { SpinnerIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import React from 'react'
import Layout from './Layout';

function PageLoading() {
    return (
        <Layout>
            <Flex
                justifyContent={"center"}
                mt={8}>
                <SpinnerIcon
                    animation={"App-logo-spin infinite 20s linear"} />
            </Flex>
        </Layout>
    );
}

export default PageLoading;
