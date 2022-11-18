import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth";

export const PrivateRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);

    // this is used to redirect to last visited page
    const { pathname, search } = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem("lastPath", lastPath);

    // if user is not logged in, redirect to login page
    // if user is logged in, render the children route
    return authState.logged ? children : <Navigate to="/login" />;
};
