import { Text, Flex, Divider } from "@aws-amplify/ui-react";
import { Outlet, NavLink } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';


Amplify.configure(awsExports);


export default function Root() {
    return (
        <>
            <div className="flex flex-row h-24 items-center justify-evenly">
                <NavLink to={`/`}>
                    <h1 className="text-xl italic font-bold underline underline-offset-2">
                        Home <HomeIcon />
                    </h1></NavLink>
                <NavLink to={`/profile`}>
                    <h1 className="text-xl italic font-bold underline underline-offset-2">
                        Profile <PersonIcon />
                    </h1>
                </NavLink>
            </div>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>
            <div id="detail"><Outlet /></div>
        </>
    );
};
