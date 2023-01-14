import { API, Amplify, graphqlOperation } from 'aws-amplify';
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { listTodos, getTodo } from "../graphql/queries";
import { updateTodo } from "../graphql/mutations";
import { useLoaderData, NavLink, Link, useParams } from "react-router-dom";
import { Flex, Divider, Button } from "@aws-amplify/ui-react";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';




export default function AddToPlaylist({ id }) {

    // Access the client
    const queryClient = useQueryClient();


    //updating Likes
    const addingLikeMutation = useMutation({
        mutationFn: async (add) => {
            await API.graphql({ query: updateTodo, variables: { input: add } });
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['feature'] })
        },
    })




    return <p>{id}</p>
};
