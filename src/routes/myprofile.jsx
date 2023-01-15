import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '../graphql/queries'
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { NavLink, useLocation, Navigate } from "react-router-dom";
import { useAuthenticator, Button } from '@aws-amplify/ui-react';



Amplify.configure(awsExports);




export default function Myprofile() {


    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);


    const { user, signOut } = useAuthenticator((context) => [context.user]);

    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <MainList user={user} signOut={signOut} />;

};



function MainList({ user, signOut }) {
    // Access the client
    const queryClient = useQueryClient();


    // Queries
    const { isLoading, isError, data: likedVideosList, error } = useQuery({
        queryKey: ['likedVideosList'], queryFn: async () => {
            const todoData = await API.graphql({ query: listTodos });
            const todos = todoData.data.listTodos.items;
            return todos;
        }
    })
    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }






    return (
        <>
            <p className="text-xl italic font-bold underline underline-offset-2 text-center mt-5">Hi! {user.username}</p>

            <div className='flex justify-center mt-2'>
                <Button onClick={signOut}>Sign Out</Button>
            </div>
            <p className="text-xl italic font-bold underline underline-offset-2 text-center mt-5">My liked Videos :-</p>
            <ul class="list-disc text-center">
                {
                    likedVideosList.filter(video => video.isLiked == "yes").map(video => (

                        <NavLink to={`/videos/${video.id}`}><li className='text-amber-600 italic text-center'>{video.name}</li></NavLink>
                    ))
                }
            </ul>
            <p className="text-xl italic font-bold underline underline-offset-2 text-center mt-5">My playlist :-</p>
            <ul class="list-disc text-center">
                {
                    likedVideosList.filter(video => video.isWatchedLater == "yes").map(video => (

                        <NavLink to={`/videos/${video.id}`}><li className='text-amber-600 italic text-center'>{video.name}</li></NavLink>
                    ))
                }
            </ul>
        </>
    );
}