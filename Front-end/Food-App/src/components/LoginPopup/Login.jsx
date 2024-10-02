import React, { useContext } from 'react';
import './Login.css';
import { useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Login = () => {
    const { url, settoken } = useContext(StoreContext);
    const [action, setaction] = useState(false); // Set to false for initial login form
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }));
    };

    const registerHandle = () => {
        setaction(true); // Switch to signup form
    };

    const LoginHandle = () => {
        setaction(false); // Switch to login form
    };
    const onLogin = async (event) => {
        event.preventDefault();
        let newurl = url;
        if (action) {
            newurl += "/api/user/register"; // Call the register endpoint when action is true
        } else {
            newurl += "/api/user/login"; // Call the login endpoint when action is false
        }
    
        try {
            const response = await axios.post(newurl, data);
            console.log("Server Response:", response); // Log the response from the server
    
            if (response.data.success) {
                if (!action) {
                    // Handle successful login
                    const token = response.data.token;
                    console.log("Token received:", token); // Log the received token
    
                    if (token) {
                        settoken(token);
                        localStorage.setItem("token", token);
                        console.log("Token saved to local storage"); // Log that the token has been saved
    
                        // Show "Welcome back" alert
                        alert("Welcome back!");
                    } else {
                        console.error("Token is missing in the response."); // Log if token is missing
                    }
                } else {
                    // Handle successful registration
                    alert("Registration successful. Please log in.");
                    setaction(false); // Switch to login form after registration
                }
            } else {
                alert(response.data.message);  // Show backend error message to the user
            }
        } catch (error) {
            console.error("There was an error with the network request:", error);
            alert("A network error occurred. Please try again later.");
        }
    };
    
    return (
        <div className={`wrapper ${action ? "active" : ""}`}>
            <img className='cross' src={assets.cross_icon} alt="" />

            {/* Login Form */}
            <form onSubmit={onLogin} className='login-page'>
                <h2>Login</h2>
                <div className="input-box">
                    <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email' required />
                </div>
                <div className="input-box">
                    <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder='Password' required />
                </div>
                <div className="remember-forgot">
                    <input type="checkbox" />
                    <a>Forgot Password</a>
                </div>
                <button type='submit'>Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="#" onClick={registerHandle}>Register</a></p>
                </div>
            </form>

            {/* Signup Form */}
            <form onSubmit={onLogin} className='signup-page'>
                <h2>SignUp</h2>
                <div className="input-box">
                    <input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder='Username' required />
                </div>
                <div className="input-box">
                    <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email' required />
                </div>
                <div className="input-box">
                    <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder='Password' required />
                </div>
                <button type='submit'>Signup</button>
                <div className="register-link">
                    <p>Already have an account? <a href="#" onClick={LoginHandle}>Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
