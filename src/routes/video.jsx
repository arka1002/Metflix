import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { useParams } from "react-router-dom";
import { getTodo } from "../graphql/queries";
import { useQuery } from "@tanstack/react-query";
import { Heading, Text } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';

Amplify.configure(awsExports);






export default function Video() {
    const params = useParams();
    console.log(params);

    const { status, data, error } = useQuery({
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
                {data.name}
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
                {data.description}
            </Text>
        </div>
    );
};
