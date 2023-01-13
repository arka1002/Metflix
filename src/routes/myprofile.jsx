import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '../graphql/queries'
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';



Amplify.configure(awsExports);




export default function Myprofile() {


    // Access the client
    const queryClient = useQueryClient();


    // Queries
    const { isLoading, isError, data: likedVideosList, error } = useQuery({
        queryKey: ['likedVideosList'], queryFn: async () => {
            const todoData = await API.graphql({ query: listTodos, variables: { filter: {
                isLiked: {
                    eq: "yes"
                }
            }}});
            const todos = todoData.data.listTodos.items;
            return todos;
        }
    })
    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }






    return (
        <>
        {
            likedVideosList.map(video => (
                <p>{video.name}</p>
            ))
        }
        </>
    );
};
