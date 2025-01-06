import React from 'react';
import { Group, Button, Box, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('userId');
        window.location.reload();
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 60,
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                boxSizing: 'border-box',
                position: 'fixed',
                top: 0,
                zIndex: 1000,
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(30, 30, 30, 0.85)',
                },
            }}
        >
            <Text
                style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
            >
                GrubSpot
            </Text>

            <Group spacing="md" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                {isLoggedIn && (
                    <>
                        <Button
                            variant="subtle"
                            sx={{
                                color: '#ffffff',
                                transition: '0.3s',
                                '&:hover': {
                                    color: '#000000',
                                    backgroundColor: '#ffffff',
                                },
                            }}
                            onClick={() => navigate('/menu')}
                        >
                            Menu
                        </Button>
                        <Button
                            variant="subtle"
                            sx={{
                                color: '#ffffff',
                                transition: '0.3s',
                                '&:hover': {
                                    color: '#000000',
                                    backgroundColor: '#ffffff',
                                },
                            }}
                            onClick={() => navigate('/orders')}
                        >
                            Orders
                        </Button>
                        <Button
                            variant="subtle"
                            sx={{
                                color: '#ffffff',
                                transition: '0.3s',
                                '&:hover': {
                                    color: '#000000',
                                    backgroundColor: '#ffffff',
                                },
                            }}
                            onClick={() => navigate('/cart')}
                        >
                            Cart
                        </Button>
                    </>
                )}
            </Group>

            <Group spacing="md">
                {isLoggedIn ? (
                    <Button
                        style={{
                            backgroundColor: '#e53935',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="outline"
                            style={{ color: '#ffffff', borderColor: '#ffffff' }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                            }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </Group>
        </Box>
    );
};

export default Navbar;
