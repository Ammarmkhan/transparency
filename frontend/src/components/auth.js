import React from 'react';
import { API } from '../api-service';
import { useState, useContext, useEffect } from 'react';
import { TokenContext } from '../index';
import { useCookies } from 'react-cookie';

function Auth() {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // At start of applicaiton, will see login option
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken ] = useCookies(['workout-token']);

    useEffect(() => {
        // Re-direct to workouts page if token exists
        if (token['workout-token']) {
            window.location.href = '/workouts';
          }
    }, [token]);

    const loginClicked = () => {
        API.loginUser({username, password})
        .then(resp => setToken('workout-token', resp.token))
        .catch(error => console.log(error))
    }
        
    const registerClicked = () => {
        API.registerUser({username, password})
        .then(() => loginClicked())
        .catch(error => console.log(error))
    }
  
    return (
        <div>
            {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
            {isLoginView ? 
            <button onClick={loginClicked}>Login</button> : 
            <button onClick={registerClicked}>Register</button>
            }
            {isLoginView ? 
            <p onClick={() => setIsLoginView(false)}>You don't have an account? Register here.</p> : 
            <p onClick={() => setIsLoginView(true)}>You already have an account? Login here.</p>}            
        </div>
  );
}

export default Auth;