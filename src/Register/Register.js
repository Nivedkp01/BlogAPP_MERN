import React, { useState, useContext } from 'react';
import './register.css';
import { Navigate,useNavigate } from 'react-router-dom';
import { NewUserContext } from '../NewContext/NewContext';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate()
    const {userInfo,setuserInfo}=useContext(NewUserContext)

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials:'include'
            });
            if (response.ok) {
                response.json().then(userInfo=>{
                    setuserInfo(userInfo)

                })
                navigate('/')   
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again later.');
        }
    }
    

    return (
        <div className='x'>
            <h1 className='h1'>Login Here!</h1>
            <div className='formdiv'>
                <form className='form' onSubmit={handleLogin}>
                    <label>User Name</label>
                    <input type='text' placeholder='Enter Your User Name' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Password</label>
                    <input type='password' placeholder='Enter Your Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}


export default Register;
