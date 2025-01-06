import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

const Menu = ({ cart, setCart }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/menu`);
                setMenuItems(response.data);
                setFilteredItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setAlert({
                    open: true,
                    message: 'Failed to fetch menu items!',
                    severity: 'error',
                });
            }
        };

        fetchMenu();
    }, []);

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem._id === item._id);

        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
            setAlert({
                open: true,
                message: `${item.name} quantity increased!`,
                severity: 'info',
            });
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
            setAlert({
                open: true,
                message: `${item.name} added to cart!`,
                severity: 'success',
            });
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = menuItems.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setFilteredItems(
            category
                ? menuItems.filter((item) => item.category === category)
                : menuItems
        );
    };

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
                Explore Our Menu
            </Typography>

            <Box
                sx={{
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                }}
            >
                <TextField
                    label="Search items"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{
                        width: '50%',
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        },
                    }}
                />
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                    sx={{
                        width: '30%',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        '& .MuiSelect-select': {
                            padding: '10px',
                        },
                    }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="Appetizers">Appetizers</MenuItem>
                    <MenuItem value="Main Course">Main Course</MenuItem>
                    <MenuItem value="Desserts">Desserts</MenuItem>
                </Select>
            </Box>

            <Grid container spacing={3}>
                {filteredItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                        <Card
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={
                                    item.image
                                        ? `data:image/jpeg;base64,${item.image}`
                                        : 'https://via.placeholder.com/150'
                                }
                                alt={item.name}
                                sx={{
                                    height: 160,
                                    objectFit: 'contain',
                                    borderTopLeftRadius: '16px',
                                    borderTopRightRadius: '16px',
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {item.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ marginBottom: '1rem' }}
                                >
                                    {item.category}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#4CAF50',
                                    }}
                                >
                                    ₹{item.price.toFixed(2)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                        isLoggedIn
                                            ? addToCart(item)
                                            : navigate('/login')
                                    }
                                    sx={{
                                        marginTop: '1rem',
                                        backgroundColor: isLoggedIn ? '#4CAF50' : '#d32f2f',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: isLoggedIn ? '#388E3C' : '#c62828',
                                        },
                                    }}
                                >
                                    {isLoggedIn ? 'Add to Cart' : 'Login to Add to Cart'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <AlertMessage
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={() => setAlert({ ...alert, open: false })}
            />
        </Box>
    );
};

export default Menu;
