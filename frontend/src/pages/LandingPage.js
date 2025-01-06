import React from 'react';
import { Box, Text, Button, Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import landingImage from './landing2.png';

const LandingPage = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLoginClick = () => {
        if (isLoggedIn) {
            navigate('/menu');
        } else {
            navigate('/login');
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundImage: `url('https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '0 4rem',
                color: '#fff',
            }}
        >
            <Box
                sx={{
                    maxWidth: '50%',
                }}
            >
                <Title
                    order={1}
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '3.5rem',
                        lineHeight: '1.2',
                        marginBottom: '1.5rem',
                    }}
                >
                    Welcome to <span style={{ color: '#4CAF50' }}>GrubSpot</span>
                </Title>
                <Text
                    size="lg"
                    sx={{
                        fontWeight: '300',
                        fontSize: '1.5rem',
                        lineHeight: '1.5',
                        marginBottom: '2rem',
                    }}
                >
                    Discover the best food from restaurants around you. Your one-stop destination for food ordering.
                </Text>
                <Group spacing="lg">
                    <Button
                        size="lg"
                        style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            padding: '12px 24px',
                        }}
                        onClick={handleLoginClick}
                    >
                        {isLoggedIn ? 'Go to Menu' : 'Login'}
                    </Button>
                    {!isLoggedIn && (
                        <Button
                            size="lg"
                            style={{
                                backgroundColor: '#fff',
                                color: '#000',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                padding: '12px 24px',
                            }}
                            onClick={handleSignupClick}
                        >
                            Sign Up
                        </Button>
                    )}
                </Group>
            </Box>

        
        </Box>
    );
};

export default LandingPage;
