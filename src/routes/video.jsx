import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { useParams } from "react-router-dom";
import { getTodo, listTodos } from "../graphql/queries";
import { useQuery } from "@tanstack/react-query";
import { Heading, Text } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Iframe from 'react-iframe'

Amplify.configure(awsExports);


// Query with filters, limits, and pagination




export default function Video() {
    const params = useParams();

    let filter = {
        category: {
            eq: "Drama"
        }
    };
    //categories fetch
    const { data: reccs } = useQuery({
        queryKey: ['videoCategory'], queryFn: async () => {
            const todoData = await API.graphql({ query: listTodos, variables: { filter: filter } });
            const todos = todoData.data.listTodos.items;
            return todos;
        }
    })


    const { status, data: video, error } = useQuery({
        queryKey: ['videoDetails'],
        queryFn: async () => {
            const oneVideoItem = await API.graphql(
                graphqlOperation(getTodo, { id: params.videoID }));
            const video = oneVideoItem.data.getTodo;
            return video;
        },
    })

    if (status === 'loading') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    return (
        <div id="video">
            <Heading
                width='30vw'
                level={6}
            >
                {video.name}
            </Heading>

            <Text
                variation="primary"
                as="p"
                color="blue"
                lineHeight="1.5em"
                fontWeight={400}
                fontSize="1em"
                fontStyle="normal"
                textDecoration="none"
                width="30vw"
            >
                {video.description}
            </Text>

            {reccs.map((video) => (
                <Text
                    variation="primary"
                    as="p"
                    color="black"
                    lineHeight="1.5em"
                    fontWeight={400}
                    fontSize="1em"
                    fontStyle="normal"
                    textDecoration="none"
                    width="30vw"
                >{video.name}</Text>
            ))}

            {/* <Iframe url={video.contentLink}
                width="640px"
                height="320px"
                id=""
                className=""
                display="block"
                position="relative" /> */}
        </div>
    );
};
