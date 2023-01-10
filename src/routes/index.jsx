import { Amplify, API, graphqlOperation } from 'aws-amplify'
import awsExports from '../aws-exports';
import { listTodos } from "../graphql/queries";
import { Heading, Text } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
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
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {todo.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {todo.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Link to={`videos/${todo.id}`}><Button size="small">Learn More</Button></Link>
                        </CardActions>
                    </Card>
                ))
            }
        </>
    );
}