import React from 'react'
import { useGetGroupMembersQuery } from '../generated/graphql';

function GroupMembersList({ groupId }) {
    const { data, error, loading } = useGetGroupMembersQuery({
        skip: groupId === -1,
        variables: {
            groupId
        }
    });

    // data.getGroupMembers

    return (
        <div>
            
        </div>
    )
}

export default GroupMembersList;
