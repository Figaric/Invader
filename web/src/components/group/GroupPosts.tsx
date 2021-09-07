import { Box } from "@chakra-ui/react";
import React from "react";
import { NewPostDocument, useGetPostsQuery } from "../../generated/graphql";
import Loading from "../shared/Loading";
import OnMount from "../shared/OnMount";
import PostTab from "./PostTab";

interface GroupPostsProps {
    groupId: number
}

const GroupPosts: React.FC<GroupPostsProps> = ({ groupId }) => {
    const { data, subscribeToMore, loading } = useGetPostsQuery({
        variables: {
            groupId
        }    
    });

    if(loading) {
        return <Loading />
    }

    if(!data) {
        return (
            <Box
                textAlign={"center"}>
                No posts yet
            </Box>
        )
    }

    return (
        <>
            <OnMount
                effect={() => {
                    subscribeToMore({
                        document: NewPostDocument,
                        variables: { groupId },
                        updateQuery: (prev, { subscriptionData }: any) => {
                            if (!subscriptionData.data) return prev;

                            const newPost = subscriptionData.data.newPost;

                            return { posts: [newPost, ...prev.posts] };
                        }
                    });
                }} />
                
            {data.posts.map(p => (
                <PostTab
                    key={p.id}
                    title={p.title}
                    text={p.text} />
            ))}
        </>
    );
}

export default GroupPosts;