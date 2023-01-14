import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { redirect } from "react-router-dom";


export default function Login() {
    const { route } = useAuthenticator((context) => [context.route]);


    if (route === 'authenticated') {
        return redirect(`/`);
    }

    return (
        <View>
            <Authenticator></Authenticator>
        </View>

    );


};
