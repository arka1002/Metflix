import { Text, Flex, Divider } from "@aws-amplify/ui-react";
import { Outlet, Link } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);


export default function Root() {
    return (
        <>
            <Link to={`/`}>
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
                    Home
                </Text></Link>
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
                Profile
            </Text>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>
            <div id="detail"><Outlet /></div>
        </>
    );
};
