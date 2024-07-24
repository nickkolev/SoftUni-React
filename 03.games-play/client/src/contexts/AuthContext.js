import { createContext } from "react";

export const AuthContext = createContext({
    email: '',
    accessToken: '',
    isAuthenticate: false,
    changeAuthState: (authState = {}) => null,
});