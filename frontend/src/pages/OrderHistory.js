import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertMessage from '../components/AlertMessage';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        if (!isLoggedIn) {
            setAlert({ open: true, message: 'You need to login first!', severity: 'warning' });
            setTimeout(() => navigate('/'), 2000);
            return;
        }

        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    setAlert({ open: true, message: 'User ID not found.', severity: 'error' });
                    return;
                }

                const response = await axios.get(`${BASE_URL}/order/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrders(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setAlert({
                        open: true,
                        message: 'No orders found.',
                        severity: 'info',
                    });
                } else {
                    console.error('Error fetching orders:', error);
                    setAlert({
                        open: true,
                        message: 'Failed to fetch order history.',
                        severity: 'error',
                    });
                }
            }
        };

        fetchOrders();
    }, [isLoggedIn, navigate]);

    return (
        <Box
            sx={{
                padding: '2rem',
                backgroundColor: '#f7f7f7',
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    paddingTop: '2rem',
                    color: '#000',
                }}
            >
                Order History
            </Typography>

            {orders.length === 0 ? (
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: '#555',
                    }}
                >
                    You have no orders yet.
                </Typography>
            ) : (
                <Paper
                    sx={{
                        padding: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#fff',
                    }}
                >
                    <List>
                        {orders.map((order) => (
                            <React.Fragment key={order._id}>
                                <ListItem
                                    sx={{
                                        padding: '1rem',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={`Order ID: ${order._id}`}
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="textSecondary">
                                                    Total Amount: ₹{order.totalAmount.toFixed(2)}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Status: {order.status}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Date: {new Date(order.createdAt).toLocaleString()}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textPrimary"
                                                    sx={{ marginTop: '1rem', fontWeight: 'bold' }}
                                                >
                                                    Items Ordered:
                                                </Typography>
                                                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                                    {order.items.map((item) => (
                                                        <li key={item.menuItemId._id}>
                                                            <Typography
                                                                variant="body2"
                                                                color="textSecondary"
                                                            >
                                                                {item.menuItemId.name} - ₹
                                                                {item.menuItemId.price.toFixed(2)} x{' '}
                                                                {item.quantity}
                                                            </Typography>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        }
                                        sx={{ color: '#000' }}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
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

export default OrderHistory;
