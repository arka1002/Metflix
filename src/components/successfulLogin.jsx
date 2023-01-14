import { NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

export default function SuccessfulLogin() {
    return (
        <>
            <NavLink to={`/profile`}>
                <h1 className="text-xl italic font-bold underline underline-offset-2">
                    Profile <PersonIcon />
                </h1>
            </NavLink>
        </>
    )
};
