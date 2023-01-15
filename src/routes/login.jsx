import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { redirect, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";


export default function Login() {
    const { route } = useAuthenticator((context) => [context.route]);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (route === 'authenticated') {
            navigate(from, { replace: true });
        }
    }, [route, navigate, from]);






    return (
        <div className='flex justify-center mt-10'>
            <Authenticator></Authenticator>
        </div>

    );


};
