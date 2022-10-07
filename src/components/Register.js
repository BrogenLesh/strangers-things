import React, { useState } from "react";
import { fetchRegister } from "../util/api";

const Register = ({ token, setToken }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false)

    const handleChangeUser = (event) => {
        setUserName(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const registeredToken = await fetchRegister(userName, password);
        setToken(registeredToken);
        setIsRegistered(true)
        console.log(userName, password);
        console.log(token)
    };



    return (
        <>
            {isRegistered ?
                <>
                    <h1> Thank you for Signing up</h1>
                </>
                :
                <>
                    <h1>Sign up</h1>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={userName}
                                onChange={handleChangeUser}
                                required
                            />
                            <label htmlFor="Password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChangePassword}
                                required
                            />
                            <button type="submit">SIGN UP</button>
                        </form>
                    </div>
                </>
            }
        </>
    );
};

export default Register;

