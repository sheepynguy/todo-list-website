import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Add login logic here
        navigate('/home');
    }

    return (
    <>
        <div>Productivity Title</div>
        <div>Returning User
             <div id="username">Username input here</div>
             <div id="password">Password input here</div>
             <button onClick={handleLogin}>Submit button</button>
        </div>
        <div>"Link" to showing sign up display</div>
        <div style={{display: "none"}}>
            New User
            <div id="new-username">New Username input here</div>
            <div id="new-password">New Password input here</div>
            <div id="retype-password">Retype Password input here</div>
            <div id="submit-user">Submit button here</div>
        </div>
    </>
    )
}

export default Login;