import React from "react";
import { Text } from "@chakra-ui/react";
import Layout from "../components/shared/Layout";
import Loading from "../components/shared/Loading";

export default function HandleQuery(data: any, loading: boolean, noDataMsg: string) {
    if(loading) {
        return <Loading />
    }

    if(!data) {
        return (
            <Layout>
                <Text
                    mt={8}
                    color={"white"}
                    fontWeight={400}
                    fontSize={18}>
                    {noDataMsg}
                </Text>
            </Layout>
        )
    }

    return null;
}