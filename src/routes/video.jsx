import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { useParams, useLoaderData } from "react-router-dom";
import { getTodo, listTodos } from "../graphql/queries";
import { useQuery } from "@tanstack/react-query";
import { Heading, Text } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Iframe from 'react-iframe'
import { useState } from "react";

Amplify.configure(awsExports);






export default function Video() {
    const videos = useLoaderData();
    //query for rcommmended videos
    const [ filter, setFilter ] = useState(null);

    setFilter(videos.category);;


    const { data } = useQuery({
        queryKey: ['reccs', filter],
        queryFn: async () => {
            const reccData = await API.graphql(
                {
                    query: listTodos,
                    variables: {
                        filter: {
                            category: {
                                eq: filter
                            }
                        }
                    }
                }
            )
            const reccos = reccData.data.listTodos.items;
            return reccos;
        },
        enabled: !!filter
    })
    console.log(data);
    return (
        <div id="video">
            <Heading
                width='30vw'
                level={6}
            >
                {videos.name}
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
                {videos.description}
            </Text>

            {data.map((video) => (
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
            >
                Category :- {videos.category}
            </Text>

            <Iframe url={videos.contentLink}
                width="640px"
                height="320px"
                id=""
                className=""
                display="block"
                position="relative" />
        </div>
    );
};
