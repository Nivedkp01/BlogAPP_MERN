import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { NewUserContext } from '../NewContext/NewContext';

function Navbar() {
    const { userInfo, setUserInfo } = useContext(NewUserContext);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                credentials: 'include',
                method:'POST'
               
            });
            if (response.ok) {
                setUserInfo(null); 
            } else {
                throw new Error('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                    const response = await fetch('http://localhost:3000/profile', {
                        credentials: 'include'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user profile');
                    }
                    const userData = await response.json();
                    setUserInfo(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className='nav'>
            {userInfo ? (
                <>
                    <h4 className='h4'><Link className='h4' to='/create'>Create Post</Link></h4>
                    <h4><Link className='h4' to='/'>Best Blog</Link></h4>
                    <div className='new'>
                        <h3><Link className='h5'>👤{userInfo.username}</Link></h3>
                        <h4><Link className='h4' onClick={handleLogout}>Logout</Link></h4>
                    </div>
                </>
            ) : (
                <>
                    <h4><Link className='h4' to='/login'>Login</Link></h4>
                    <h4><Link className='h4' to='/'>Best Blog</Link></h4>
                    <h4><Link className='h4' to='/register'>Register</Link></h4>
                </>
            )}
        </div>
    );
}

export default Navbar;
