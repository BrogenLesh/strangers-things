import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchLogin } from "../util/api";

const Login = ({ setToken, userName, setUserName }) => {
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)

    const handleNewPassword = (event) => {
        setPassword(event.target.value);
    };
    const handleNewUser = (event) => {
        setUserName(event.target.value);
    };


    const handleLogin = async (event) => {
        event.preventDefault();
        const loggedToken = await fetchLogin(userName, password);
        setToken(loggedToken);
        setUserName(userName);
        if (loggedToken) {
            setLoggedIn(true)
        }

    };

    return (
        <>
            {loggedIn ? (
                <>
                    <h1>Welcome Back {userName} !</h1>
                </>
            ) : (
                <>
                    <h1>Login</h1>
                    <div>
                        <form onSubmit={handleLogin}>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={userName}
                                onChange={handleNewUser}
                                required
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleNewPassword}
                                required
                            />
                            <button type="submit">LOG IN</button>
                            <Link to="/">
                                <button type="submit">Sign up</button>
                            </Link>

                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default Login;