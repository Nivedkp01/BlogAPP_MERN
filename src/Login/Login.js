import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleUser(e) {
        e.preventDefault();

        try {
            await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user. Please try again.');
        }
    }

    return (
        <div className='x'>
            <h1 className='h1'>Register Here!</h1>
            <div className='formdiv'>
                <form className='form'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter Your Name' name='name' onChange={(e) => { setName(e.target.value) }} />
                    <label>Email</label>
                    <input type='text' placeholder='Enter Your Email' name='email' onChange={(e) => { setEmail(e.target.value) }} />
                    <label>User Name</label>
                    <input type='text' placeholder='Enter Your User Name' name='username' onChange={(e) => { setUserName(e.target.value) }} />
                    <label>Password</label>
                    <input type='password' placeholder='Enter Your Password' name='password' onChange={(e) => { setPassword(e.target.value) }} />
                    <button type="submit" onClick={handleUser}>Create User</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
