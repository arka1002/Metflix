import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { useLoaderData, NavLink, Link, useParams, useLocation, Navigate } from "react-router-dom";
import { listTodos, getTodo } from "../graphql/queries";
import { updateTodo } from "../graphql/mutations";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { Flex, Divider, Button, useAuthenticator } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Iframe from 'react-iframe'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LikeButton, { likeButton } from "../components/likeButton";
import AddToPlaylist from '../components/addToPlaylist';


Amplify.configure(awsExports);


export default function Video() {

    // Access the client
    const queryClient = useQueryClient();

    //use the loader data in videos/:videoID
    const videos = useLoaderData();
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }



    return (
        <div id="video">
            <div className='my-10 flex flex-col-reverse gap-y-8 md:flex-row md:justify-evenly items-center'>
                <div>
                    <span className='text-xl italic font-bold underline underline-offset-2'>
                        {videos.name}
                    </span>

                    <p className='w-96'>
                        {videos.description}
                    </p>

                    <div class="flex flex-row gap-4">
                        <div><LikeButton id={videos.id} /></div>
                        <div><AddToPlaylist id={videos.id} /></div>
                    </div>



                </div>
                <div>
                    <Iframe url={videos.contentLink}
                        width="640px"
                        height="320px"
                        className=""
                        display="block"
                        position="relative" />
                </div>
            </div>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>


            <div className='mt-10'>
                <ReccedVideos category={videos.category} />
            </div>





        </div>
    );
};



function ReccedVideos({ category }) {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['reccs', category],
        queryFn: async () => {
            const reccData = await API.graphql(
                {
                    query: listTodos,
                    variables: {
                        filter: {
                            category: {
                                eq: category
                            }
                        }
                    }
                }
            )
            const reccos = reccData.data.listTodos.items;
            return reccos;
        },
        enabled: !!category,
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
        <Grid container spacing={2}>
            {data.map((video) => (
                <Grid item xs={12} md={3}>
                    <div className='flex justify-center'>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={video.imageLink}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {video.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {video.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <NavLink to={`/videos/${video.id}`}><Button size="small">Play Now</Button></NavLink>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}