import { Amplify, API, graphqlOperation } from 'aws-amplify'
import awsExports from '../aws-exports';
import { listTodos } from "../graphql/queries";
import { Heading, Text } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
Amplify.configure(awsExports);

export default function Index() {
    // Access the client
    const queryClient = useQueryClient();

    // Queries
    const query = useQuery({
        queryKey: ['todos'], queryFn: async () => {
            const todoData = await API.graphql(graphqlOperation(listTodos));
            const todos = todoData.data.listTodos.items;
            return todos;
        }
    })

    return (
        <>
            {
                query.data?.map((todo) => (
                    <div key={todo.id}>
                        <Heading
                            width='30vw'
                            level={6}
                        >
                            {todo.name}
                        </Heading>

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
                            {todo.description}
                        </Text>
                    </div>

                ))
            }
        </>
    );
}