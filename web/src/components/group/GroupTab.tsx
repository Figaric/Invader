import { Text, Flex, Box, Heading, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { shallowShadow } from "../../theme";
import GroupManager from "./GroupManager";
import styles from "./GroupTab.module.css";

interface GroupTabProps {
    groupId: number,
    name: string,
    description: string
}

const GroupTab: React.FC<GroupTabProps> = ({
    groupId,
    name,
    description,
}) => {
    const router = useRouter();

    return (
        <div>MyGroups page</div>
    );
}

export default GroupTab;