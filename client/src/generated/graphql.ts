import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type Group = {
  __typename?: 'Group';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  posts: Array<Post>;
  members: Array<GroupMember>;
};

export type GroupMember = {
  __typename?: 'GroupMember';
  isAdmin: Scalars['Boolean'];
  memberId: Scalars['Int'];
  member: User;
  groupId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  joinGroup: Scalars['Boolean'];
  createGroup: Scalars['Boolean'];
  login: Scalars['Boolean'];
  register: Scalars['Boolean'];
  createPost: Scalars['Boolean'];
};


export type MutationJoinGroupArgs = {
  groupName: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  description: Scalars['String'];
  groupName: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreatePostArgs = {
  groupId: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
  authorId: Scalars['Int'];
  author: User;
  groupId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getGroupMembers: Array<GroupMember>;
  getGroup?: Maybe<Group>;
  myGroups: Array<Group>;
  me?: Maybe<User>;
  getPosts: Array<Post>;
};


export type QueryGetGroupMembersArgs = {
  groupId: Scalars['Int'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['Int'];
};


export type QueryGetPostsArgs = {
  groupId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createGroup'>
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  groupId: Scalars['Int'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPost'>
);

export type GetGroupQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetGroupQuery = (
  { __typename?: 'Query' }
  & { getGroup?: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'name' | 'description'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'text'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  )> }
);

export type GetGroupMembersQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetGroupMembersQuery = (
  { __typename?: 'Query' }
  & { getGroupMembers: Array<(
    { __typename?: 'GroupMember' }
    & Pick<GroupMember, 'isAdmin'>
    & { member: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type GetMemberIdsQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetMemberIdsQuery = (
  { __typename?: 'Query' }
  & { getGroupMembers: Array<(
    { __typename?: 'GroupMember' }
    & Pick<GroupMember, 'isAdmin'>
    & { member: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  )> }
);

export type GetPostsQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type LoginMutationVariables = Exact<{
  loginUsername: Scalars['String'];
  loginPassword: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type MyGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyGroupsQuery = (
  { __typename?: 'Query' }
  & { myGroups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'description'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  registerPassword: Scalars['String'];
  registerUsername: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);


export const CreateGroupDocument = gql`
    mutation CreateGroup($name: String!, $description: String!) {
  createGroup(groupName: $name, description: $description)
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $text: String!, $groupId: Int!) {
  createPost(title: $title, text: $text, groupId: $groupId)
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetGroupDocument = gql`
    query GetGroup($groupId: Int!) {
  getGroup(groupId: $groupId) {
    name
    description
    posts {
      id
      title
      text
      author {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetGroupQuery__
 *
 * To run a query within a React component, call `useGetGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupQuery(baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
      }
export function useGetGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
        }
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>;
export type GetGroupLazyQueryHookResult = ReturnType<typeof useGetGroupLazyQuery>;
export type GetGroupQueryResult = Apollo.QueryResult<GetGroupQuery, GetGroupQueryVariables>;
export const GetGroupMembersDocument = gql`
    query GetGroupMembers($groupId: Int!) {
  getGroupMembers(groupId: $groupId) {
    isAdmin
    member {
      id
      username
    }
  }
}
    `;

/**
 * __useGetGroupMembersQuery__
 *
 * To run a query within a React component, call `useGetGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupMembersQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupMembersQuery(baseOptions: Apollo.QueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(GetGroupMembersDocument, options);
      }
export function useGetGroupMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(GetGroupMembersDocument, options);
        }
export type GetGroupMembersQueryHookResult = ReturnType<typeof useGetGroupMembersQuery>;
export type GetGroupMembersLazyQueryHookResult = ReturnType<typeof useGetGroupMembersLazyQuery>;
export type GetGroupMembersQueryResult = Apollo.QueryResult<GetGroupMembersQuery, GetGroupMembersQueryVariables>;
export const GetMemberIdsDocument = gql`
    query GetMemberIds($groupId: Int!) {
  getGroupMembers(groupId: $groupId) {
    isAdmin
    member {
      id
    }
  }
}
    `;

/**
 * __useGetMemberIdsQuery__
 *
 * To run a query within a React component, call `useGetMemberIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberIdsQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetMemberIdsQuery(baseOptions: Apollo.QueryHookOptions<GetMemberIdsQuery, GetMemberIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberIdsQuery, GetMemberIdsQueryVariables>(GetMemberIdsDocument, options);
      }
export function useGetMemberIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberIdsQuery, GetMemberIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberIdsQuery, GetMemberIdsQueryVariables>(GetMemberIdsDocument, options);
        }
export type GetMemberIdsQueryHookResult = ReturnType<typeof useGetMemberIdsQuery>;
export type GetMemberIdsLazyQueryHookResult = ReturnType<typeof useGetMemberIdsLazyQuery>;
export type GetMemberIdsQueryResult = Apollo.QueryResult<GetMemberIdsQuery, GetMemberIdsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($groupId: Int!) {
  getPosts(groupId: $groupId) {
    id
    title
    text
    author {
      id
      username
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginUsername: String!, $loginPassword: String!) {
  login(username: $loginUsername, password: $loginPassword)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUsername: // value for 'loginUsername'
 *      loginPassword: // value for 'loginPassword'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyGroupsDocument = gql`
    query MyGroups {
  myGroups {
    id
    name
    description
  }
}
    `;

/**
 * __useMyGroupsQuery__
 *
 * To run a query within a React component, call `useMyGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyGroupsQuery(baseOptions?: Apollo.QueryHookOptions<MyGroupsQuery, MyGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyGroupsQuery, MyGroupsQueryVariables>(MyGroupsDocument, options);
      }
export function useMyGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyGroupsQuery, MyGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyGroupsQuery, MyGroupsQueryVariables>(MyGroupsDocument, options);
        }
export type MyGroupsQueryHookResult = ReturnType<typeof useMyGroupsQuery>;
export type MyGroupsLazyQueryHookResult = ReturnType<typeof useMyGroupsLazyQuery>;
export type MyGroupsQueryResult = Apollo.QueryResult<MyGroupsQuery, MyGroupsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($registerPassword: String!, $registerUsername: String!) {
  register(password: $registerPassword, username: $registerUsername)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerPassword: // value for 'registerPassword'
 *      registerUsername: // value for 'registerUsername'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;