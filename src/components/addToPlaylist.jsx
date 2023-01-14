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


    //updating playlist
    const addingPlaylistMutation = useMutation({
        mutationFn: async (add) => {
            await API.graphql({ query: updateTodo, variables: { input: add } });
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['feature'] })
        },
    })

    let playlistButton;
    //query for playlist button
    const { isLoading, isError, data: feature, error, isSuccess } = useQuery({
        queryKey: ['feature', id],
        queryFn: async () => {
            const placeHolderData = await API.graphql({
                query: getTodo,
                variables: { id: id }
            });
            const oneVideo = placeHolderData.data.getTodo;
            return oneVideo;
        },
        enabled: !!id,
    })
    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    if (isSuccess == true) {
        if (feature.isWatchedLater == "yes") {
            playlistButton = <Button
                onClick={() => {
                    addingPlaylistMutation.mutate({
                        id: feature.id,
                        isWatchedLater: 'no',
                    })
                }}
            >
                <PlaylistRemoveIcon />
            </Button>
        } else {
            playlistButton = <Button
                onClick={() => {
                    addingPlaylistMutation.mutate({
                        id: feature.id,
                        isWatchedLater: 'yes',
                    })
                }}
            >
                <PlaylistAddIcon />
            </Button>
        }

    }


    return <p>{playlistButton}</p>
};
