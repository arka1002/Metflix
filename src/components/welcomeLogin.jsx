import { Button } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";


export default function WelcomeLogin() {
    return (
        <>
            <NavLink to={`/login`}>
                <Button>Login</Button>
            </NavLink>
        </>
    );
};
