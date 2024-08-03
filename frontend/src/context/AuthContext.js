import React from 'react'
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setauthState] = useState({
        isAuthenticated: false,
        // isAuthenticated: sessionStorage.getItem('isAuthenticated') || false, 
        user: sessionStorage.getItem('user') || null,
        token: sessionStorage.getItem('token') || null,
        loading: true
    })



    useEffect(() => {
        authState.loading = true;
        const verify =  async () => {
            console.log('inside useEffect '+authState.token);
            if (authState.token) {
                await axios.get('http://localhost:5000/api/v1/validate', {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                }).then(response => {
                    setauthState({

                        // isAuthenticated: sessionStorage.getItem('isAuthenticated'),
                        isAuthenticated: true,
                        // user: JSON.stringify(response.data),
                        user: response.data,
                        token: authState.token,
                        loading: false
                    })

                }).catch(error => {
                    console.error('Token verification failed:', error);
                    setauthState({
                        isAuthenticated: false,
                        // isAuthenticated: sessionStorage.getItem('isAuthenticated'),

                        user: null,
                        token: null,
                        loading: false
                    });
                })

            }else{
                setauthState((prevState) => ({ ...prevState, loading: false }));
            }
        }
        // console.log(authState.user.name);
        verify();
    }, [])

    const signin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/sign-in', {
                username,
                password,
            });

            if (response.status === 200) {
                // Save JWT token to local storage
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                // sessionStorage.setItem('isAuthenticated', "true");
                setauthState({
                    isAuthenticated: true,
                    // isAuthenticated: sessionStorage.getItem("isAuthenticated"),
                    user: response.data.user,
                    token: response.data.token,
                    loading: false
                });
                // isAuthenticated = true;
                return { success: true };

            }
        } catch (error) {
            setauthState({
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
            });
            if (error.response) {
                return { success: false, message: error.response.data.message };

                //   return (error.response.data.message);
            } else {
                // Something happened in setting up the request that triggered an error
                //   return ('An unexpected error occurred. Please try again.');
                return { success: false, message: 'An unexpected error occurred. Please try again.' };

            }
        }
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        // sessionStorage.removeItem('isAuthenticated');
        setauthState({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, logout, signin }}>
            {children}
        </AuthContext.Provider>

    )
}

// export default AuthContext