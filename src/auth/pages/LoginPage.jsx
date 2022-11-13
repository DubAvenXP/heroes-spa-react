import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

export const LoginPage = () => {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const onLogin = () => {

        const lastPath = localStorage.getItem("lastPath") || "/";

        login("Alejandro Dubón");

        navigate(lastPath, { replace: true });
    };
    return (
        <>
            <section className="container">
                <h1>Login</h1>
                <hr />

                <button className="btn btn-primary" onClick={onLogin}>Login</button>
            </section>
        </>
    );
};
