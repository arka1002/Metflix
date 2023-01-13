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
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';




export default function LikeButton({ id }) {

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









    let likeButton;
    //query for like button
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
        if (feature.isLiked == "yes") {
            likeButton = <Button
                onClick={() => alert('Disliked')}
            >
                <ThumbDownIcon />
            </Button>
        } else {
            likeButton = <Button
                onClick={() => alert(`${feature.name}`)}
            >
                <ThumbUpIcon />
            </Button>
        }

    }


    return <>{likeButton}</>
};
