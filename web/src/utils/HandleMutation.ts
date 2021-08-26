import { FetchResult, MutationFunctionOptions } from "@apollo/client";

export default async function HandleMutation<TMut, TVars>(
    variables: TVars,
    func: (
        options: MutationFunctionOptions<TMut, TVars>
    ) => Promise<FetchResult<TMut, Record<string, any>, Record<string, any>>>
) {
    
    let response: FetchResult<TMut, Record<string, any>, Record<string, any>>;

    try {
        response = await func({
            variables
        });
    } catch(err) {
        const error = err.graphQLErrors[0];

        return { error };
    }

    return { data: response.data };
}