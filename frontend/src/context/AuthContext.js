import React from 'react'
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setauthState] = useState({
        isAuthenticated: false,
        user: null,
        token: sessionStorage.getItem('token') || null
    })



    useEffect(() => {
        if (authState.token) {
            axios.get('http://localhost:5000/api/v1/validate', {
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            }).then(response => {
                setauthState({
                    isAuthenticated: true,
                    user: JSON.stringify(response.data),
                    token: authState.token
                })

            }).catch(error => {
                console.error('Token verification failed:', error);
                setauthState({
                    isAuthenticated: false,
                    user: null,
                    token: null
                });
            })
        }
    }, [authState.token])

    const signin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/sign-in', {
                username,
                password,
            });
            const { user, token } = response.data;
            sessionStorage.setItem('token', token);
            setauthState({
                isAuthenticated: true,
                user,
                token
            });

        } catch (error){
            console.error('Login failed:', error);

        }
    }
    const logout = () => {
        sessionStorage.removeItem('token');
        setauthState({
            isAuthenticated: false,
            user: null,
            token: null
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, logout, signin }}>
            {children}
        </AuthContext.Provider>

    )
}

// export default AuthContext
