import { Amplify, API, graphqlOperation } from 'aws-amplify'
import awsExports from '../aws-exports';
import { listTodos } from "../graphql/queries";
import { Heading, Text } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { NavLink, useLoaderData } from "react-router-dom";
import React from 'react';


Amplify.configure(awsExports);

export default function Index() {

    //use the loader data to return the list of videos

    const theListOfVideos = useLoaderData();

    return (
        <Grid container spacing={2}>
            {
                theListOfVideos.map((todo) => (
                    <Grid item xs={12} md={3}>
                        <div className='flex justify-center'>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={todo.imageLink}
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
                                    <NavLink to={`videos/${todo.id}`}><Button size="small">PLay Now</Button></NavLink>
                                </CardActions>
                            </Card>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    );
}






