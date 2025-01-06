import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertMessage from '../components/AlertMessage';

const Cart = ({ cart, setCart }) => {
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleQuantityChange = (item, delta) => {
        const existingItem = cart.find((cartItem) => cartItem._id === item._id);
        if (existingItem) {
            if (existingItem.quantity + delta <= 0) {
                setCart(cart.filter((cartItem) => cartItem._id !== item._id));
                setAlert({
                    open: true,
                    message: `${item.name} removed from cart!`,
                    severity: 'info',
                });
            } else {
                setCart(
                    cart.map((cartItem) =>
                        cartItem._id === item._id
                            ? { ...cartItem, quantity: cartItem.quantity + delta }
                            : cartItem
                    )
                );
                setAlert({
                    open: true,
                    message: `${item.name} quantity updated!`,
                    severity: 'success',
                });
            }
        }
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            setAlert({
                open: true,
                message: 'Your cart is empty!',
                severity: 'warning',
            });
            return;
        }

        try {
            const items = cart.map((item) => ({
                menuItemId: item._id,
                quantity: item.quantity,
            }));

            const response = await axios.post(`${BASE_URL}/order`, {
                userId,
                items,
            });

            if (response.status === 201) {
                setCart([]);
                setAlert({
                    open: true,
                    message: 'Order placed successfully!',
                    severity: 'success',
                });
            }
        } catch (error) {
            setAlert({
                open: true,
                message: 'Failed to place order. Please try again.',
                severity: 'error',
            });
            console.error('Error placing order:', error);
        }
    };

    return (
        <Box
            sx={{
                padding: '4rem',
                backgroundColor: '#f7f7f7',
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#333',
                }}
            >
                Your Cart
            </Typography>

            {cart.length === 0 ? (
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        marginTop: '2rem',
                        fontSize: '1.2rem',
                        color: '#666',
                    }}
                >
                    Your cart is empty. Add some items to enjoy delicious food!
                </Typography>
            ) : (
                <List>
                    {cart.map((item) => (
                        <ListItem
                            key={item._id}
                            sx={{
                                borderBottom: '1px solid #ddd',
                                padding: '1rem 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemText
                                primary={`${item.name} (₹${item.price.toFixed(2)})`}
                                secondary={`Quantity: ${item.quantity}`}
                                primaryTypographyProps={{
                                    fontWeight: 'bold',
                                    color: '#333',
                                }}
                                secondaryTypographyProps={{
                                    color: '#666',
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleQuantityChange(item, -1)}
                                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                                >
                                    -
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleQuantityChange(item, 1)}
                                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                                >
                                    +
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}

            {cart.length > 0 && (
                <Box
                    sx={{
                        textAlign: 'center',
                        marginTop: '3rem',
                        padding: '1rem',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '1rem',
                        }}
                    >
                        Total Amount: ₹{totalAmount.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'none',
                            backgroundColor: '#4CAF50',
                            '&:hover': {
                                backgroundColor: '#388E3C',
                            },
                        }}
                    >
                        Place Order
                    </Button>
                </Box>
            )}

            <AlertMessage
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={() => setAlert({ ...alert, open: false })}
            />
        </Box>
    );
};

export default Cart;
