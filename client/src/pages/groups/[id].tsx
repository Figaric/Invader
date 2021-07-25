import { Text, Box, Flex, Heading } from '@chakra-ui/react';
import Pusher from 'pusher-js';
import React, { Component, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ManageGroupBtns from '../../components/ManageGroupBtns';
import PageLoading from '../../components/PageLoading';
import Post from '../../components/Post';
import { useGetGroupQuery } from '../../generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';

export default class Group extends Component {
    state = {
        groupData: ,

    }

    async componentDidMount() {
        const { data }
    }

    render {
        
    }
}

// const Group: React.FC = () => {
//     const [posts, setPosts] = useState([]);
//     const id = useGetIntId();
//     const { data, error, loading } = useGetGroupQuery({
//         skip: id === -1,
//         variables: {
//             groupId: id
//         }
//     });

//     useEffect(() => {
//         const pusher = new Pusher("aae9612466e1254ef58d", {
//             cluster: "eu"
//         });

//         const groupChannel = pusher.subscribe(`group-${id}`);
//         groupChannel.bind("post-created", (newPost) => {
//             setPosts(prevState => [...prevState, newPost]);
//         });
//     });

//     if(loading) {
//         return null
//     }

//     if(!data) {
//         return (
//             <Layout>
//                 <Text>There is no group with id {id}</Text>
//             </Layout>
//         );
//     }

//     // console.log("posts: ", data.getGroup.posts.length)

//     return (
//         // <Layout>
//         //     <Flex
//         //         flex={1}
//         //         justifyContent={"center"}
//         //         alignItems={"flex-start"}>
//         //         <Flex
//         //             mt={5}
//         //             w={"100%"}
//         //             maxW={"45rem"}
//         //             flexDirection={"column"}>
//         //             <Flex  justifyContent={"space-between"}>
//         //                 <Flex flexDirection={"column"} justifyContent={"space-between"}>
//         //                     <Heading mb={4} fontWeight={600}>{data.getGroup.name}</Heading>
//         //                     <Text fontSize={19}>{data.getGroup.description}</Text>
//         //                 </Flex>
//         //                 <ManageGroupBtns groupId={id} />
//         //             </Flex>

//         //             {/* Posts */}
//         //             { data.getGroup.posts.length > 0 ?
//         //                 <Flex flexDirection={"column"}>
//         //                     {posts.map(p => (
//         //                         <Post key={p.id} title={p.title} text={p.text}/>
//         //                     ))}
//         //                 </Flex>
//         //             : null }
//         //         </Flex>
//         //     </Flex>
//         // </Layout>
//     )
// }

export default Group
