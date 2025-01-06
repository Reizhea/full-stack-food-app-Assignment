import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/menu');
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, {
                username,
                password,
            });
            setSuccessMessage('Signup successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            style={{
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
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))',
                    backdropFilter: 'blur(2px)',
                    zIndex: 0,
                }}
            />

            <Box
                style={{
                    zIndex: 1,
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '2.5rem',
                    width: '90%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
            >
                <Typography
                    variant="h4"
                    style={{
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '0.5rem',
                        fontSize: '2rem',
                    }}
                >
                    Create an Account
                </Typography>

                <Typography
                    variant="body1"
                    style={{
                        color: '#666',
                        marginBottom: '2rem',
                        fontSize: '0.95rem',
                    }}
                >
                    Fill in the details to get started
                </Typography>

                <form onSubmit={handleSignup}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            marginBottom: '1.5rem',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#e0e0e0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                '&.Mui-focused': {
                                    color: '#000',
                                },
                            },
                            '& .MuiInputBase-input': {
                                padding: '14px',
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
                                '& fieldset': {
                                    borderColor: '#e0e0e0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                '&.Mui-focused': {
                                    color: '#000',
                                },
                            },
                            '& .MuiInputBase-input': {
                                padding: '14px',
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{
                            marginBottom: '1.5rem',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#e0e0e0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                '&.Mui-focused': {
                                    color: '#000',
                                },
                            },
                            '& .MuiInputBase-input': {
                                padding: '14px',
                            },
                        }}
                    />

                    {error && (
                        <Box
                            style={{
                                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '1.5rem',
                            }}
                        >
                            <Typography
                                variant="body2"
                                style={{
                                    color: '#d32f2f',
                                    fontWeight: '500',
                                }}
                            >
                                {error}
                            </Typography>
                        </Box>
                    )}

                    {successMessage && (
                        <Box
                            style={{
                                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '1.5rem',
                            }}
                        >
                            <Typography
                                variant="body2"
                                style={{
                                    color: '#388e3c',
                                    fontWeight: '500',
                                }}
                            >
                                {successMessage}
                            </Typography>
                        </Box>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontWeight: '600',
                            padding: '12px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease',
                            opacity: isLoading ? 0.7 : 1,
                        }}
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>

                    <Box
                        style={{
                            marginTop: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{
                                color: '#666',
                            }}
                        >
                            Already have an account?
                        </Typography>
                        <Typography
                            variant="body2"
                            onClick={() => navigate('/login')}
                            style={{
                                color: '#000',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Login
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Signup;
