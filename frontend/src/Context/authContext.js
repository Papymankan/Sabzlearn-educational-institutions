import { createContext } from "react";

const AuthContext = createContext({
    isloggedIn: false,
    token: null,
    userInfos: null,
    login: () => { },
    logout: () => { }
})

export default AuthContext