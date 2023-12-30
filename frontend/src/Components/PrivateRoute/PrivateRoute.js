import React, { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../Context/authContext";

export default function PrivateRoute({children}) {

    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <>
        {
            authContext.userInfos.role == 'ADMIN' ? <>{children}</> : navigate('/login')
        }
        </>
    );
}
