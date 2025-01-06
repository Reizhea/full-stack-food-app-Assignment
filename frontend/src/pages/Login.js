import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/menu');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAlert({ open: false, message: '', severity: '' });
    
        if (!username.trim() || !password.trim()) {
            setAlert({
                open: true,
                message: 'Please fill in both username and password fields.',
                severity: 'error',
            });
            return;
        }
    
        setIsLoading(true);
    
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                username,
                password,
            });
    
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id);
    
            setAlert({
                open: true,
                message: 'Login successful! Redirecting...',
                severity: 'success',
            });
    
            const redirectTimeout = setTimeout(() => {
                navigate('/menu');
            }, 2000);
    
            return () => clearTimeout(redirectTimeout);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'An unexpected error occurred. Please try again.';
            setAlert({
                open: true,
                message: errorMessage,
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))',
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    zIndex: 1,
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '2.5rem',
                    width: '90%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#1a1a1a',
                        marginBottom: '0.5rem',
                        fontSize: '2rem',
                    }}
                >
                    Welcome Back
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        marginBottom: '2rem',
                        fontSize: '0.95rem',
                    }}
                >
                    Enter your credentials to access your account
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            marginBottom: '1.5rem',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#e0e0e0' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                '&.Mui-focused': { color: '#000' },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            marginBottom: '1.5rem',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#e0e0e0' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                '&.Mui-focused': { color: '#000' },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontWeight: 600,
                            padding: '12px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease',
                            opacity: isLoading ? 0.7 : 1,
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <Box
                        sx={{
                            marginTop: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                        }}
                    >
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Don't have an account?
                        </Typography>
                        <Typography
                            variant="body2"
                            onClick={() => navigate('/signup')}
                            sx={{
                                color: '#000',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Sign up
                        </Typography>
                    </Box>
                </form>
            </Box>
            <AlertMessage
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={() => setAlert({ ...alert, open: false })}
            />
        </Box>
    );
};

export default Login;
